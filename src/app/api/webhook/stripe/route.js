import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getOrderByStripeSession, updateOrderStatus, createInvoice, createOrder } from '@/lib/db';
import { sendOrderConfirmation, sendNewOrderAlert } from '@/lib/email';
import { sendOrderWhatsAppCopy } from '@/lib/whatsapp';

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe is not configured (missing STRIPE_SECRET_KEY)' }, { status: 500 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe webhook is not configured (missing STRIPE_WEBHOOK_SECRET)' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      let order = await getOrderByStripeSession(session.id);

      // If the checkout route could not persist the pending order, create it now from Stripe session data.
      if (!order) {
        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
          const allItems = (lineItems?.data || []).map((li) => ({
            name: li.description || 'Item',
            size: '',
            price: Number((li.amount_subtotal || li.amount_total || 0) / 100),
            quantity: li.quantity || 1,
            subtotal: Number((li.amount_subtotal || li.amount_total || 0) / 100),
          }));

          const deliveryItem = allItems.find((item) => item.name.startsWith('Delivery ('));
          const cartItems = allItems.filter((item) => !item.name.startsWith('Delivery ('));
          const deliveryCost = deliveryItem ? deliveryItem.subtotal : 0;

          const customerName =
            session.customer_details?.name ||
            session.metadata?.customer_name ||
            'Guest Customer';
          const customerEmail =
            session.customer_details?.email ||
            session.customer_email ||
            '';
          const customerPhone =
            session.customer_details?.phone ||
            session.metadata?.customer_phone ||
            '';
          const address = session.customer_details?.address;

          if (customerEmail) {
            await createOrder({
              id: session.metadata?.order_id,
              stripeSessionId: session.id,
              status: 'paid',
              customerName,
              customerEmail,
              customerPhone,
              address: address?.line1 || '',
              city: address?.city || '',
              postcode: address?.postal_code || '',
              notes: '',
              subtotal: Number((session.amount_subtotal || 0) / 100) - deliveryCost,
              deliveryCost,
              deliveryZone: deliveryItem?.name?.replace('Delivery (', '').replace(')', '') || '',
              grandTotal: Number((session.amount_total || 0) / 100),
              items: cartItems,
            });
          }
        } catch (recoveryErr) {
          console.error('Failed to recover missing order from Stripe session:', recoveryErr);
        }

        order = await getOrderByStripeSession(session.id);
      }

      if (order) {
        await updateOrderStatus(order.id, 'paid', session.payment_intent);

        // Send emails (non-blocking — don't let failures break the webhook)
        const updatedOrder = await getOrderByStripeSession(session.id);
        if (updatedOrder) {
          sendOrderConfirmation(updatedOrder).catch(console.error);
          sendNewOrderAlert(updatedOrder).catch(console.error);
          sendOrderWhatsAppCopy(updatedOrder).catch(console.error);
        }

        // Auto-generate invoice for paid orders
        try {
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 30);
          await createInvoice(order.id, {
            dueDate: dueDate.toISOString().split('T')[0],
            notes: 'Auto-generated on payment',
          });
        } catch (invoiceErr) {
          console.error('Failed to auto-create invoice:', invoiceErr);
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const intent = event.data.object;
      // Find order by session if metadata is available
      console.log('Payment failed:', intent.id);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}

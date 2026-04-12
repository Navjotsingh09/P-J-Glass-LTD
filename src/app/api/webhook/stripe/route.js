import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getOrderByStripeSession, updateOrderStatus, createInvoice } from '@/lib/db';

export async function POST(request) {
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
      const order = getOrderByStripeSession(session.id);
      if (order) {
        updateOrderStatus(order.id, 'paid', session.payment_intent);
        // Auto-generate invoice for paid orders
        try {
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 30);
          createInvoice(order.id, {
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

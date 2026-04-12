import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createOrder } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, customer, delivery } = body;

    if (!items?.length || !customer?.email || !customer?.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate items have required fields
    for (const item of items) {
      if (!item.name || typeof item.price !== 'number' || !item.quantity) {
        return NextResponse.json({ error: 'Invalid item data' }, { status: 400 });
      }
    }

    const orderId = uuidv4();

    // Build Stripe line items
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          ...(item.size ? { description: `Size: ${item.size}` } : {}),
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses pence
      },
      quantity: item.quantity,
    }));

    // Add delivery as a line item if applicable
    if (delivery?.total > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: { name: `Delivery (${delivery.zone || 'Standard'})` },
          unit_amount: Math.round(delivery.total * 100),
        },
        quantity: 1,
      });
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const grandTotal = subtotal + (delivery?.total || 0);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: customer.email,
      metadata: {
        order_id: orderId,
        customer_name: customer.name,
        customer_phone: customer.phone || '',
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    // Create order in database as pending
    createOrder({
      id: orderId,
      stripeSessionId: session.id,
      status: 'pending',
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone || '',
      address: customer.address || '',
      city: customer.city || '',
      postcode: customer.postcode || '',
      notes: customer.notes || '',
      subtotal,
      deliveryCost: delivery?.total || 0,
      deliveryZone: delivery?.zone || '',
      grandTotal,
      items: items.map((i) => ({
        name: i.name,
        size: i.size || '',
        price: i.price,
        quantity: i.quantity,
        subtotal: i.price * i.quantity,
      })),
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

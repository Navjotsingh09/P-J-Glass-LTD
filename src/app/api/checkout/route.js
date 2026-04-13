import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createOrder } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe is not configured (missing STRIPE_SECRET_KEY)' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
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
    const orderData = {
      id: orderId,
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
    };

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
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
    });

    let orderSaved = true;
    try {
      // Persist the pending order for admin/tracking flows.
      await createOrder({
        ...orderData,
        stripeSessionId: session.id,
      });
    } catch (dbErr) {
      orderSaved = false;
      console.error('Order persistence warning (continuing to Stripe checkout):', dbErr);
    }

    return NextResponse.json({ sessionId: session.id, url: session.url, orderSaved });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    if (err?.type === 'StripeAuthenticationError') {
      try {
        // Graceful fallback: capture the order even if Stripe credentials are temporarily invalid.
        const fallbackOrder = await createOrder({
          id: orderId,
          stripeSessionId: null,
          status: 'pending',
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone || '',
          address: customer.address || '',
          city: customer.city || '',
          postcode: customer.postcode || '',
          notes: [customer.notes, 'Stripe auth unavailable: requires manual payment follow-up'].filter(Boolean).join(' | '),
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

        return NextResponse.json({
          manualOrder: true,
          orderNumber: fallbackOrder?.order_number,
          message: 'Payment is temporarily unavailable. Your order was saved and our team will contact you shortly.',
        });
      } catch (fallbackErr) {
        console.error('Fallback order creation failed:', fallbackErr);
        return NextResponse.json({ error: 'Stripe authentication failed and fallback order save failed. Check STRIPE_SECRET_KEY and Supabase.' }, { status: 500 });
      }
    }
    return NextResponse.json({ error: 'Failed to create checkout session', detail: err?.message || String(err), keyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 8) || 'MISSING' }, { status: 500 });
  }
}

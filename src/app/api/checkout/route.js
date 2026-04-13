import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createOrder } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 30;

async function stripeRequest(path, params) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params).toString(),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.error?.message || 'Stripe API error');
    err.type = data.error?.type;
    throw err;
  }
  return data;
}

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe is not configured (missing STRIPE_SECRET_KEY)' }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
    const body = await request.json();
    const { items, customer, delivery } = body;

    if (!items?.length || !customer?.email || !customer?.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    for (const item of items) {
      if (!item.name || typeof item.price !== 'number' || !item.quantity) {
        return NextResponse.json({ error: 'Invalid item data' }, { status: 400 });
      }
    }

    const orderId = uuidv4();

    // Build Stripe API params (flat form-encoded)
    const params = {
      'mode': 'payment',
      'payment_method_types[0]': 'card',
      'customer_email': customer.email,
      'metadata[order_id]': orderId,
      'metadata[customer_name]': customer.name,
      'metadata[customer_phone]': customer.phone || '',
      'success_url': `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `${baseUrl}/checkout`,
    };

    let idx = 0;
    for (const item of items) {
      params[`line_items[${idx}][price_data][currency]`] = 'gbp';
      params[`line_items[${idx}][price_data][product_data][name]`] = item.name;
      if (item.size) {
        params[`line_items[${idx}][price_data][product_data][description]`] = `Size: ${item.size}`;
      }
      params[`line_items[${idx}][price_data][unit_amount]`] = String(Math.round(item.price * 100));
      params[`line_items[${idx}][quantity]`] = String(item.quantity);
      idx++;
    }

    if (delivery?.total > 0) {
      params[`line_items[${idx}][price_data][currency]`] = 'gbp';
      params[`line_items[${idx}][price_data][product_data][name]`] = `Delivery (${delivery.zone || 'Standard'})`;
      params[`line_items[${idx}][price_data][unit_amount]`] = String(Math.round(delivery.total * 100));
      params[`line_items[${idx}][quantity]`] = '1';
    }

    const session = await stripeRequest('/checkout/sessions', params);

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

    let orderSaved = true;
    let dbError = null;
    try {
      await createOrder({
        ...orderData,
        stripeSessionId: session.id,
      });
    } catch (dbErr) {
      orderSaved = false;
      dbError = dbErr?.message || String(dbErr);
      console.error('Order persistence warning (continuing to Stripe checkout):', dbErr);
    }

    return NextResponse.json({ sessionId: session.id, url: session.url, orderSaved, ...(dbError ? { dbError } : {}) });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session', detail: err?.message || String(err) }, { status: 500 });
  }
}

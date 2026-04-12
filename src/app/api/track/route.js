import { NextResponse } from 'next/server';
import { getOrderByNumber, getStatusHistory } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get('order');
  const email = searchParams.get('email');

  if (!orderNumber || !email) {
    return NextResponse.json({ error: 'Order number and email are required' }, { status: 400 });
  }

  const order = await getOrderByNumber(orderNumber.toUpperCase().trim());
  if (!order || order.customer_email.toLowerCase() !== email.toLowerCase().trim()) {
    return NextResponse.json({ error: 'Order not found — please check your order number and email' }, { status: 404 });
  }

  const history = await getStatusHistory(order.id);

  // Return only safe fields (no internal IDs, payment intents, etc.)
  return NextResponse.json({
    order_number: order.order_number,
    status: order.status,
    items: order.items,
    subtotal: order.subtotal,
    delivery_cost: order.delivery_cost,
    grand_total: order.grand_total,
    delivery_zone: order.delivery_zone,
    tracking_number: order.tracking_number,
    tracking_url: order.tracking_url,
    created_at: order.created_at,
    history: history.map((h) => ({
      status: h.status,
      note: h.note,
      created_at: h.created_at,
    })),
  });
}

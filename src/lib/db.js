import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── Orders ──────────────────────────────────────────────────

export async function createOrder(data) {
  // Generate order number
  const { data: numResult } = await supabase.rpc('next_order_number');
  const orderNumber = numResult || `PJG-${Date.now()}`;

  const order = {
    id: data.id,
    order_number: orderNumber,
    stripe_session_id: data.stripeSessionId || null,
    stripe_payment_intent: null,
    status: data.status || 'pending',
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone || '',
    address: data.address || '',
    city: data.city || '',
    postcode: data.postcode || '',
    notes: data.notes || '',
    subtotal: data.subtotal,
    delivery_cost: data.deliveryCost || 0,
    delivery_zone: data.deliveryZone || '',
    grand_total: data.grandTotal,
    items: data.items,
  };

  const { data: created, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }

  // Log initial status
  await addStatusHistory(created.id, 'pending', 'Order created');

  return created;
}

export async function getOrderById(id) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function getOrderByNumber(orderNumber) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_number', orderNumber)
    .single();

  if (error) return null;
  return data;
}

export async function getAllOrders({ status, limit = 50, offset = 0 } = {}) {
  let query = supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data;
}

export async function updateOrderStatus(id, status, paymentIntent = null) {
  const update = { status };
  if (paymentIntent) update.stripe_payment_intent = paymentIntent;

  const { data, error } = await supabase
    .from('orders')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    return null;
  }

  // Log status change
  await addStatusHistory(id, status, `Status changed to ${status}`);

  return data;
}

export async function updateOrderTracking(id, trackingNumber, trackingUrl) {
  const { data, error } = await supabase
    .from('orders')
    .update({ tracking_number: trackingNumber, tracking_url: trackingUrl })
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return data;
}

export async function getOrderByStripeSession(sessionId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('stripe_session_id', sessionId)
    .single();

  if (error) return null;
  return data;
}

export async function getOrdersByEmail(email) {
  const { data, error } = await supabase
    .from('orders')
    .select('id, order_number, status, grand_total, items, created_at, tracking_number, tracking_url')
    .eq('customer_email', email.toLowerCase())
    .order('created_at', { ascending: false });

  if (error) return [];
  return data;
}

export async function getOrderStats() {
  const { data: orders, error } = await supabase.from('orders').select('status, grand_total');
  if (error) return { total: { count: 0, revenue: 0 }, paid: { count: 0, revenue: 0 }, pending: { count: 0 } };

  const total = { count: orders.length, revenue: orders.reduce((s, o) => s + Number(o.grand_total), 0) };
  const paid = orders.filter((o) => o.status === 'paid' || o.status === 'processing' || o.status === 'shipped' || o.status === 'delivered');
  const pending = orders.filter((o) => o.status === 'pending');
  return {
    total,
    paid: { count: paid.length, revenue: paid.reduce((s, o) => s + Number(o.grand_total), 0) },
    pending: { count: pending.length },
  };
}

// ─── Status History ──────────────────────────────────────────

export async function addStatusHistory(orderId, status, note = '') {
  await supabase
    .from('order_status_history')
    .insert({ order_id: orderId, status, note });
}

export async function getStatusHistory(orderId) {
  const { data, error } = await supabase
    .from('order_status_history')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: true });

  if (error) return [];
  return data;
}

// ─── Invoices ────────────────────────────────────────────────

export async function createInvoice(orderId, { dueDate, notes, tax = 0 } = {}) {
  // Get order
  const order = await getOrderById(orderId);
  if (!order) throw new Error('Order not found');

  // Generate invoice number
  const { data: numResult } = await supabase.rpc('next_invoice_number');
  const invoiceNumber = numResult || `PJG-INV-${Date.now()}`;

  const invoice = {
    order_id: orderId,
    invoice_number: invoiceNumber,
    status: 'draft',
    subtotal: order.subtotal,
    delivery_cost: order.delivery_cost,
    tax,
    total: Number(order.subtotal) + Number(order.delivery_cost) + tax,
    due_date: dueDate || null,
    notes: notes || '',
  };

  const { data, error } = await supabase
    .from('invoices')
    .insert(invoice)
    .select()
    .single();

  if (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
  return data;
}

export async function getInvoiceById(id) {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function getInvoiceByOrderId(orderId) {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('order_id', orderId)
    .single();

  if (error) return null;
  return data;
}

export async function getAllInvoices({ status, limit = 50, offset = 0 } = {}) {
  let query = supabase
    .from('invoices')
    .select(`
      *,
      orders!inner(customer_name, customer_email)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }

  // Flatten the joined data
  return data.map((inv) => ({
    ...inv,
    customer_name: inv.orders?.customer_name || '',
    customer_email: inv.orders?.customer_email || '',
    orders: undefined,
  }));
}

export async function updateInvoiceStatus(id, status) {
  const update = { status };
  if (status === 'paid') update.paid_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('invoices')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating invoice:', error);
    return null;
  }
  return data;
}

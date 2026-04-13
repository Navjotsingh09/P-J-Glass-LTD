// Direct Supabase REST API calls (bypasses JS SDK which hangs on Vercel)
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function headers(extra = {}) {
  return {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function supabaseGet(table, query = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error(`Supabase GET ${table} failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function supabaseInsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: headers({ 'Prefer': 'return=representation' }),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Supabase INSERT ${table} failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();
  return rows[0];
}

async function supabaseUpdate(table, filter, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: headers({ 'Prefer': 'return=representation' }),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Supabase UPDATE ${table} failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();
  return rows[0];
}

async function supabaseDelete(table, filter) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error(`Supabase DELETE ${table} failed: ${res.status} ${await res.text()}`);
}

async function supabaseRpc(fn) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: headers(),
  });
  if (!res.ok) return null;
  return res.json();
}

// ─── Orders ──────────────────────────────────────────────────

export async function createOrder(data) {
  const orderNumber = await supabaseRpc('next_order_number') || `PJG-${Date.now()}`;

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

  const created = await supabaseInsert('orders', order);
  await addStatusHistory(created.id, created.status, 'Order created');
  return created;
}

export async function getOrderById(id) {
  const rows = await supabaseGet('orders', `?id=eq.${id}&limit=1`);
  return rows[0] || null;
}

export async function getOrderByNumber(orderNumber) {
  const rows = await supabaseGet('orders', `?order_number=eq.${encodeURIComponent(orderNumber)}&limit=1`);
  return rows[0] || null;
}

export async function getAllOrders({ status, limit = 50, offset = 0 } = {}) {
  let query = `?order=created_at.desc&offset=${offset}&limit=${limit}`;
  if (status) query += `&status=eq.${status}`;
  return supabaseGet('orders', query);
}

export async function updateOrderStatus(id, status, paymentIntent = null) {
  const update = { status };
  if (paymentIntent) update.stripe_payment_intent = paymentIntent;
  const result = await supabaseUpdate('orders', `id=eq.${id}`, update);
  await addStatusHistory(id, status, `Status changed to ${status}`);
  return result;
}

export async function updateOrderTracking(id, trackingNumber, trackingUrl) {
  return supabaseUpdate('orders', `id=eq.${id}`, {
    tracking_number: trackingNumber,
    tracking_url: trackingUrl,
  });
}

export async function getOrderByStripeSession(sessionId) {
  const rows = await supabaseGet('orders', `?stripe_session_id=eq.${encodeURIComponent(sessionId)}&limit=1`);
  return rows[0] || null;
}

export async function getOrdersByEmail(email) {
  return supabaseGet('orders', `?customer_email=eq.${encodeURIComponent(email.toLowerCase())}&order=created_at.desc&select=id,order_number,status,grand_total,items,created_at,tracking_number,tracking_url`);
}

export async function getOrderStats() {
  try {
    const orders = await supabaseGet('orders', '?select=status,grand_total');
    const total = { count: orders.length, revenue: orders.reduce((s, o) => s + Number(o.grand_total), 0) };
    const paid = orders.filter((o) => ['paid', 'processing', 'shipped', 'delivered'].includes(o.status));
    const pending = orders.filter((o) => o.status === 'pending');
    return {
      total,
      paid: { count: paid.length, revenue: paid.reduce((s, o) => s + Number(o.grand_total), 0) },
      pending: { count: pending.length },
    };
  } catch {
    return { total: { count: 0, revenue: 0 }, paid: { count: 0, revenue: 0 }, pending: { count: 0 } };
  }
}

// ─── Status History ──────────────────────────────────────────

export async function addStatusHistory(orderId, status, note = '') {
  try {
    await supabaseInsert('order_status_history', { order_id: orderId, status, note });
  } catch (err) {
    console.error('Status history insert failed:', err);
  }
}

export async function getStatusHistory(orderId) {
  try {
    return await supabaseGet('order_status_history', `?order_id=eq.${orderId}&order=created_at.asc`);
  } catch {
    return [];
  }
}

// ─── Invoices ────────────────────────────────────────────────

export async function createInvoice(orderId, { dueDate, notes, tax = 0 } = {}) {
  const order = await getOrderById(orderId);
  if (!order) throw new Error('Order not found');

  const invoiceNumber = await supabaseRpc('next_invoice_number') || `PJG-INV-${Date.now()}`;

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

  return supabaseInsert('invoices', invoice);
}

export async function getInvoiceById(id) {
  const rows = await supabaseGet('invoices', `?id=eq.${id}&limit=1`);
  return rows[0] || null;
}

export async function getInvoiceByOrderId(orderId) {
  const rows = await supabaseGet('invoices', `?order_id=eq.${orderId}&limit=1`);
  return rows[0] || null;
}

export async function getAllInvoices({ status, limit = 50, offset = 0 } = {}) {
  let query = `?order=created_at.desc&offset=${offset}&limit=${limit}&select=*,orders(customer_name,customer_email)`;
  if (status) query += `&status=eq.${status}`;
  const data = await supabaseGet('invoices', query);
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
  return supabaseUpdate('invoices', `id=eq.${id}`, update);
}

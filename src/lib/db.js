import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Use /tmp on Vercel (writable), or local data/ in dev
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'pjglass-db.json');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readDb() {
  ensureDir();
  if (!fs.existsSync(DB_FILE)) {
    return { orders: [], invoices: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    return { orders: [], invoices: [] };
  }
}

function writeDb(data) {
  ensureDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function now() {
  return new Date().toISOString();
}

// ─── Orders ──────────────────────────────────────────────────

export function createOrder(data) {
  const db = readDb();
  const order = {
    id: data.id,
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
    created_at: now(),
    updated_at: now(),
  };
  db.orders.push(order);
  writeDb(db);
  return order;
}

export function getOrderById(id) {
  const db = readDb();
  return db.orders.find((o) => o.id === id) || null;
}

export function getAllOrders({ status, limit = 50, offset = 0 } = {}) {
  const db = readDb();
  let orders = [...db.orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  if (status) orders = orders.filter((o) => o.status === status);
  return orders.slice(offset, offset + limit);
}

export function updateOrderStatus(id, status, paymentIntent = null) {
  const db = readDb();
  const order = db.orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  order.updated_at = now();
  if (paymentIntent) order.stripe_payment_intent = paymentIntent;
  writeDb(db);
  return order;
}

export function getOrderByStripeSession(sessionId) {
  const db = readDb();
  return db.orders.find((o) => o.stripe_session_id === sessionId) || null;
}

export function getOrderStats() {
  const db = readDb();
  const orders = db.orders;
  const total = { count: orders.length, revenue: orders.reduce((s, o) => s + o.grand_total, 0) };
  const paid = orders.filter((o) => o.status === 'paid');
  const pending = orders.filter((o) => o.status === 'pending');
  return {
    total,
    paid: { count: paid.length, revenue: paid.reduce((s, o) => s + o.grand_total, 0) },
    pending: { count: pending.length },
  };
}

// ─── Invoices ────────────────────────────────────────────────

function generateInvoiceNumber(invoices) {
  if (!invoices.length) return 'PJG-INV-0001';
  const sorted = [...invoices].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const num = parseInt(sorted[0].invoice_number.split('-').pop(), 10) + 1;
  return `PJG-INV-${String(num).padStart(4, '0')}`;
}

export function createInvoice(orderId, { dueDate, notes, tax = 0 } = {}) {
  const db = readDb();
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) throw new Error('Order not found');

  const invoice = {
    id: uuidv4(),
    order_id: orderId,
    invoice_number: generateInvoiceNumber(db.invoices),
    status: 'draft',
    subtotal: order.subtotal,
    delivery_cost: order.delivery_cost,
    tax,
    total: order.subtotal + order.delivery_cost + tax,
    due_date: dueDate || null,
    paid_at: null,
    notes: notes || '',
    created_at: now(),
    updated_at: now(),
  };
  db.invoices.push(invoice);
  writeDb(db);
  return invoice;
}

export function getInvoiceById(id) {
  const db = readDb();
  return db.invoices.find((i) => i.id === id) || null;
}

export function getInvoiceByOrderId(orderId) {
  const db = readDb();
  return db.invoices.find((i) => i.order_id === orderId) || null;
}

export function getAllInvoices({ status, limit = 50, offset = 0 } = {}) {
  const db = readDb();
  let invoices = [...db.invoices].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  if (status) invoices = invoices.filter((i) => i.status === status);

  // Join customer data from orders
  return invoices.slice(offset, offset + limit).map((inv) => {
    const order = db.orders.find((o) => o.id === inv.order_id);
    return {
      ...inv,
      customer_name: order?.customer_name || '',
      customer_email: order?.customer_email || '',
    };
  });
}

export function updateInvoiceStatus(id, status) {
  const db = readDb();
  const invoice = db.invoices.find((i) => i.id === id);
  if (!invoice) return null;
  invoice.status = status;
  invoice.updated_at = now();
  if (status === 'paid') invoice.paid_at = now();
  writeDb(db);
  return invoice;
}

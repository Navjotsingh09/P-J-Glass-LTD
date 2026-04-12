import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'pjglass.db');

let db;

function getDb() {
  if (!db) {
    // Ensure data directory exists
    const fs = require('fs');
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initTables(db);
  }
  return db;
}

function initTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      stripe_session_id TEXT UNIQUE,
      stripe_payment_intent TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      address TEXT,
      city TEXT,
      postcode TEXT,
      notes TEXT,
      subtotal REAL NOT NULL,
      delivery_cost REAL NOT NULL DEFAULT 0,
      delivery_zone TEXT,
      grand_total REAL NOT NULL,
      items_json TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      invoice_number TEXT UNIQUE NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft',
      subtotal REAL NOT NULL,
      delivery_cost REAL NOT NULL DEFAULT 0,
      tax REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL,
      due_date TEXT,
      paid_at TEXT,
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
  `);
}

// ─── Orders ──────────────────────────────────────────────────

export function createOrder(data) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO orders (id, stripe_session_id, status, customer_name, customer_email, customer_phone, address, city, postcode, notes, subtotal, delivery_cost, delivery_zone, grand_total, items_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    data.id,
    data.stripeSessionId || null,
    data.status || 'pending',
    data.customerName,
    data.customerEmail,
    data.customerPhone || '',
    data.address || '',
    data.city || '',
    data.postcode || '',
    data.notes || '',
    data.subtotal,
    data.deliveryCost || 0,
    data.deliveryZone || '',
    data.grandTotal,
    JSON.stringify(data.items)
  );
  return getOrderById(data.id);
}

export function getOrderById(id) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  if (!row) return null;
  return { ...row, items: JSON.parse(row.items_json) };
}

export function getAllOrders({ status, limit = 50, offset = 0 } = {}) {
  const db = getDb();
  let query = 'SELECT * FROM orders';
  const params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  return db.prepare(query).all(...params).map((row) => ({
    ...row,
    items: JSON.parse(row.items_json),
  }));
}

export function updateOrderStatus(id, status, paymentIntent = null) {
  const db = getDb();
  if (paymentIntent) {
    db.prepare(`UPDATE orders SET status = ?, stripe_payment_intent = ?, updated_at = datetime('now') WHERE id = ?`).run(status, paymentIntent, id);
  } else {
    db.prepare(`UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?`).run(status, id);
  }
  return getOrderById(id);
}

export function getOrderByStripeSession(sessionId) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM orders WHERE stripe_session_id = ?').get(sessionId);
  if (!row) return null;
  return { ...row, items: JSON.parse(row.items_json) };
}

export function getOrderStats() {
  const db = getDb();
  const total = db.prepare('SELECT COUNT(*) as count, COALESCE(SUM(grand_total), 0) as revenue FROM orders').get();
  const paid = db.prepare("SELECT COUNT(*) as count, COALESCE(SUM(grand_total), 0) as revenue FROM orders WHERE status = 'paid'").get();
  const pending = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").get();
  return { total, paid, pending };
}

// ─── Invoices ────────────────────────────────────────────────

function generateInvoiceNumber() {
  const db = getDb();
  const last = db.prepare("SELECT invoice_number FROM invoices ORDER BY created_at DESC LIMIT 1").get();
  if (!last) return 'PJG-INV-0001';
  const num = parseInt(last.invoice_number.split('-').pop(), 10) + 1;
  return `PJG-INV-${String(num).padStart(4, '0')}`;
}

export function createInvoice(orderId, { dueDate, notes, tax = 0 } = {}) {
  const db = getDb();
  const order = getOrderById(orderId);
  if (!order) throw new Error('Order not found');

  const { v4: uuidv4 } = require('uuid');
  const id = uuidv4();
  const invoiceNumber = generateInvoiceNumber();
  const total = order.subtotal + order.delivery_cost + tax;

  db.prepare(`
    INSERT INTO invoices (id, order_id, invoice_number, subtotal, delivery_cost, tax, total, due_date, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, orderId, invoiceNumber, order.subtotal, order.delivery_cost, tax, total, dueDate || null, notes || '');

  return getInvoiceById(id);
}

export function getInvoiceById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
}

export function getInvoiceByOrderId(orderId) {
  const db = getDb();
  return db.prepare('SELECT * FROM invoices WHERE order_id = ?').get(orderId);
}

export function getAllInvoices({ status, limit = 50, offset = 0 } = {}) {
  const db = getDb();
  let query = 'SELECT invoices.*, orders.customer_name, orders.customer_email FROM invoices JOIN orders ON invoices.order_id = orders.id';
  const params = [];

  if (status) {
    query += ' WHERE invoices.status = ?';
    params.push(status);
  }

  query += ' ORDER BY invoices.created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  return db.prepare(query).all(...params);
}

export function updateInvoiceStatus(id, status) {
  const db = getDb();
  const paidAt = status === 'paid' ? "datetime('now')" : 'NULL';
  db.prepare(`UPDATE invoices SET status = ?, paid_at = ${paidAt}, updated_at = datetime('now') WHERE id = ?`).run(status, id);
  return getInvoiceById(id);
}

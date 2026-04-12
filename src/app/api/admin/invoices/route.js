import { NextResponse } from 'next/server';
import { getAllInvoices, createInvoice } from '@/lib/db';

function isAuthorized(request) {
  const key = request.headers.get('x-admin-key');
  return key === process.env.ADMIN_SECRET_KEY;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || undefined;
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const invoices = getAllInvoices({ status, limit, offset });
  return NextResponse.json({ invoices, count: invoices.length });
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { orderId, dueDate, notes, tax } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    const invoice = createInvoice(orderId, { dueDate, notes, tax });
    return NextResponse.json(invoice, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

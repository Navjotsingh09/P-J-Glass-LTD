import { NextResponse } from 'next/server';
import { getAllOrders, getOrderStats } from '@/lib/db';

// Simple admin auth check via secret header
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
  const statsOnly = searchParams.get('stats') === 'true';

  if (statsOnly) {
    return NextResponse.json(getOrderStats());
  }

  const orders = getAllOrders({ status, limit, offset });
  return NextResponse.json({ orders, count: orders.length });
}

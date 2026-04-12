'use client';

import { useState, useEffect, useCallback } from 'react';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
  draft: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-800',
  overdue: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const headers = { 'x-admin-key': adminKey };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const url = statusFilter
        ? `/api/admin/orders?status=${statusFilter}`
        : '/api/admin/orders';
      const res = await fetch(url, { headers });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch {}
    setLoading(false);
  }, [adminKey, statusFilter]);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/invoices', { headers });
      if (res.ok) {
        const data = await res.json();
        setInvoices(data.invoices);
      }
    } catch {}
    setLoading(false);
  }, [adminKey]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/orders?stats=true', { headers });
      if (res.ok) setStats(await res.json());
    } catch {}
  }, [adminKey]);

  const handleLogin = async () => {
    const res = await fetch('/api/admin/orders?stats=true', {
      headers: { 'x-admin-key': adminKey },
    });
    if (res.ok) {
      setAuthenticated(true);
      setStats(await res.json());
    } else {
      alert('Invalid admin key');
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'invoices') fetchInvoices();
    fetchStats();
  }, [authenticated, activeTab, statusFilter]);

  const updateOrderStatus = async (orderId, newStatus) => {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      fetchOrders();
      fetchStats();
    }
  };

  const updateInvoiceStatus = async (invoiceId, newStatus) => {
    const res = await fetch(`/api/admin/invoices/${invoiceId}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchInvoices();
  };

  const createInvoiceForOrder = async (orderId) => {
    const res = await fetch('/api/admin/invoices', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });
    if (res.ok) {
      fetchInvoices();
      alert('Invoice created');
    } else {
      const err = await res.json();
      alert(err.error || 'Failed to create invoice');
    }
  };

  // ─── Login Screen ─────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-brand-navy mb-2">P&J Glass Admin</h1>
          <p className="text-gray-500 text-sm mb-6">Enter your admin key to continue</p>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Admin secret key"
            className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accent focus:border-brand-accent mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-brand-navy text-white py-3 rounded text-sm font-medium hover:bg-brand-navy/90 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // ─── Dashboard ─────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Orders, invoices & payments</p>
          </div>
          <button
            onClick={() => { setAuthenticated(false); setAdminKey(''); }}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Orders" value={stats.total?.count || 0} />
            <StatCard label="Total Revenue" value={`£${(stats.total?.revenue || 0).toFixed(2)}`} />
            <StatCard label="Paid Orders" value={stats.paid?.count || 0} accent />
            <StatCard label="Pending" value={stats.pending?.count || 0} warn />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 shadow-sm w-fit">
          {['orders', 'invoices'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium rounded-md transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-brand-navy text-white'
                  : 'text-gray-500 hover:text-brand-navy'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ─── Orders Tab ─── */}
        {activeTab === 'orders' && (
          <>
            {/* Status filter */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {['', 'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors capitalize ${
                    statusFilter === s
                      ? 'bg-brand-navy text-white border-brand-navy'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-brand-navy'
                  }`}
                >
                  {s || 'All'}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-400 text-lg">No orders found</p>
                <p className="text-gray-300 text-sm mt-2">Orders will appear here when customers complete checkout</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-4 py-3 font-medium text-gray-600">Order</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Customer</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Items</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Total</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Date</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <button
                              onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                              className="text-brand-accent hover:underline font-mono text-xs"
                            >
                              {order.id.slice(0, 8)}...
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{order.customer_name}</div>
                            <div className="text-gray-400 text-xs">{order.customer_email}</div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{order.items?.length || 0} items</td>
                          <td className="px-4 py-3 font-medium text-gray-900">£{order.grand_total?.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] || 'bg-gray-100'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{new Date(order.created_at).toLocaleDateString('en-GB')}</td>
                          <td className="px-4 py-3">
                            <select
                              value=""
                              onChange={(e) => {
                                if (e.target.value === 'invoice') {
                                  createInvoiceForOrder(order.id);
                                } else if (e.target.value) {
                                  updateOrderStatus(order.id, e.target.value);
                                }
                              }}
                              className="text-xs border rounded px-2 py-1 bg-white"
                            >
                              <option value="">Update...</option>
                              <option value="processing">Mark Processing</option>
                              <option value="shipped">Mark Shipped</option>
                              <option value="delivered">Mark Delivered</option>
                              <option value="cancelled">Cancel</option>
                              <option value="refunded">Refund</option>
                              <option disabled>────────────</option>
                              <option value="invoice">Create Invoice</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Order detail */}
            {selectedOrder && (
              <div className="mt-4 bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-brand-navy">Order Details</h3>
                  <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 text-sm">Close</button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Customer</p>
                    <p className="font-medium">{selectedOrder.customer_name}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.customer_email}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.customer_phone}</p>
                    <p className="text-sm text-gray-500 mt-2">{selectedOrder.address}, {selectedOrder.city}, {selectedOrder.postcode}</p>
                    {selectedOrder.notes && <p className="text-sm text-gray-500 mt-2 italic">Notes: {selectedOrder.notes}</p>}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Items</p>
                    <div className="space-y-2">
                      {selectedOrder.items?.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name} {item.size ? `(${item.size})` : ''}</span>
                          <span className="font-medium">£{item.subtotal?.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-3 pt-3 space-y-1 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>£{selectedOrder.subtotal?.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Delivery ({selectedOrder.delivery_zone})</span><span>£{selectedOrder.delivery_cost?.toFixed(2)}</span></div>
                      <div className="flex justify-between font-semibold text-brand-navy"><span>Total</span><span>£{selectedOrder.grand_total?.toFixed(2)}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ─── Invoices Tab ─── */}
        {activeTab === 'invoices' && (
          <>
            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading...</div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-400 text-lg">No invoices yet</p>
                <p className="text-gray-300 text-sm mt-2">Invoices are auto-generated when Stripe payments complete, or create one from an order</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-4 py-3 font-medium text-gray-600">Invoice #</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Customer</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Total</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Due Date</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Created</th>
                        <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs font-medium">{inv.invoice_number}</td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{inv.customer_name}</div>
                            <div className="text-gray-400 text-xs">{inv.customer_email}</div>
                          </td>
                          <td className="px-4 py-3 font-medium">£{inv.total?.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[inv.status] || 'bg-gray-100'}`}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{inv.due_date ? new Date(inv.due_date).toLocaleDateString('en-GB') : '—'}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{new Date(inv.created_at).toLocaleDateString('en-GB')}</td>
                          <td className="px-4 py-3">
                            <select
                              value=""
                              onChange={(e) => e.target.value && updateInvoiceStatus(inv.id, e.target.value)}
                              className="text-xs border rounded px-2 py-1 bg-white"
                            >
                              <option value="">Update...</option>
                              <option value="sent">Mark Sent</option>
                              <option value="paid">Mark Paid</option>
                              <option value="overdue">Mark Overdue</option>
                              <option value="cancelled">Cancel</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, accent, warn }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent ? 'text-green-600' : warn ? 'text-yellow-600' : 'text-brand-navy'}`}>
        {value}
      </p>
    </div>
  );
}

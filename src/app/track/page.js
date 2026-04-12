'use client';

import { useState } from 'react';
import Link from 'next/link';

const STATUS_STEPS = ['pending', 'paid', 'processing', 'shipped', 'delivered'];

const STATUS_LABELS = {
  pending: 'Order Placed',
  paid: 'Payment Confirmed',
  processing: 'Being Prepared',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatCurrency(amount) {
  return `£${Number(amount).toFixed(2)}`;
}

function StatusTimeline({ currentStatus, history }) {
  const isCancelled = currentStatus === 'cancelled' || currentStatus === 'refunded';
  const currentIdx = STATUS_STEPS.indexOf(currentStatus);

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
        <p className="text-red-700 font-semibold text-lg">{STATUS_LABELS[currentStatus]}</p>
        {history.length > 0 && (
          <p className="text-red-500 text-sm mt-1">{formatDate(history[history.length - 1].created_at)}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 overflow-x-auto py-4">
      {STATUS_STEPS.map((step, i) => {
        const isComplete = i <= currentIdx;
        const isCurrent = step === currentStatus;
        const historyEntry = history.find((h) => h.status === step);
        return (
          <div key={step} className="flex-1 min-w-[80px] flex flex-col items-center text-center relative">
            {i > 0 && (
              <div
                className={`absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                  isComplete ? 'bg-brand-accent' : 'bg-gray-200'
                }`}
                style={{ zIndex: 0 }}
              />
            )}
            <div
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                isCurrent
                  ? 'bg-brand-accent text-white ring-4 ring-brand-accent/20'
                  : isComplete
                  ? 'bg-brand-accent text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {isComplete ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <p className={`text-xs mt-2 font-medium ${isComplete ? 'text-brand-navy' : 'text-gray-400'}`}>
              {STATUS_LABELS[step]}
            </p>
            {historyEntry && (
              <p className="text-[10px] text-brand-grey mt-0.5">{formatDate(historyEntry.created_at)}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function TrackPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/track?order=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Order not found');
      } else {
        setOrder(data);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-label mb-3">Order Tracking</p>
          <h1 className="text-display-md text-brand-navy mb-4">Track Your Order</h1>
          <p className="text-brand-grey max-w-md mx-auto">
            Enter your order number and email address to check the status of your order.
          </p>
        </div>

        {/* Lookup Form */}
        <form onSubmit={handleSubmit} className="bg-brand-light rounded-xl p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-brand-navy mb-1">
                Order Number
              </label>
              <input
                id="orderNumber"
                type="text"
                placeholder="PJG-10001"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-navy mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-filled disabled:opacity-60"
          >
            {loading ? 'Looking up...' : 'Track Order'}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}
        </form>

        {/* Results */}
        {order && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Order header */}
            <div className="bg-brand-navy text-white p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-brand-accent text-sm font-medium">Order Number</p>
                  <p className="text-xl font-bold">{order.order_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-brand-accent text-sm font-medium">Placed</p>
                  <p className="text-sm">{formatDate(order.created_at)}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 border-b border-gray-100">
              <StatusTimeline currentStatus={order.status} history={order.history} />
            </div>

            {/* Tracking info */}
            {order.tracking_number && (
              <div className="p-6 border-b border-gray-100 bg-brand-light/50">
                <h3 className="text-sm font-semibold text-brand-navy mb-2">Tracking Information</h3>
                <p className="text-brand-grey">
                  Tracking Number: <span className="font-mono font-medium text-brand-navy">{order.tracking_number}</span>
                </p>
                {order.tracking_url && (
                  <a
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-brand-accent font-medium hover:underline"
                  >
                    Track Package →
                  </a>
                )}
              </div>
            )}

            {/* Items */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-brand-navy mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-brand-navy font-medium">{item.name}</p>
                      {item.size && <p className="text-xs text-brand-grey">Size: {item.size}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-brand-navy font-medium">{formatCurrency(item.price * item.quantity)}</p>
                      <p className="text-xs text-brand-grey">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-right space-y-1">
                <p className="text-sm text-brand-grey">Subtotal: {formatCurrency(order.subtotal)}</p>
                <p className="text-sm text-brand-grey">
                  Delivery{order.delivery_zone ? ` (${order.delivery_zone})` : ''}: {order.delivery_cost > 0 ? formatCurrency(order.delivery_cost) : 'FREE'}
                </p>
                <p className="text-lg font-bold text-brand-navy">Total: {formatCurrency(order.grand_total)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Help */}
        <div className="text-center mt-10">
          <p className="text-brand-grey text-sm">
            Can&apos;t find your order? Contact us at{' '}
            <a href="tel:02085991622" className="text-brand-accent hover:underline">020 8599 1622</a> or{' '}
            <Link href="/contact" className="text-brand-accent hover:underline">send a message</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}

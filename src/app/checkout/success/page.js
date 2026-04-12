'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }
    // Payment confirmed via Stripe redirect — no need to verify client-side
    // The webhook handles order status updates
    setStatus('success');
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-28">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-brand-grey">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6 pt-28">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-brand-navy mb-4">Something went wrong</h1>
          <p className="text-brand-grey mb-8">We couldn&apos;t confirm your payment. Please contact us on 020 8599 1622.</p>
          <Link href="/checkout" className="btn-filled">Return to Checkout</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 pt-28">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5ec4d4" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p className="section-label mb-4">Payment Successful</p>
        <h1 className="text-display-md text-brand-navy mb-4">Thank You!</h1>
        <p className="text-brand-grey mb-2">
          Your payment has been processed successfully. We&apos;ve sent a confirmation email with your order details.
        </p>
        <p className="text-brand-grey text-sm mb-8">
          Our team will begin processing your order shortly. If you have questions, call us on 020 8599 1622.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="btn-filled">Continue Shopping</Link>
          <Link href="/" className="btn-outline-fluid">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SuccessContent />
    </Suspense>
  );
}

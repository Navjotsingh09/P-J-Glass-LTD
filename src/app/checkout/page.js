'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { calculateDelivery } from '@/lib/delivery';

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, requiresApproval } = useCart();
  const [step, setStep] = useState(1); // 1: cart, 2: details, 3: confirmation
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Delivery
  const [postcode, setPostcode] = useState('');
  const [delivery, setDelivery] = useState(null);

  // Customer details
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    notes: '',
  });

  const handleDeliveryCheck = () => {
    const result = calculateDelivery(postcode, items);
    setDelivery(result);
    if (result && !result.error) {
      setCustomer((prev) => ({ ...prev, postcode }));
    }
  };

  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const grandTotal = totalPrice + (delivery && !delivery.error ? delivery.total : 0);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Send to Stripe Checkout
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            size: item.selectedSize || '',
            price: item.priceFrom,
            quantity: item.quantity,
          })),
          customer: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            postcode: customer.postcode,
            notes: customer.notes,
          },
          delivery: delivery ? { total: delivery.total, zone: delivery.zone } : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setError(err.message || 'Failed to process payment. Please call us on 020 8599 1622.');
    } finally {
      setSubmitting(false);
    }
  };

  // Empty cart
  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6 pt-28">
        <div className="text-center">
          <p className="section-label mb-4">Your Cart</p>
          <h1 className="text-display-md text-brand-navy mb-6">Your cart is empty</h1>
          <p className="text-brand-grey mb-8">Browse our collection to find the perfect glass product.</p>
          <Link href="/products" className="btn-filled">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // Step 3: Confirmation
  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6 pt-28">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5ec4d4" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p className="section-label mb-4">Order Submitted</p>
          <h1 className="text-display-md text-brand-navy mb-4">
            {requiresApproval ? 'Order Pending Approval' : 'Thank You!'}
          </h1>
          <p className="text-brand-grey mb-4">
            {requiresApproval
              ? 'Your order exceeds £100 and requires manual approval. We\'ll review it and contact you within 24 hours to confirm.'
              : 'Your order has been received. We\'ll send you a confirmation email shortly.'}
          </p>
          <p className="text-brand-grey text-sm mb-8">
            A WhatsApp message has been prepared with your order details. Please send it to complete the notification.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products" className="btn-filled">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-outline-fluid">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="section-label mb-4">Checkout</p>
          <h1 className="text-display-md text-brand-navy">
            {step === 1 ? 'Your Cart' : 'Your Details'}
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-12">
          {['Cart', 'Details & Delivery', 'Confirmation'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step > i + 1
                    ? 'bg-brand-accent text-brand-navy'
                    : step === i + 1
                    ? 'bg-brand-navy text-white'
                    : 'bg-brand-silver text-brand-grey'
                }`}
              >
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-xs tracking-wider uppercase hidden sm:inline ${step === i + 1 ? 'text-brand-navy font-medium' : 'text-brand-grey'}`}>
                {label}
              </span>
              {i < 2 && <div className="w-8 h-px bg-brand-silver mx-2" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <>
                {/* Cart Items */}
                <div className="space-y-0">
                  {items.map((item) => (
                    <div key={item.key} className="flex gap-4 md:gap-6 py-6 border-b border-brand-silver">
                      <div className="w-20 h-24 md:w-28 md:h-36 bg-brand-offwhite flex-shrink-0 relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link href={`/products/${item.id}`} className="text-brand-navy text-sm font-light hover:text-brand-accent transition-colors">
                            {item.name}
                          </Link>
                          {item.selectedSize && (
                            <p className="text-brand-grey text-xs mt-1">Size: {item.selectedSize}</p>
                          )}
                          <p className="text-brand-accent text-sm mt-1">From {item.priceDisplay}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              className="w-8 h-8 border border-brand-silver text-brand-grey hover:border-brand-navy hover:text-brand-navy flex items-center justify-center transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="text-brand-navy text-sm w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              className="w-8 h-8 border border-brand-silver text-brand-grey hover:border-brand-navy hover:text-brand-navy flex items-center justify-center transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.key)}
                            className="text-brand-grey hover:text-red-500 text-xs uppercase tracking-wider transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Calculator */}
                <div className="mt-10 border-t border-brand-silver pt-10">
                  <h3 className="text-brand-navy text-sm tracking-wider uppercase font-medium mb-4">
                    Delivery Estimate
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="Enter postcode (e.g. RM6 4AL)"
                      className="flex-1 bg-transparent border-b border-brand-silver pb-3 text-brand-navy focus:border-brand-accent focus:outline-none transition-colors font-light"
                      onKeyDown={(e) => e.key === 'Enter' && handleDeliveryCheck()}
                    />
                    <button
                      onClick={handleDeliveryCheck}
                      className="btn-filled text-xs px-5 py-2"
                    >
                      Calculate
                    </button>
                  </div>
                  {delivery && !delivery.error && (
                    <div className="mt-4 bg-brand-offwhite p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-brand-navy text-sm font-medium">{delivery.zone}</p>
                          <p className="text-brand-grey text-xs mt-1">Estimated: {delivery.estimate}</p>
                        </div>
                        <span className={`text-sm font-semibold ${delivery.total === 0 ? 'text-green-600' : 'text-brand-navy'}`}>
                          {delivery.totalLabel}
                        </span>
                      </div>
                      {delivery.heavySurcharge > 0 && (
                        <p className="text-brand-grey text-xs mt-2">
                          Includes £{delivery.heavySurcharge.toFixed(2)} surcharge for {delivery.heavyCount} heavy/large item(s)
                        </p>
                      )}
                    </div>
                  )}
                  {delivery?.error && (
                    <p className="text-red-500 text-sm mt-3">{delivery.error}</p>
                  )}
                </div>

                <div className="mt-10">
                  <button
                    onClick={() => {
                      if (!delivery || delivery.error) {
                        setError('Please calculate delivery first by entering your postcode.');
                        return;
                      }
                      setError('');
                      setStep(2);
                    }}
                    className="btn-filled w-full sm:w-auto"
                  >
                    Continue to Details
                  </button>
                  {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                </div>
              </>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmitOrder}>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="section-label block mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-brand-silver pb-3 text-brand-navy focus:border-brand-accent focus:outline-none transition-colors text-lg font-light"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="section-label block mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-brand-silver pb-3 text-brand-navy focus:border-brand-accent focus:outline-none transition-colors text-lg font-light"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="section-label block mb-2">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-brand-silver pb-3 text-brand-navy focus:border-brand-accent focus:outline-none transition-colors text-lg font-light"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="section-label block mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={customer.city}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-brand-silver pb-3 text-brand-navy focus:border-brand-accent focus:outline-none transition-colors text-lg font-light"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="section-label block mb-2">Delivery Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customer.address}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-brand-silver pb-3 text-brand-navy focus:border-brand-accent focus:outline-none transition-colors text-lg font-light"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="postcode-detail" className="section-label block mb-2">Postcode</label>
                      <input
                        type="text"
                        id="postcode-detail"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-brand-silver pb-3 text-brand-navy focus:border-brand-accent focus:outline-none transition-colors text-lg font-light"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="section-label block mb-2">Order Notes (optional)</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={customer.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-transparent border-b border-brand-silver pb-3 text-brand-navy focus:border-brand-accent focus:outline-none transition-colors text-lg font-light resize-none"
                      placeholder="Special instructions, preferred delivery times..."
                    />
                  </div>
                </div>

                {/* Approval Notice */}
                {requiresApproval && (
                  <div className="mt-8 bg-amber-50 border border-amber-200 p-5">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-amber-800 text-sm font-semibold mb-1">Order Requires Approval</h4>
                        <p className="text-amber-700 text-sm font-light">
                          Orders over £100 require manual approval from our team. We&apos;ll review your order and
                          contact you within 24 hours to confirm before processing.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-outline-fluid"
                  >
                    ← Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-filled disabled:opacity-50"
                  >
                    {submitting
                      ? 'Redirecting to payment...'
                      : `Pay £${grandTotal.toFixed(2)} with Stripe`}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-brand-offwhite p-6 sticky top-28">
              <h3 className="text-brand-navy text-sm tracking-wider uppercase font-medium mb-6">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.key} className="flex justify-between text-sm">
                    <span className="text-brand-grey font-light">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-brand-navy">
                      £{(item.priceFrom * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-silver pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-grey">Subtotal</span>
                  <span className="text-brand-navy">£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-grey">Delivery</span>
                  <span className="text-brand-navy">
                    {delivery && !delivery.error ? delivery.totalLabel : '—'}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-brand-silver">
                  <span className="text-brand-navy font-medium">Total</span>
                  <span className="text-brand-navy text-lg font-medium">
                    £{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              {requiresApproval && (
                <div className="mt-4 bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
                  ⚠️ Requires approval (over £100)
                </div>
              )}

              {/* WhatsApp Quick Link */}
              <a
                href={`https://wa.me/442085991622?text=${encodeURIComponent('Hi P&J Glass, I have a question about my order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white text-xs tracking-wider uppercase font-semibold hover:bg-[#1ea952] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

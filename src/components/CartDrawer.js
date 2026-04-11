'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, requiresApproval } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[60] transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-silver">
          <h2 className="text-brand-navy text-xs tracking-[0.15em] uppercase font-semibold">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-brand-grey hover:text-brand-navy transition-colors text-lg"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-brand-grey text-sm mb-4">Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-accent text-xs tracking-wider uppercase hover:text-brand-navy transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-0">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4 py-4 border-b border-brand-silver last:border-0">
                  <div className="w-16 h-20 bg-brand-offwhite flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className="text-brand-navy text-sm font-light hover:text-brand-accent transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    {item.selectedSize && (
                      <p className="text-brand-grey text-xs mt-0.5">Size: {item.selectedSize}</p>
                    )}
                    <p className="text-brand-accent text-xs mt-1">{item.priceDisplay}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-6 h-6 border border-brand-silver text-brand-grey hover:border-brand-navy hover:text-brand-navy flex items-center justify-center transition-colors text-xs"
                        >
                          −
                        </button>
                        <span className="text-brand-navy text-xs w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-6 h-6 border border-brand-silver text-brand-grey hover:border-brand-navy hover:text-brand-navy flex items-center justify-center transition-colors text-xs"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-brand-grey hover:text-red-500 text-[0.6rem] uppercase tracking-wider transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-silver px-6 py-5">
            <div className="flex justify-between mb-1">
              <span className="text-brand-grey text-sm">Subtotal</span>
              <span className="text-brand-navy text-sm font-medium">£{totalPrice.toFixed(2)}</span>
            </div>
            {requiresApproval && (
              <p className="text-amber-600 text-xs mb-3">⚠️ Order over £100 — requires approval</p>
            )}
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-filled block text-center w-full mt-3"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-brand-grey text-xs tracking-wider uppercase mt-3 hover:text-brand-navy transition-colors py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

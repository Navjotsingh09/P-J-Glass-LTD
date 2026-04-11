'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { accessoryCategories } from '@/lib/accessories';
import { productCategories } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '' }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export default function AccessoryDetailClient({ accessory, pairedProducts, relatedAccessories }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState(accessory?.finishes?.[0] || '');
  const { addItem } = useCart();

  const categoryInfo = accessoryCategories[accessory.category];

  const handleAddToCart = () => {
    addItem(accessory, 1, selectedFinish);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-silver pt-28 pb-4 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[0.7rem] tracking-[0.08em] uppercase text-brand-grey flex-wrap">
          <Link href="/" className="hover:text-brand-navy transition-colors">Home</Link>
          <span className="text-brand-silver">/</span>
          <Link href="/accessories" className="hover:text-brand-navy transition-colors">Accessories</Link>
          <span className="text-brand-silver">/</span>
          <Link href={`/accessories?category=${accessory.category}`} className="hover:text-brand-navy transition-colors">
            {categoryInfo?.name || accessory.category}
          </Link>
          <span className="text-brand-silver">/</span>
          <span className="text-brand-navy">{accessory.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-white py-12 md:py-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <Reveal>
            <div className="aspect-square overflow-hidden bg-brand-offwhite img-reveal relative">
              <Image
                src={accessory.image}
                alt={accessory.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {accessory.onSale && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[0.65rem] tracking-[0.1em] uppercase font-bold px-3 py-1.5 z-10">
                  15% OFF
                </span>
              )}
            </div>
          </Reveal>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <div>
                {accessory.brand && (
                  <span className="section-label mb-3 inline-block">{accessory.brand}</span>
                )}
                <h1 className="text-display-md text-brand-navy mb-6">{accessory.name}</h1>

                {/* Price */}
                <div className="mb-8">
                  {accessory.onSale && accessory.originalPriceDisplay && (
                    <p className="text-brand-grey/60 text-lg line-through mb-1">{accessory.originalPriceDisplay}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <p className={`text-2xl tracking-wide ${accessory.onSale ? 'text-red-600 font-semibold' : 'text-brand-accent'}`}>
                      {accessory.priceDisplay}
                    </p>
                    {accessory.onSale && (
                      <span className="bg-red-600 text-white text-[0.6rem] tracking-[0.1em] uppercase font-bold px-2.5 py-1">
                        15% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-brand-grey text-base font-light leading-relaxed mb-8">
                  {accessory.shortDesc}
                </p>

                {/* Finish Selector */}
                {accessory.finishes && accessory.finishes.length > 0 && (
                  <div className="mb-8">
                    <label className="text-[0.7rem] tracking-[0.15em] uppercase text-brand-grey mb-3 block">
                      Available Finishes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {accessory.finishes.map((finish) => (
                        <button
                          key={finish}
                          onClick={() => setSelectedFinish(finish)}
                          className={`px-4 py-2.5 text-[0.7rem] tracking-[0.08em] uppercase border transition-all duration-300 ${
                            selectedFinish === finish
                              ? 'border-brand-accent text-brand-accent bg-brand-accent/5'
                              : 'border-brand-silver text-brand-grey hover:border-brand-navy hover:text-brand-navy'
                          }`}
                        >
                          {finish}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pairs With */}
                {accessory.fitsWith && accessory.fitsWith.length > 0 && (
                  <div className="mb-8 p-4 bg-brand-offwhite border border-brand-silver">
                    <label className="text-[0.7rem] tracking-[0.15em] uppercase text-brand-grey mb-2 block">
                      Pairs With
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {accessory.fitsWith.map((catKey) => (
                        <Link
                          key={catKey}
                          href={`/products?category=${catKey}`}
                          className="text-brand-navy text-sm hover:text-brand-accent transition-colors underline decoration-brand-accent/30"
                        >
                          {productCategories[catKey]?.name || catKey}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`btn-fluid text-center transition-all duration-300 ${
                      addedToCart
                        ? 'bg-green-600 text-white px-6 py-3 text-[0.7rem] tracking-[0.15em] uppercase font-semibold'
                        : 'btn-filled'
                    }`}
                  >
                    {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                  <a href="tel:02085991622" className="btn-fluid btn-outline-fluid text-center">
                    Call 020 8599 1622
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Frequently Bought With — Glass Products */}
      {pairedProducts && pairedProducts.length > 0 && (
        <>
          <div className="divider max-w-7xl mx-auto" />
          <section className="bg-brand-offwhite py-16 md:py-24 px-6 md:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <div className="flex items-end justify-between mb-12">
                  <div>
                    <p className="section-label mb-2">Frequently Bought With</p>
                    <h2 className="text-display-sm text-brand-navy">Glass Products That Pair Well</h2>
                  </div>
                  <Link href="/products" className="text-brand-grey hover:text-brand-navy text-sm tracking-wide transition-colors hidden md:block">
                    View All Products &rarr;
                  </Link>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-6">
                {pairedProducts.slice(0, 3).map((item) => (
                  <Reveal key={item.id}>
                    <Link href={`/products/${item.id}`} className="group block">
                      <div className="aspect-[3/4] overflow-hidden mb-4 img-reveal bg-white relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <h3 className="text-brand-navy text-sm font-light group-hover:text-brand-accent transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="mt-1">
                        {item.onSale && item.originalPriceDisplay && (
                          <span className="text-brand-grey/60 text-xs line-through mr-2">{item.originalPriceDisplay}</span>
                        )}
                        <span className={`text-xs ${item.onSale ? 'text-red-600 font-medium' : 'text-brand-grey'}`}>
                          {item.priceDisplay}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Related Accessories */}
      {relatedAccessories && relatedAccessories.length > 0 && (
        <>
          <div className="divider max-w-7xl mx-auto" />
          <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <div className="flex items-end justify-between mb-12">
                  <h2 className="text-display-sm text-brand-navy">Related Accessories</h2>
                  <Link href="/accessories" className="text-brand-grey hover:text-brand-navy text-sm tracking-wide transition-colors hidden md:block">
                    View All &rarr;
                  </Link>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedAccessories.map((item) => (
                  <Reveal key={item.id}>
                    <Link href={`/accessories/${item.id}`} className="group block">
                      <div className="aspect-square overflow-hidden mb-4 img-reveal bg-brand-offwhite relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <h3 className="text-brand-navy text-sm font-light group-hover:text-brand-accent transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="mt-1">
                        {item.onSale && item.originalPriceDisplay && (
                          <span className="text-brand-grey/60 text-xs line-through mr-2">{item.originalPriceDisplay}</span>
                        )}
                        <span className={`text-xs ${item.onSale ? 'text-red-600 font-medium' : 'text-brand-grey'}`}>
                          {item.priceDisplay}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="bg-brand-offwhite py-20 md:py-28 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <p className="section-label mb-4">Get Started</p>
            <h2 className="text-display-md text-brand-navy mb-6">
              Ready to complete your project?
            </h2>
            <p className="text-brand-grey text-lg font-light max-w-xl mx-auto mb-10">
              Contact our team for a free consultation and expert advice on the right accessories for your installation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-fluid btn-filled">
                Get a Free Quote
              </Link>
              <Link href="/accessories" className="btn-fluid btn-outline-fluid">
                Browse All Accessories
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

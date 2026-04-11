'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { productCategories, getFeaturedProducts, SALE_DISCOUNT } from '@/lib/products';
import { getAllAccessories } from '@/lib/accessories';

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

export default function StorePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const accessories = getAllAccessories().slice(0, 4);
  const salePercent = Math.round(SALE_DISCOUNT * 100);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-brand-navy pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(94,196,212,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(94,196,212,0.2) 0%, transparent 40%)' }} />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-block bg-red-600 text-white text-[0.65rem] tracking-[0.15em] uppercase font-bold px-4 py-2 mb-6">
              {salePercent}% Off Everything — Limited Time
            </span>
            <h1 className="text-display-lg text-white mb-6">
              The P&J Glass Store
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10">
              Premium glass products and accessories — made to measure, delivered across London &amp; Essex.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-fluid btn-filled">
                Shop Glass Products
              </Link>
              <Link href="/accessories" className="btn-fluid border border-white/30 text-white hover:bg-white/10 px-6 py-3 text-[0.7rem] tracking-[0.15em] uppercase font-semibold transition-all duration-300">
                Shop Accessories
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">Glass Products</p>
            <h2 className="text-display-sm text-brand-navy mb-16">Shop by Category</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(productCategories).map(([key, category]) => (
              <Reveal key={key}>
                <Link
                  href={`/products?category=${key}`}
                  className="group block border border-brand-silver hover:border-brand-accent transition-all duration-300 p-8"
                >
                  <h3 className="text-brand-navy text-lg mb-2 group-hover:text-brand-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-brand-grey text-sm font-light leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <span className="text-brand-accent text-[0.7rem] tracking-[0.1em] uppercase font-semibold">
                    Browse &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* Featured Glass Products */}
      <section className="bg-brand-offwhite py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-4">On Sale Now</p>
                <h2 className="text-display-sm text-brand-navy">Featured Products</h2>
              </div>
              <Link href="/products" className="text-brand-grey hover:text-brand-navy text-sm tracking-wide transition-colors hidden md:block">
                View All &rarr;
              </Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Reveal key={product.id}>
                <Link href={`/products/${product.id}`} className="group block bg-white">
                  <div className="aspect-[3/4] overflow-hidden img-reveal bg-brand-offwhite relative">
                    {product.onSale && (
                      <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[0.55rem] tracking-[0.1em] uppercase font-bold px-2 py-1">
                        {salePercent}% OFF
                      </span>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-brand-navy text-sm font-light group-hover:text-brand-accent transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-1">
                      {product.onSale && product.originalPriceDisplay && (
                        <span className="text-brand-grey/60 text-xs line-through mr-2">{product.originalPriceDisplay}</span>
                      )}
                      <span className={`text-xs ${product.onSale ? 'text-red-600 font-medium' : 'text-brand-grey'}`}>
                        {product.priceDisplay}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* Accessories Section */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-4">Hardware &amp; Fittings</p>
                <h2 className="text-display-sm text-brand-navy">Accessories</h2>
              </div>
              <Link href="/accessories" className="text-brand-grey hover:text-brand-navy text-sm tracking-wide transition-colors hidden md:block">
                View All &rarr;
              </Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map((acc) => (
              <Reveal key={acc.id}>
                <Link href={`/accessories/${acc.id}`} className="group block">
                  <div className="aspect-square overflow-hidden img-reveal bg-brand-offwhite relative">
                    {acc.onSale && (
                      <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[0.55rem] tracking-[0.1em] uppercase font-bold px-2 py-1">
                        {salePercent}% OFF
                      </span>
                    )}
                    <Image
                      src={acc.image}
                      alt={acc.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-[0.6rem] tracking-[0.1em] uppercase text-brand-accent mb-1">{acc.brand}</p>
                    <h3 className="text-brand-navy text-sm font-light group-hover:text-brand-accent transition-colors line-clamp-2">
                      {acc.name}
                    </h3>
                    <div className="mt-1">
                      {acc.onSale && acc.originalPriceDisplay && (
                        <span className="text-brand-grey/60 text-xs line-through mr-2">{acc.originalPriceDisplay}</span>
                      )}
                      <span className={`text-xs ${acc.onSale ? 'text-red-600 font-medium' : 'text-brand-grey'}`}>
                        {acc.priceDisplay}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* Glass Calculator CTA */}
      <section className="bg-brand-offwhite py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="section-label mb-4">Instant Pricing</p>
              <h2 className="text-display-sm text-brand-navy mb-6">Glass Price Calculator</h2>
              <p className="text-brand-grey text-base font-light leading-relaxed mb-8">
                Get an instant estimate for your glass project. Enter your dimensions, select your glass type, and see pricing in seconds — no phone calls needed.
              </p>
              <Link href="/glass-calculator" className="btn-fluid btn-filled inline-block">
                Open Calculator
              </Link>
            </Reveal>
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '01', label: 'Enter Dimensions', desc: 'Width × height in mm' },
                  { num: '02', label: 'Select Glass Type', desc: 'Toughened, laminated, etc.' },
                  { num: '03', label: 'Choose Options', desc: 'Finish, edges, cutouts' },
                  { num: '04', label: 'Get Your Price', desc: 'Instant online quote' },
                ].map((step) => (
                  <div key={step.num} className="border border-brand-silver bg-white p-5">
                    <span className="text-brand-accent text-sm tracking-wide">{step.num}</span>
                    <h3 className="text-brand-navy text-sm mt-2 mb-1">{step.label}</h3>
                    <p className="text-brand-grey text-xs font-light">{step.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* Why Shop With Us */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">The P&amp;J Difference</p>
            <h2 className="text-display-sm text-brand-navy mb-16">Why Shop With Us</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Made to Measure', desc: 'Every product cut to your exact specifications' },
              { title: 'Fast Lead Times', desc: '10–15 working days on most products' },
              { title: '10-Year Guarantee', desc: 'Comprehensive warranty on all glass products' },
              { title: 'Expert Installation', desc: 'Professional fitting by certified installers' },
              { title: 'Free Site Survey', desc: 'Complimentary on-site measurement service' },
              { title: 'Any RAL Colour', desc: 'Custom colour matching for splashbacks' },
              { title: 'Competitive Pricing', desc: 'Trade and retail prices with no hidden fees' },
              { title: 'Free Advice', desc: 'Expert guidance from our knowledgeable team' },
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="border-t border-brand-silver pt-6">
                  <span className="text-brand-accent text-sm tracking-wide">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-brand-navy text-sm mt-3 mb-2">{item.title}</h3>
                  <p className="text-brand-grey text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-offwhite py-20 md:py-28 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <p className="section-label mb-4">Get Started</p>
            <h2 className="text-display-md text-brand-navy mb-6">
              Ready to transform your space?
            </h2>
            <p className="text-brand-grey text-lg font-light max-w-xl mx-auto mb-10">
              Contact our team for a free consultation and bespoke quote tailored to your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-fluid btn-filled">
                Get a Free Quote
              </Link>
              <Link href="/products" className="btn-fluid btn-outline-fluid">
                Browse All Products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

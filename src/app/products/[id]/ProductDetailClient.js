'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { productCategories } from '@/lib/products';

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

export default function ProductDetailClient({ product, relatedProducts }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');

  const categoryInfo = productCategories[product.category];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-black border-b border-white/5 pt-28 pb-4 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[0.7rem] tracking-[0.08em] uppercase text-brand-grey">
          <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <Link href="/products" className="hover:text-brand-white transition-colors">Collection</Link>
          <span className="text-white/20">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-brand-white transition-colors">
            {categoryInfo?.name || product.category}
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-brand-white">{product.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-brand-black py-12 md:py-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden bg-brand-charcoal img-reveal">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <div>
                {(product.popular || product.trending) && (
                  <span className="section-label mb-4 inline-block">
                    {product.trending ? 'Trending' : 'Popular'}
                  </span>
                )}
                <h1 className="text-display-md text-brand-white mb-6">{product.name}</h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? '#c8a97e' : 'none'} stroke="#c8a97e" strokeWidth="1.5">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-brand-grey text-sm">{product.rating}</span>
                  </div>
                )}

                {/* Price */}
                <p className="text-brand-accent text-2xl tracking-wide mb-8">{product.priceDisplay}</p>

                {/* Description */}
                <p className="text-brand-grey text-base font-light leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-8">
                    <label className="text-[0.7rem] tracking-[0.15em] uppercase text-brand-grey mb-3 block">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2.5 text-[0.7rem] tracking-[0.08em] uppercase border transition-all duration-300 ${
                            selectedSize === size
                              ? 'border-brand-accent text-brand-accent bg-brand-accent/5'
                              : 'border-white/10 text-brand-grey hover:border-white/30 hover:text-brand-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {product.features && (
                  <div className="mb-10">
                    <label className="text-[0.7rem] tracking-[0.15em] uppercase text-brand-grey mb-3 block">
                      Key Features
                    </label>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-brand-light text-sm font-light">
                          <span className="text-brand-accent mt-0.5">&#8226;</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" className="btn-fluid btn-filled text-center">
                    Request a Quote
                  </Link>
                  <a href="tel:02085991622" className="btn-fluid btn-outline-fluid text-center">
                    Call 020 8599 1622
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* Specifications */}
      <section className="bg-brand-black py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-display-sm text-brand-white mb-12">Technical Specifications</h2>
          </Reveal>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
              {[
                { label: 'Category', value: categoryInfo?.name || product.category },
                { label: 'Material', value: product.material || 'Toughened Safety Glass' },
                { label: 'Thickness', value: product.thickness || 'Standard' },
                { label: 'Finish', value: product.finish || 'Clear' },
                { label: 'Warranty', value: '10 Years' },
                { label: 'Lead Time', value: '10\u201315 Working Days' },
                { label: 'Compliance', value: 'BS EN 12150 / Building Regs' },
                { label: 'Service Area', value: 'London & Essex' },
              ].map((spec, i) => (
                <div key={i} className="flex justify-between py-4 border-b border-white/5">
                  <span className="text-brand-grey text-sm">{spec.label}</span>
                  <span className="text-brand-white text-sm font-light">{spec.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* Installation Process */}
      <section className="bg-brand-black py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">Our Process</p>
            <h2 className="text-display-sm text-brand-white mb-16">How It Works</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Site Survey', desc: 'Free on-site measurement and consultation' },
              { step: '02', title: 'Manufacture', desc: 'Cut and finished to your exact specifications' },
              { step: '03', title: 'Quality Check', desc: 'Rigorous inspection before delivery' },
              { step: '04', title: 'Installation', desc: 'Professional fitting by certified installers' },
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="border-t border-white/10 pt-6">
                  <span className="text-brand-accent text-sm tracking-wide">{item.step}</span>
                  <h3 className="text-brand-white text-lg mt-3 mb-2">{item.title}</h3>
                  <p className="text-brand-grey text-sm font-light">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* FAQ */}
      <section className="bg-brand-black py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-display-sm text-brand-white mb-12">Common Questions</h2>
          </Reveal>
          <div className="max-w-3xl space-y-0">
            {[
              { q: 'Is this product suitable for outdoor use?', a: 'Yes, all our toughened glass products are suitable for both indoor and outdoor applications. They are weather-resistant and UV stable.' },
              { q: 'How long does installation take?', a: 'A typical residential installation takes 1\u20132 days. We provide a detailed timeline during your free site survey.' },
              { q: 'Do you offer custom sizes?', a: 'Absolutely. All our products can be made to measure. Contact us with your exact dimensions for a bespoke quote.' },
              { q: 'What safety standards does this meet?', a: 'All glass meets BS EN 12150 for toughened safety glass and complies with Building Regulations Part K.' },
              { q: 'Can I get a sample?', a: 'Yes \u2014 visit our showroom at 1181 High Rd, Romford RM6 4AL or contact us to request samples.' },
            ].map((item, i) => (
              <Reveal key={i}>
                <details className="group border-b border-white/5">
                  <summary className="flex items-center justify-between py-5 cursor-pointer text-brand-white text-sm font-light hover:text-brand-accent transition-colors">
                    {item.q}
                    <span className="text-brand-grey group-open:rotate-45 transition-transform text-lg ml-4 flex-shrink-0">+</span>
                  </summary>
                  <p className="text-brand-grey text-sm font-light pb-5 pr-8 leading-relaxed">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <>
          <div className="divider max-w-7xl mx-auto" />
          <section className="bg-brand-black py-16 md:py-24 px-6 md:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <div className="flex items-end justify-between mb-12">
                  <h2 className="text-display-sm text-brand-white">Related Products</h2>
                  <Link href="/products" className="text-brand-grey hover:text-brand-white text-sm tracking-wide transition-colors hidden md:block">
                    View All &rarr;
                  </Link>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((item) => (
                  <Reveal key={item.id}>
                    <Link href={`/products/${item.id}`} className="group block">
                      <div className="aspect-[3/4] overflow-hidden mb-4 img-reveal bg-brand-charcoal">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-brand-white text-sm font-light group-hover:text-brand-accent transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-brand-grey text-xs mt-1">{item.priceDisplay}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="bg-brand-charcoal py-20 md:py-28 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <p className="section-label mb-4">Get Started</p>
            <h2 className="text-display-md text-brand-white mb-6">
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
                Explore Collection
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

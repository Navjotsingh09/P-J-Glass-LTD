'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

export default function ProductDetailClient({ product, relatedProducts, recommendedAccessories = [] }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const categoryInfo = productCategories[product.category];

  const handleAddToCart = () => {
    addItem(product, 1, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-silver pt-28 pb-4 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[0.7rem] tracking-[0.08em] uppercase text-brand-grey">
          <Link href="/" className="hover:text-brand-navy transition-colors">Home</Link>
          <span className="text-brand-silver">/</span>
          <Link href="/products" className="hover:text-brand-navy transition-colors">Collection</Link>
          <span className="text-brand-silver">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-brand-navy transition-colors">
            {categoryInfo?.name || product.category}
          </Link>
          <span className="text-brand-silver">/</span>
          <span className="text-brand-navy">{product.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-white py-12 md:py-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden bg-brand-offwhite img-reveal relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
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
                <h1 className="text-display-md text-brand-navy mb-6">{product.name}</h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? '#5ec4d4' : 'none'} stroke="#5ec4d4" strokeWidth="1.5">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-brand-grey text-sm">{product.rating}</span>
                  </div>
                )}

                {/* Price */}
                <div className="mb-8">
                  {product.onSale && product.originalPriceDisplay && (
                    <p className="text-brand-grey/60 text-lg line-through mb-1">{product.originalPriceDisplay}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <p className={`text-2xl tracking-wide ${product.onSale ? 'text-red-600 font-semibold' : 'text-brand-accent'}`}>
                      {product.priceDisplay}
                    </p>
                    {product.onSale && (
                      <span className="bg-red-600 text-white text-[0.6rem] tracking-[0.1em] uppercase font-bold px-2.5 py-1">
                        15% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-brand-grey text-base font-light leading-relaxed mb-8">
                  {product.shortDesc}
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
                              : 'border-brand-silver text-brand-grey hover:border-brand-navy hover:text-brand-navy'
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
                        <li key={i} className="flex items-start gap-3 text-brand-grey text-sm font-light">
                          <span className="text-brand-accent mt-0.5">&#8226;</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
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

      <div className="divider max-w-7xl mx-auto" />

      {/* Specifications */}
      <section className="bg-brand-offwhite py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-display-sm text-brand-navy mb-12">Technical Specifications</h2>
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
                <div key={i} className="flex justify-between py-4 border-b border-brand-silver">
                  <span className="text-brand-grey text-sm">{spec.label}</span>
                  <span className="text-brand-navy text-sm font-light">{spec.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* Installation Process */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">Our Process</p>
            <h2 className="text-display-sm text-brand-navy mb-16">How It Works</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Site Survey', desc: 'Free on-site measurement and consultation' },
              { step: '02', title: 'Manufacture', desc: 'Cut and finished to your exact specifications' },
              { step: '03', title: 'Quality Check', desc: 'Rigorous inspection before delivery' },
              { step: '04', title: 'Installation', desc: 'Professional fitting by certified installers' },
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="border-t border-brand-silver pt-6">
                  <span className="text-brand-accent text-sm tracking-wide">{item.step}</span>
                  <h3 className="text-brand-navy text-lg mt-3 mb-2">{item.title}</h3>
                  <p className="text-brand-grey text-sm font-light">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* FAQ */}
      <section className="bg-brand-offwhite py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-display-sm text-brand-navy mb-12">Common Questions</h2>
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
                <details className="group border-b border-brand-silver">
                  <summary className="flex items-center justify-between py-5 cursor-pointer text-brand-navy text-sm font-light hover:text-brand-accent transition-colors">
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

      {/* Recommended Accessories */}
      {recommendedAccessories && recommendedAccessories.length > 0 && (
        <>
          <div className="divider max-w-7xl mx-auto" />
          <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <div className="flex items-end justify-between mb-12">
                  <div>
                    <p className="section-label mb-4">Complete Your Project</p>
                    <h2 className="text-display-sm text-brand-navy">Recommended Accessories</h2>
                  </div>
                  <Link href="/accessories" className="text-brand-grey hover:text-brand-navy text-sm tracking-wide transition-colors hidden md:block">
                    View All Accessories &rarr;
                  </Link>
                </div>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedAccessories.map((acc) => (
                  <Reveal key={acc.id}>
                    <Link href={`/accessories/${acc.id}`} className="group block">
                      <div className="aspect-square overflow-hidden mb-4 img-reveal bg-brand-offwhite relative">
                        {acc.onSale && (
                          <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[0.55rem] tracking-[0.1em] uppercase font-bold px-2 py-1">
                            15% OFF
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
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <>
          <div className="divider max-w-7xl mx-auto" />
          <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <div className="flex items-end justify-between mb-12">
                  <h2 className="text-display-sm text-brand-navy">Related Products</h2>
                  <Link href="/products" className="text-brand-grey hover:text-brand-navy text-sm tracking-wide transition-colors hidden md:block">
                    View All &rarr;
                  </Link>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((item) => (
                  <Reveal key={item.id}>
                    <Link href={`/products/${item.id}`} className="group block">
                      <div className="aspect-[3/4] overflow-hidden mb-4 img-reveal bg-brand-offwhite relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <h3 className="text-brand-navy text-sm font-light group-hover:text-brand-accent transition-colors">
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

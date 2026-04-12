'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { productCategories, getAllProducts, getProductsByCategory } from '../../lib/products';

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

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const allProducts = getAllProducts();

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  const categories = [
    { id: 'all', name: 'All' },
    ...Object.entries(productCategories).map(([key, cat]) => ({ id: key, name: cat.name })),
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? allProducts
      : getProductsByCategory(activeCategory);

  return (
    <>
      {/* Hero with Shower Screen Collage */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* 10-image vertical collage grid */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-2 gap-[2px]">
            <div className="relative col-span-1 row-span-2 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&auto=format&fit=crop&q=80"
                alt="Glass shower screen"
                fill
                className="object-cover"
                priority
                sizes="20vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format&fit=crop&q=80"
                alt="Modern frameless shower"
                fill
                className="object-cover"
                priority
                sizes="20vw"
              />
            </div>
            <div className="relative col-span-1 row-span-2 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80"
                alt="Luxury glass bathroom"
                fill
                className="object-cover"
                priority
                sizes="20vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&auto=format&fit=crop&q=80"
                alt="Glass shower enclosure"
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
            <div className="relative col-span-1 row-span-2 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format&fit=crop&q=80"
                alt="Frameless glass shower"
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1564540586988-aa4e53ab3394?w=600&auto=format&fit=crop&q=80"
                alt="Walk-in glass shower"
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1631048500395-ed4085565188?w=600&auto=format&fit=crop&q=80"
                alt="Designer shower screen"
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src="/images/products/shower-1.jpg"
                alt="P&J Glass shower screen"
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=80"
                alt="Contemporary glass shower"
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80"
                alt="Elegant shower glass panel"
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-brand-navy/65" />
        </div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-24 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-4">Collection</p>
            <h1 className="text-display-xl text-white">PRODUCT COLLECTION</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-display-md text-brand-navy mb-6">
                Our glazing collection is defined by exceptional craftsmanship, refined
                design, and enduring quality.
              </h2>
              <p className="text-brand-grey text-lg font-light">
                Made for bold architecture and uncompromising vision.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-section px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category Tabs */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12 border-b border-brand-silver pb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 text-[0.7rem] tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-brand-navy bg-brand-accent/15'
                      : 'text-brand-grey hover:text-brand-navy'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Products */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Reveal key={product.id}>
                <Link
                  href={`/products/${product.id}`}
                  className="group block"
                >
                  <div className="aspect-[3/4] overflow-hidden mb-4 img-reveal bg-brand-offwhite relative">
                    <Image
                      src={product.image || 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&auto=format&fit=crop&q=80'}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {product.onSale && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[0.6rem] tracking-[0.1em] uppercase font-bold px-2.5 py-1 z-10">
                        15% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-brand-navy text-sm font-light mt-1 group-hover:text-brand-accent transition-colors">
                        {product.name}
                      </h3>
                      <div className="mt-1">
                        {product.onSale && product.originalPriceDisplay && (
                          <span className="text-brand-grey/60 text-xs line-through mr-2">
                            {product.originalPriceDisplay}
                          </span>
                        )}
                        <span className={`text-xs ${product.onSale ? 'text-red-600 font-medium' : 'text-brand-grey'}`}>
                          {product.priceDisplay}
                        </span>
                      </div>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-brand-grey group-hover:text-brand-navy transition-colors mt-1 flex-shrink-0"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

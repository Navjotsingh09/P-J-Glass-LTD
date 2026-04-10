'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getAllProducts, getProductsByCategory } from '../../lib/products';

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
  const [activeCategory, setActiveCategory] = useState('all');
  const allProducts = getAllProducts();

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'balustrades', name: 'Balustrades' },
    { id: 'splashbacks-colours', name: 'Splashback Colours' },
    { id: 'splashbacks-prints', name: 'Splashback Prints' },
    { id: 'mirrors', name: 'Mirrors' },
    { id: 'bath-screens', name: 'Bath Screens' },
    { id: 'juliet-balconies', name: 'Juliet Balconies' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&auto=format&fit=crop&q=80"
            alt="P&J Glass Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-24 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-4">Collection</p>
            <h1 className="text-display-xl text-brand-white">PRODUCT COLLECTION</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-display-md text-brand-white mb-6">
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
      <section className="pb-section px-6 md:px-10 lg:px-16 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          {/* Category Tabs */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 text-[0.7rem] tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-brand-white bg-white/10'
                      : 'text-brand-grey hover:text-brand-white'
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
                  <div className="aspect-[3/4] overflow-hidden mb-4 img-reveal bg-brand-charcoal">
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&auto=format&fit=crop&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {product.badges?.includes('popular') && (
                        <span className="text-[0.65rem] tracking-[0.15em] uppercase text-brand-accent font-medium">
                          Popular
                        </span>
                      )}
                      {product.badges?.includes('bestseller') && (
                        <span className="text-[0.65rem] tracking-[0.15em] uppercase text-brand-accent font-medium">
                          Best Seller
                        </span>
                      )}
                      <h3 className="text-brand-white text-sm font-light mt-1 group-hover:text-brand-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-brand-grey text-xs mt-1">
                        From &pound;{product.priceFrom}
                      </p>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-brand-grey group-hover:text-brand-white transition-colors mt-1 flex-shrink-0"
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

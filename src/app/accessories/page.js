'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { accessoryCategories, getAllAccessories, getAccessoriesByCategory } from '../../lib/accessories';
import { productCategories } from '../../lib/products';
import { useCart } from '../../lib/cart-context';

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

export default function AccessoriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AccessoriesContent />
    </Suspense>
  );
}

function AccessoriesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [addedId, setAddedId] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  const categories = [
    { id: 'all', name: 'All' },
    ...Object.entries(accessoryCategories).map(([key, cat]) => ({ id: key, name: cat.name })),
  ];

  const allAccessories = getAllAccessories();
  const filteredAccessories =
    activeCategory === 'all'
      ? allAccessories
      : getAccessoriesByCategory(activeCategory);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const getCategoryNames = (fitsWith) => {
    if (!fitsWith || fitsWith.length === 0) return null;
    return fitsWith
      .map((key) => productCategories[key]?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1920&auto=format&fit=crop&q=80"
            alt="Glass Accessories & Hardware"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-navy/60" />
        </div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-24 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-4">Hardware & Accessories</p>
            <h1 className="text-display-xl text-white">ACCESSORIES SHOP</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-display-md text-brand-navy mb-6">
                Premium glass hardware, fittings & accessories for every installation.
              </h2>
              <p className="text-brand-grey text-lg font-light">
                From shower hinges to mirror mounts — everything you need to complete your glass project.
                All items include our 15% site-wide discount.
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

          <p className="text-brand-grey text-sm mb-8">{filteredAccessories.length} products</p>

          {/* Products */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAccessories.map((product) => (
              <Reveal key={product.id}>
                <Link
                  href={`/accessories/${product.id}`}
                  className="group block"
                >
                  <div className="aspect-square overflow-hidden mb-4 img-reveal bg-brand-offwhite relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {product.onSale && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[0.6rem] tracking-[0.1em] uppercase font-bold px-2.5 py-1 z-10">
                        15% OFF
                      </span>
                    )}
                  </div>
                  <div>
                    {product.brand && (
                      <span className="text-[0.6rem] tracking-[0.15em] uppercase text-brand-accent font-medium">
                        {product.brand}
                      </span>
                    )}
                    <h3 className="text-brand-navy text-sm font-light mt-1 group-hover:text-brand-accent transition-colors line-clamp-2">
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
                    {getCategoryNames(product.fitsWith) && (
                      <p className="text-[0.65rem] text-brand-grey/70 mt-1.5">
                        Pairs with: {getCategoryNames(product.fitsWith)}
                      </p>
                    )}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`mt-3 w-full py-2 text-[0.65rem] tracking-[0.1em] uppercase font-semibold transition-all duration-300 border ${
                        addedId === product.id
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
                      }`}
                    >
                      {addedId === product.id ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-offwhite py-20 md:py-28 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <p className="section-label mb-4">Need Advice?</p>
            <h2 className="text-display-md text-brand-navy mb-6">
              Not sure which accessories you need?
            </h2>
            <p className="text-brand-grey text-lg font-light max-w-xl mx-auto mb-10">
              Our team can recommend the right hardware and fittings for your glass project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:02085991622" className="btn-fluid btn-filled text-center">
                Call 020 8599 1622
              </a>
              <Link href="/products" className="btn-fluid btn-outline-fluid text-center">
                Browse Glass Products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

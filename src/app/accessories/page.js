'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
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

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

// ─── Collapsible filter section ────────────
function FilterSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-brand-silver/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="text-sm font-medium text-brand-navy">{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-brand-grey transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

// ─── Price ranges ────────────
const PRICE_RANGES = [
  { id: 'under25', label: 'Under £25', min: 0, max: 25 },
  { id: '25to50', label: '£25 – £50', min: 25, max: 50 },
  { id: '50to100', label: '£50 – £100', min: 50, max: 100 },
  { id: '100to250', label: '£100 – £250', min: 100, max: 250 },
  { id: 'over250', label: 'Over £250', min: 250, max: Infinity },
];

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

  // State
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState('best-selling');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const { addItem } = useCart();

  const allAccessories = getAllAccessories();

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  const categories = [
    { id: 'all', name: 'All' },
    ...Object.entries(accessoryCategories).map(([key, cat]) => ({ id: key, name: cat.name })),
  ];

  // Filter + sort
  const filteredAccessories = useMemo(() => {
    let products = activeCategory === 'all' ? allAccessories : getAccessoriesByCategory(activeCategory);

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      const ranges = PRICE_RANGES.filter((r) => selectedPriceRanges.includes(r.id));
      products = products.filter((p) =>
        ranges.some((r) => p.priceFrom >= r.min && p.priceFrom < r.max)
      );
    }

    // Sort
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'name-az':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [activeCategory, allAccessories, selectedPriceRanges, sortBy]);

  function togglePriceRange(id) {
    setSelectedPriceRanges((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function clearAllFilters() {
    setActiveCategory('all');
    setSelectedPriceRanges([]);
  }

  const activeFilterCount =
    (activeCategory !== 'all' ? 1 : 0) + selectedPriceRanges.length;

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

  // Sidebar content (shared between desktop and mobile)
  const filterSidebar = (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-brand-navy">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-brand-accent hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category" defaultOpen={true}>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="accessoryCategory"
                checked={activeCategory === cat.id}
                onChange={() => setActiveCategory(cat.id)}
                className="w-4 h-4 text-brand-accent border-brand-silver focus:ring-brand-accent"
              />
              <span className="text-sm text-brand-grey group-hover:text-brand-navy transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(range.id)}
                onChange={() => togglePriceRange(range.id)}
                className="w-4 h-4 text-brand-accent border-brand-silver rounded focus:ring-brand-accent"
              />
              <span className="text-sm text-brand-grey group-hover:text-brand-navy transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );

  return (
    <>
      {/* Compact Hero with Collage */}
      <section className="relative h-[240px] md:h-[280px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid grid-cols-5 gap-[2px]">
            {[
              'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&auto=format&fit=crop&q=75',
              'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=75',
              'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&auto=format&fit=crop&q=75',
              'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&auto=format&fit=crop&q=75',
              'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&auto=format&fit=crop&q=75',
            ].map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <Image src={src} alt="Glass accessories" fill className="object-cover" priority={i < 3} sizes="20vw" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-brand-navy/70" />
        </div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-8 md:pb-10 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-2 text-xs">Hardware & Accessories</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">Accessories Shop</h1>
            <p className="text-white/70 text-sm font-light mt-2 max-w-xl">
              Premium glass hardware, fittings & accessories — everything you need to complete your project.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Grid */}
      <section className="py-8 md:py-10 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* ─── Desktop Sidebar ─── */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">{filterSidebar}</div>
            </aside>

            {/* ─── Main Column ─── */}
            <div className="flex-1 min-w-0">
              {/* Toolbar: Sort + View + Mobile filter toggle */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-silver/50">
                <div className="flex items-center gap-4">
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-brand-silver rounded text-sm text-brand-navy hover:bg-brand-offwhite transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6h16M4 12h10M4 18h6" />
                    </svg>
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="bg-brand-accent text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-brand-navy whitespace-nowrap">Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm text-brand-grey border border-brand-silver rounded px-3 py-2 bg-white focus:ring-brand-accent focus:border-brand-accent"
                    >
                      <option value="best-selling">Best selling</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-az">Name: A – Z</option>
                      <option value="name-za">Name: Z – A</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-brand-grey">{filteredAccessories.length} products</span>
                  <span className="text-sm text-brand-grey hidden sm:inline">View as</span>
                  {/* Grid view */}
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'text-brand-navy bg-brand-offwhite' : 'text-brand-grey hover:text-brand-navy'}`}
                    aria-label="Grid view"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="3" width="8" height="8" rx="1" />
                      <rect x="13" y="3" width="8" height="8" rx="1" />
                      <rect x="3" y="13" width="8" height="8" rx="1" />
                      <rect x="13" y="13" width="8" height="8" rx="1" />
                    </svg>
                  </button>
                  {/* List view */}
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'text-brand-navy bg-brand-offwhite' : 'text-brand-grey hover:text-brand-navy'}`}
                    aria-label="List view"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="4" width="18" height="3" rx="1" />
                      <rect x="3" y="10.5" width="18" height="3" rx="1" />
                      <rect x="3" y="17" width="18" height="3" rx="1" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Grid / List */}
              {filteredAccessories.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-brand-grey text-lg mb-4">No accessories match your filters.</p>
                  <button onClick={clearAllFilters} className="text-brand-accent hover:underline text-sm">
                    Clear all filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredAccessories.map((product) => (
                    <Reveal key={product.id}>
                      <Link href={`/accessories/${product.id}`} className="group block">
                        <div className="aspect-square overflow-hidden mb-3 bg-brand-offwhite relative rounded-sm">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          {product.onSale && (
                            <span className="absolute top-2 left-2 bg-red-600 text-white text-[0.55rem] tracking-[0.08em] uppercase font-bold px-2 py-1 z-10 rounded-sm">
                              15% OFF
                            </span>
                          )}
                        </div>
                        {product.brand && (
                          <span className="text-[0.6rem] tracking-[0.15em] uppercase text-brand-accent font-medium">
                            {product.brand}
                          </span>
                        )}
                        <h3 className="text-brand-navy text-sm font-normal leading-snug group-hover:text-brand-accent transition-colors line-clamp-2 mt-1">
                          {product.name}
                        </h3>
                        <div className="mt-1.5">
                          {product.onSale && product.originalPriceDisplay && (
                            <span className="text-brand-grey/50 text-xs line-through mr-1.5">
                              {product.originalPriceDisplay}
                            </span>
                          )}
                          <div>
                            <span className={`text-sm font-medium ${product.onSale ? 'text-red-600' : 'text-brand-navy'}`}>
                              {product.priceDisplay}
                            </span>
                          </div>
                        </div>
                        {getCategoryNames(product.fitsWith) && (
                          <p className="text-[0.6rem] text-brand-grey/70 mt-1">
                            Pairs with: {getCategoryNames(product.fitsWith)}
                          </p>
                        )}
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className={`mt-3 w-full py-2 text-[0.65rem] tracking-[0.1em] uppercase font-semibold transition-all duration-300 border rounded-sm ${
                            addedId === product.id
                              ? 'bg-green-600 text-white border-green-600'
                              : 'border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
                          }`}
                        >
                          {addedId === product.id ? '✓ Added' : 'Add to Cart'}
                        </button>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              ) : (
                /* List view */
                <div className="space-y-4">
                  {filteredAccessories.map((product) => (
                    <Reveal key={product.id}>
                      <Link href={`/accessories/${product.id}`} className="group flex gap-5 p-4 border border-brand-silver/30 rounded hover:shadow-md transition-shadow">
                        <div className="w-28 h-28 flex-shrink-0 overflow-hidden bg-brand-offwhite relative rounded-sm">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                          {product.onSale && (
                            <span className="absolute top-1 left-1 bg-red-600 text-white text-[0.5rem] tracking-[0.06em] uppercase font-bold px-1.5 py-0.5 z-10 rounded-sm">
                              15% OFF
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          {product.brand && (
                            <span className="text-[0.55rem] tracking-[0.15em] uppercase text-brand-accent font-medium">
                              {product.brand}
                            </span>
                          )}
                          <h3 className="text-brand-navy text-sm font-medium group-hover:text-brand-accent transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-brand-grey text-xs mt-1 line-clamp-2">{product.shortDesc}</p>
                          <div className="mt-2">
                            {product.onSale && product.originalPriceDisplay && (
                              <span className="text-brand-grey/50 text-xs line-through mr-1.5">
                                {product.originalPriceDisplay}
                              </span>
                            )}
                            <span className={`text-sm font-medium ${product.onSale ? 'text-red-600' : 'text-brand-navy'}`}>
                              {product.priceDisplay}
                            </span>
                          </div>
                          {getCategoryNames(product.fitsWith) && (
                            <p className="text-[0.6rem] text-brand-grey/70 mt-1">
                              Pairs with: {getCategoryNames(product.fitsWith)}
                            </p>
                          )}
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className={`mt-2 px-4 py-1.5 text-[0.6rem] tracking-[0.1em] uppercase font-semibold transition-all duration-300 border rounded-sm ${
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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mobile Filters Drawer ─── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-brand-navy">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-brand-grey hover:text-brand-navy"
                  aria-label="Close filters"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {filterSidebar}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full mt-6 py-3 bg-brand-navy text-white text-sm font-medium rounded hover:bg-brand-navy/90 transition-colors"
              >
                View {filteredAccessories.length} products
              </button>
            </div>
          </div>
        </div>
      )}

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

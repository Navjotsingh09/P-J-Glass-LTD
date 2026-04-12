'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
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
  { id: 'under50', label: 'Under £50', min: 0, max: 50 },
  { id: '50to100', label: '£50 – £100', min: 50, max: 100 },
  { id: '100to250', label: '£100 – £250', min: 100, max: 250 },
  { id: '250to500', label: '£250 – £500', min: 250, max: 500 },
  { id: 'over500', label: 'Over £500', min: 500, max: Infinity },
];

// ─── Extract glass thickness from product name ────────────
function extractThickness(name) {
  const match = name.match(/(\d+)mm/);
  return match ? `${match[1]}mm` : null;
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

  // State
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [selectedThicknesses, setSelectedThicknesses] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState('best-selling');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allProducts = getAllProducts();

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  // Available thicknesses from products
  const availableThicknesses = useMemo(() => {
    const set = new Set();
    allProducts.forEach((p) => {
      const t = extractThickness(p.name);
      if (t) set.add(t);
    });
    return [...set].sort((a, b) => parseInt(a) - parseInt(b));
  }, [allProducts]);

  // Category list
  const categories = [
    { id: 'all', name: 'All' },
    ...Object.entries(productCategories).map(([key, cat]) => ({ id: key, name: cat.name })),
  ];

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let products = activeCategory === 'all' ? allProducts : getProductsByCategory(activeCategory);

    // Glass thickness filter
    if (selectedThicknesses.length > 0) {
      products = products.filter((p) => {
        const t = extractThickness(p.name);
        return t && selectedThicknesses.includes(t);
      });
    }

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
  }, [activeCategory, allProducts, selectedThicknesses, selectedPriceRanges, sortBy]);

  function toggleThickness(t) {
    setSelectedThicknesses((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  function togglePriceRange(id) {
    setSelectedPriceRanges((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function clearAllFilters() {
    setActiveCategory('all');
    setSelectedThicknesses([]);
    setSelectedPriceRanges([]);
  }

  const activeFilterCount =
    (activeCategory !== 'all' ? 1 : 0) + selectedThicknesses.length + selectedPriceRanges.length;

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

      {/* Product Type */}
      <FilterSection title="Product Type" defaultOpen={true}>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="productType"
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

      {/* Glass Thickness */}
      <FilterSection title="Glass Thickness">
        <div className="space-y-2">
          {availableThicknesses.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedThicknesses.includes(t)}
                onChange={() => toggleThickness(t)}
                className="w-4 h-4 text-brand-accent border-brand-silver rounded focus:ring-brand-accent"
              />
              <span className="text-sm text-brand-grey group-hover:text-brand-navy transition-colors">
                {t}
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
      {/* Hero with Shower Screen Collage */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-2 gap-[2px]">
            {[
              { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&auto=format&fit=crop&q=80', alt: 'Glass shower screen', span: 'col-span-1 row-span-2', priority: true },
              { src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format&fit=crop&q=80', alt: 'Modern frameless shower', span: 'col-span-1 row-span-1', priority: true },
              { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80', alt: 'Luxury glass bathroom', span: 'col-span-1 row-span-2', priority: true },
              { src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&auto=format&fit=crop&q=80', alt: 'Glass shower enclosure', span: 'col-span-1 row-span-1' },
              { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format&fit=crop&q=80', alt: 'Frameless glass shower', span: 'col-span-1 row-span-2' },
              { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=80', alt: 'Walk-in glass shower', span: 'col-span-1 row-span-1' },
              { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&auto=format&fit=crop&q=80', alt: 'Designer shower screen', span: 'col-span-1 row-span-1' },
              { src: '/images/products/shower-1.jpg', alt: 'P&J Glass shower screen', span: 'col-span-1 row-span-1' },
              { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=80', alt: 'Contemporary glass shower', span: 'col-span-1 row-span-1' },
              { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80', alt: 'Elegant shower glass panel', span: 'col-span-1 row-span-1' },
            ].map((img, i) => (
              <div key={i} className={`relative ${img.span} overflow-hidden`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover" priority={img.priority} sizes="20vw" />
              </div>
            ))}
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

      {/* Intro + Description */}
      <section className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-navy mb-3">All Glass Products</h2>
            <p className="text-brand-grey text-base font-light max-w-3xl">
              A stunning selection of premium glass solutions to elevate your space. Exceptional craftsmanship, refined design, and enduring quality.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content: Sidebar + Grid */}
      <section className="pb-20 px-6 md:px-10 lg:px-16 bg-white">
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
                  <span className="text-sm text-brand-grey">{filteredProducts.length} products</span>
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
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-brand-grey text-lg mb-4">No products match your filters.</p>
                  <button onClick={clearAllFilters} className="text-brand-accent hover:underline text-sm">
                    Clear all filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProducts.map((product) => (
                    <Reveal key={product.id}>
                      <Link href={`/products/${product.id}`} className="group block">
                        <div className="aspect-square overflow-hidden mb-3 bg-brand-offwhite relative rounded-sm">
                          <Image
                            src={product.image || 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&auto=format&fit=crop&q=80'}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          {product.onSale && (
                            <span className="absolute top-2 left-2 bg-red-600 text-white text-[0.55rem] tracking-[0.08em] uppercase font-bold px-2 py-1 z-10 rounded-sm">
                              Save up to £{(product.originalPriceFrom - product.priceFrom).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-brand-navy text-sm font-normal leading-snug group-hover:text-brand-accent transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="mt-1.5">
                          {product.onSale && product.originalPriceDisplay && (
                            <span className="text-brand-grey/50 text-xs line-through mr-1.5">
                              {product.originalPriceDisplay}
                            </span>
                          )}
                          <div>
                            <span className="text-xs text-brand-grey">From </span>
                            <span className={`text-sm font-medium ${product.onSale ? 'text-red-600' : 'text-brand-navy'}`}>
                              {product.priceDisplay}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              ) : (
                /* List view */
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <Reveal key={product.id}>
                      <Link href={`/products/${product.id}`} className="group flex gap-5 p-4 border border-brand-silver/30 rounded hover:shadow-md transition-shadow">
                        <div className="w-28 h-28 flex-shrink-0 overflow-hidden bg-brand-offwhite relative rounded-sm">
                          <Image
                            src={product.image || 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&auto=format&fit=crop&q=80'}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                          {product.onSale && (
                            <span className="absolute top-1 left-1 bg-red-600 text-white text-[0.5rem] tracking-[0.06em] uppercase font-bold px-1.5 py-0.5 z-10 rounded-sm">
                              Sale
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
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
                            <span className="text-xs text-brand-grey">From </span>
                            <span className={`text-sm font-medium ${product.onSale ? 'text-red-600' : 'text-brand-navy'}`}>
                              {product.priceDisplay}
                            </span>
                          </div>
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
                View {filteredProducts.length} products
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

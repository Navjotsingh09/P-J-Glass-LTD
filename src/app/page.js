'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── Scroll reveal hook ─── */
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&auto=format&fit=crop&q=80"
          alt="Modern architectural glass"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-brand-navy/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-6">
            <p className="section-label animate-fade-up" style={{ animationDelay: '0.2s' }}>
              P&J Glass
            </p>
          </div>
          <div className="overflow-hidden">
            <h1
              className="text-display-xl text-white max-w-5xl animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              GLAZING SPECIALISTS
            </h1>
          </div>
          <div className="overflow-hidden mt-8 max-w-2xl">
            <p
              className="text-white/80 text-lg md:text-xl font-light leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.6s' }}
            >
              We design and install bespoke glass systems for ambitious architectural
              projects. Every pane reflects our commitment to clarity, quality,
              and collaboration.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-slide-in" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }} />
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  return (
    <section className="py-section px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-label mb-6 text-brand-accent">About P&J Glass</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal>
            <h2 className="text-display-md text-brand-navy leading-tight">
              We specialise in bespoke glazing that shapes light, defines space,
              and elevates design.
            </h2>
            <div className="mt-8">
              <Link href="/about" className="btn-fluid">
                Who We Are
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="aspect-[4/5] overflow-hidden img-reveal">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
                alt="P&J Glass craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Product Collection ─── */
function ProductCollection() {
  const [activeCategory, setActiveCategory] = useState('balustrades');

  const categories = [
    { id: 'balustrades', name: 'Balustrades' },
    { id: 'splashbacks', name: 'Splashbacks' },
    { id: 'showers', name: 'Shower Screens' },
    { id: 'mirrors', name: 'Mirrors' },
  ];

  const products = {
    balustrades: [
      { name: 'Frameless Glass Balustrade', type: 'PREMIUM', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&auto=format&fit=crop&q=80' },
      { name: 'Semi-Frameless Balustrade', type: 'STANDARD', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80' },
      { name: 'Juliet Balcony System', type: 'PREMIUM', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&auto=format&fit=crop&q=80' },
    ],
    splashbacks: [
      { name: 'Toughened Glass Splashback', type: 'STANDARD', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80' },
      { name: 'Metallic Finish Splashback', type: 'PREMIUM', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&auto=format&fit=crop&q=80' },
      { name: 'Printed Glass Splashback', type: 'PREMIUM', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&auto=format&fit=crop&q=80' },
    ],
    showers: [
      { name: 'Walk-in Shower Screen', type: 'PREMIUM', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format&fit=crop&q=80' },
      { name: 'Frameless Shower Enclosure', type: 'STANDARD', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&auto=format&fit=crop&q=80' },
      { name: 'Wetroom Glass Panel', type: 'PREMIUM', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80' },
    ],
    mirrors: [
      { name: 'Frameless Wall Mirror', type: 'STANDARD', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80' },
      { name: 'Leaner Mirror', type: 'PREMIUM', image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=80' },
      { name: 'Tinted Mirror', type: 'PREMIUM', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&auto=format&fit=crop&q=80' },
    ],
  };

  return (
    <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-label mb-6 text-brand-accent">Product Collection</p>
        </Reveal>

        <Reveal>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16">
            <h2 className="text-display-md text-brand-navy">
              Our glazing collection is defined by exceptional craftsmanship,
              refined design, and enduring quality.
            </h2>
            <div className="flex items-end">
              <Link href="/products" className="btn-fluid">
                Product Overview
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Category Tabs */}
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10 border-b border-brand-silver pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 text-[0.75rem] tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'text-brand-navy bg-brand-accent/20 border-b-2 border-brand-accent'
                    : 'text-brand-grey hover:text-brand-navy'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {products[activeCategory]?.map((product, idx) => (
            <Reveal key={product.name} delay={idx + 1}>
              <Link href="/products" className="group block">
                <div className="aspect-[3/4] overflow-hidden mb-4 img-reveal">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {product.type === 'PREMIUM' && (
                      <span className="text-[0.65rem] tracking-[0.15em] uppercase text-brand-accent font-medium">
                        Premium
                      </span>
                    )}
                    <h3 className="text-brand-navy text-sm md:text-base font-light mt-1 group-hover:text-brand-accent transition-colors">
                      {product.name}
                    </h3>
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
  );
}

/* ─── Why Glass Section ─── */
function WhyGlassSection() {
  const [hoveredId, setHoveredId] = useState(null);

  const benefits = [
    {
      id: 'energy',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.86 9.86l4.24 4.24M33.9 33.9l4.24 4.24M9.86 38.14l4.24-4.24M33.9 14.1l4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Energy Efficient',
      stat: '25%',
      statLabel: 'of home heat escapes through windows',
      description: 'Low-emissivity glazing reflects heat back indoors, cutting energy bills by up to 20% and reducing your carbon footprint.',
      link: '/services/balustrades',
    },
    {
      id: 'kitchen',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <rect x="8" y="12" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 22h32" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="17" r="1.5" fill="currentColor" />
          <circle cx="24" cy="17" r="1.5" fill="currentColor" />
          <path d="M14 8v4M34 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Kitchen Splashbacks',
      stat: null,
      statLabel: null,
      description: 'A stylish, hygienic alternative to tiles. Heat-resistant toughened glass is effortless to clean and brings light and colour to any kitchen.',
      link: '/services/splashbacks',
    },
    {
      id: 'bathroom',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <path d="M12 8v16M12 8a4 4 0 014-4h4a4 4 0 014 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 24h36v2a8 8 0 01-8 8H14a8 8 0 01-8-8v-2z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 34v6M32 34v6M14 40h4M30 40h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Shower Screens',
      stat: null,
      statLabel: null,
      description: 'Water-resistant glass that stays crystal clear. Privacy without blocking natural light—your bathroom will feel larger and brighter.',
      link: '/showers',
    },
    {
      id: 'mirrors',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <rect x="10" y="6" width="28" height="36" rx="14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 14a6 6 0 016-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      ),
      title: 'Mirrors & Smart Glass',
      stat: null,
      statLabel: null,
      description: 'Create the illusion of space, conceal screens behind reflective surfaces, and add depth and character to any room in the house.',
      link: '/services/mirrors',
    },
    {
      id: 'balustrades',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <path d="M6 40L20 12h8L42 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 40h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 28h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      ),
      title: 'Balustrades & Partitions',
      stat: null,
      statLabel: null,
      description: 'Open-plan living with safety and elegance. Glass barriers protect without obstructing views—perfect for staircases, balconies, and mezzanines.',
      link: '/services/balustrades',
    },
    {
      id: 'maintenance',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <path d="M24 4v4M24 40v4M4 24h4M40 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 24l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Low Maintenance',
      stat: null,
      statLabel: null,
      description: 'Modern coatings break down dirt and repel water. Toughened surfaces resist scratches—spend less time cleaning, more time living.',
      link: '/contact',
    },
  ];

  return (
    <section className="relative py-section px-6 md:px-10 lg:px-16 bg-brand-navy overflow-hidden">
      {/* Subtle glass-like background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-accent/[0.04] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header — editorial style */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 mb-16 md:mb-20">
          <Reveal>
            <p className="section-label mb-6">Why Glass in Your Home</p>
            <h2 className="text-display-md text-white leading-tight">
              More than a material—
              <br />
              <span className="text-brand-accent">glass transforms how you live.</span>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <div className="flex flex-col justify-end h-full">
              <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
                From energy savings to effortless style, modern glass does far more than fill a frame.
                It insulates, protects, decorates, and simplifies maintenance across every room in your home.
              </p>

              {/* Stat callout */}
              <div className="flex items-baseline gap-4 border-l-2 border-brand-accent pl-6">
                <span className="text-5xl md:text-6xl font-light text-white tracking-tight">25%</span>
                <p className="text-white/50 text-sm font-light leading-snug max-w-[200px]">
                  of your home&apos;s heat escapes through windows—modern glazing cuts bills by up to 20%.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Benefit cards — 3x2 grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-lg overflow-hidden">
          {benefits.map((benefit, idx) => (
            <Reveal key={benefit.id} delay={Math.min(idx + 1, 4)}>
              <Link
                href={benefit.link}
                className="group relative block p-8 md:p-10 bg-brand-navy hover:bg-white/[0.04] transition-all duration-500"
                onMouseEnter={() => setHoveredId(benefit.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Icon */}
                <div className={`text-brand-accent mb-6 transition-transform duration-500 ${
                  hoveredId === benefit.id ? 'scale-110' : ''
                }`}>
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="text-white text-lg font-light mb-3 group-hover:text-brand-accent transition-colors duration-300">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-white/45 text-sm font-light leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Subtle link arrow */}
                <div className="flex items-center gap-2 text-brand-accent text-[0.7rem] tracking-[0.12em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Corner accent on hover */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-brand-accent/10 rotate-45" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-white/40 text-sm font-light mb-6">
              Not sure which glass is right for your project?
            </p>
            <Link href="/contact" className="btn-fluid">
              Get Expert Advice
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Glass Technology Section (Pilkington Categories) ─── */
function GlassTechnologySection() {
  const [activeId, setActiveId] = useState(null);

  const categories = [
    {
      id: 'solar',
      name: 'Solar Control',
      color: '#E8A317',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/uk/products/suncool-banner-image.jpg',
      imageAlt: 'Pilkington solar control glass on modern building facade',
      description: 'Reduces solar heat gain while allowing high levels of natural light, keeping interiors comfortable year-round.',
      detail: 'Ideal for conservatories, south-facing windows, and large glass extensions. Tinted and coated options control glare without darkening rooms.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 5v5M20 30v5M5 20h5M30 20h5M9.4 9.4l3.5 3.5M27.1 27.1l3.5 3.5M9.4 30.6l3.5-3.5M27.1 12.9l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'thermal',
      name: 'Thermal Insulation',
      color: '#8B5E3C',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/banners/product-categories/thermal-insulation/thermalins1.jpg',
      imageAlt: 'Pilkington thermal insulation glass for energy-efficient homes',
      description: 'Low-emissivity coatings improve energy efficiency, retaining warmth in winter and managing heat in summer.',
      detail: 'Over 25% of home heat escapes through windows. Low-e glass reflects heat back indoors, cutting energy bills by up to 20% annually.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <rect x="17" y="8" width="6" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M17 22h6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <path d="M17 18h6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="20" cy="28" r="2" fill="currentColor" opacity="0.6" />
          <path d="M12 12l-3-2M12 17l-4-1M28 12l3-2M28 17l4-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'fire',
      name: 'Fire Protection',
      color: '#C41E3A',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/uk/products/fire/re-introducing-fire/in-the-event-of-a-fire.png',
      imageAlt: 'Pilkington fire-resistant glass protection',
      description: 'Provides passive fire protection for up to 180 minutes, maintaining safety while maximising natural light.',
      detail: 'Essential for internal partitions, doors, and commercial spaces. Fire-rated glass contains flames, smoke, and radiant heat.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <path d="M20 6c0 6-8 10-8 18a8 8 0 0016 0c0-8-8-12-8-18z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 18c0 3-3 5-3 8a3 3 0 006 0c0-3-3-5-3-8z" fill="currentColor" opacity="0.3" />
        </svg>
      ),
    },
    {
      id: 'noise',
      name: 'Noise Control',
      color: '#2E5090',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/banners/product-categories/noise-control/noise-control1.jpg',
      imageAlt: 'Pilkington acoustic noise control glass',
      description: 'Acoustic glass reduces external noise to comfortable levels without sacrificing daylight or views.',
      detail: 'Laminated acoustic interlayers dampen sound vibrations. Perfect for homes near busy roads, airports, or urban environments.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <path d="M10 16v8l6 4V12l-6 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M20 14c2 2 2 10 0 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 11c3 3.5 3 14 0 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M28 8c4 5 4 19 0 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'safety',
      name: 'Safety & Security',
      color: '#6B3FA0',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/banners/product-categories/safety-security/safety-security1.jpg',
      imageAlt: 'Pilkington safety and security glass',
      description: 'Toughened and laminated glass provides impact resistance, protecting people from injury and property from intrusion.',
      detail: 'Toughened glass is 4–5× stronger than standard glass. When broken, it shatters into small, harmless granules rather than sharp shards.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <path d="M20 4L6 10v10c0 8.4 6 16 14 18 8-2 14-9.6 14-18V10L20 4z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 20l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'selfclean',
      name: 'Self-Cleaning',
      color: '#3AA655',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/banners/product-categories/self-cleaning/self-cleaning1.jpg',
      imageAlt: 'Pilkington self-cleaning glass technology',
      description: 'A dual-action coating uses daylight to break down dirt and rain to wash it away—reducing the need for manual cleaning.',
      detail: 'UV light activates a photocatalytic coating that decomposes organic deposits. Hydrophilic properties then allow water to sheet off evenly.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <circle cx="20" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 18l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 28v4M16 30l-2 3M24 30l2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'decoration',
      name: 'Decoration',
      color: '#8B2252',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/uk/products/oriel-banner.jpg',
      imageAlt: 'Pilkington decorative glass Oriel collection',
      description: 'Extensive decorative options—from Georgian bars and stained glass to etched designs—offering style and privacy with maximum light.',
      detail: 'Includes 19 patterned textures, the Oriel etched glass collection, coloured glass, leaded lights, bevels, and brilliant cut designs.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <rect x="8" y="8" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 20h24M20 8v24" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <circle cx="14" cy="14" r="2" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <circle cx="26" cy="26" r="2" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <path d="M14 26l12-12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
      ),
    },
    {
      id: 'visibility',
      name: 'Enhanced Visibility',
      color: '#1976D2',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/banners/products/optiwhite3.jpg',
      imageAlt: 'Pilkington Optiwhite extra-clear glass for enhanced visibility',
      description: 'Ultra-clear low-iron glass and anti-reflective coatings optimise transparency for the truest colour and light transmission.',
      detail: 'Optiwhite™ extra-clear glass eliminates the green tint found in standard glass—ideal for shower screens, mirrors, and display applications.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
          <path d="M4 20c5-10 12-14 16-14s11 4 16 14c-5 10-12 14-16 14S9 30 4 20z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'health',
      name: 'Health Applications',
      color: '#0097A7',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/uk/products/sanitise/lady-on-train.jpg',
      imageAlt: 'Pilkington health application anti-bacterial glass',
      description: 'Anti-bacterial and anti-viral glass coatings create healthier, cleaner environments in homes and commercial spaces.',
      detail: 'Specialised coatings reduce surface bacteria and viruses on contact—ideal for hospitals, care homes, kitchens, and public-facing spaces.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <rect x="16" y="8" width="8" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8" y="16" width="24" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'special',
      name: 'Special Applications',
      color: '#7B1FA2',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/banners/product-categories/special-applications/special-applications1.jpg',
      imageAlt: 'Pilkington special applications glass',
      description: 'Bespoke glass solutions for unique requirements—mirror-concealing displays, heated glass panels, and smart switchable glass.',
      detail: 'From MirroView™ that hides TV screens behind mirrors to heated glass radiators and electrochromic privacy glass that switches from clear to opaque.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 12v6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.4" />
        </svg>
      ),
    },
    {
      id: 'solar-energy',
      name: 'Solar Energy',
      color: '#F9A825',
      image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/banners/product-categories/solar-energy/solar-energy1.jpg',
      imageAlt: 'Pilkington solar energy glass for photovoltaic applications',
      description: 'Building-integrated photovoltaic glass converts sunlight into electricity while serving as windows, facades, or roofing.',
      detail: 'Transparent solar cells embedded in glass generate energy without compromising views or natural light—the future of sustainable architecture.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
          <path d="M8 28l8-20h8l8 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M11 22h18" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <path d="M14 16h12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <circle cx="20" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 9v3" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-section px-6 md:px-10 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 mb-14 md:mb-20">
          <Reveal>
            <p className="section-label mb-6 text-brand-accent">Glass Technology</p>
            <h2 className="text-display-md text-brand-navy leading-tight">
              Every pane has a purpose.
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <div className="flex flex-col justify-end h-full">
              <p className="text-brand-grey text-lg font-light leading-relaxed">
                Modern glass does far more than let light in. From thermal insulation to self-cleaning coatings,
                we specify the right glass technology for every application—informed by industry leaders
                like Pilkington and the latest UK glazing standards.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Category Grid — image cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, idx) => (
            <Reveal key={cat.id} delay={Math.min(idx + 1, 4)}>
              <button
                onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
                className={`group relative w-full text-left rounded-lg border overflow-hidden transition-all duration-400 ${
                  activeId === cat.id
                    ? 'bg-brand-navy border-brand-navy shadow-xl ring-1 ring-brand-accent/20'
                    : 'bg-white border-brand-silver/60 hover:border-brand-accent/40 hover:shadow-lg'
                }`}
              >
                {/* Use-case image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.imageAlt}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      activeId === cat.id ? 'scale-105 brightness-50' : 'group-hover:scale-105'
                    }`}
                  />
                  {/* Colour band at bottom of image */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
                    style={{ backgroundColor: cat.color, opacity: activeId === cat.id ? 0 : 1 }}
                  />
                  {/* Icon overlay when expanded */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    activeId === cat.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="text-brand-accent">{cat.icon}</div>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-4 md:p-5">
                  {/* Icon + Name row */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`flex-shrink-0 transition-colors duration-300 ${
                        activeId === cat.id ? 'text-brand-accent' : ''
                      }`}
                      style={{ color: activeId === cat.id ? undefined : cat.color }}
                    >
                      {cat.icon}
                    </div>
                    <h3 className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                      activeId === cat.id ? 'text-white' : 'text-brand-navy'
                    }`}>
                      {cat.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className={`text-[0.75rem] leading-relaxed transition-colors duration-300 ${
                    activeId === cat.id ? 'text-white/60' : 'text-brand-grey/70'
                  }`}>
                    {cat.description}
                  </p>

                  {/* Expanded detail */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    activeId === cat.id ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-white/80 text-[0.75rem] leading-relaxed font-light">
                        {cat.detail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expand indicator */}
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeId === cat.id
                    ? 'bg-brand-accent/20 rotate-45'
                    : 'bg-black/20 backdrop-blur-sm'
                }`}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={`transition-colors duration-300 ${
                    activeId === cat.id ? 'text-brand-accent' : 'text-white'
                  }`}>
                    <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Bottom line */}
        <Reveal>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-brand-silver">
            <p className="text-brand-grey text-sm font-light">
              We work with leading manufacturers including <span className="text-brand-navy font-medium">Pilkington</span>, <span className="text-brand-navy font-medium">CRL</span>, and <span className="text-brand-navy font-medium">EGW</span> to source the ideal glass for your project.
            </p>
            <Link href="/contact" className="btn-fluid flex-shrink-0">
              Discuss Your Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Decorative Glazing Section ─── */
function DecorativeGlazingSection() {
  const [activePattern, setActivePattern] = useState(null);

  const texturePatterns = [
    { name: 'Contora™', privacy: 4, image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/texture-glass-images/contora_glass.png?mh=500', desc: 'Clean vertical lines for a modern, semi-private look. Ideal for bathroom windows, front doors, and office partitions.' },
    { name: 'Reeded™', privacy: 2, image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/texture-glass-images/reeded-min.png?mh=500', desc: 'Fine parallel ridges create a sophisticated ribbed effect. Perfect for shower screens, cabinet doors, and room dividers.' },
    { name: 'Autumn™', privacy: 3, image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/texture-glass-images/autumn-min.png?mh=500', desc: 'Organic leaf-like texture that catches light beautifully. Popular in traditional homes and period property renovations.' },
    { name: 'Everglade™', privacy: 5, image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/texture-glass-images/everglade-min.png?mh=500', desc: 'Maximum privacy with a soft, natural appearance. Commonly used in bathroom glazing and ground-floor windows.' },
    { name: 'Florielle™', privacy: 3, image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/texture-glass-images/florielle-min.png?mh=500', desc: 'Delicate floral motif offering moderate privacy with elegance. Suits front doors, fanlights, and bay windows.' },
    { name: 'Cotswold™', privacy: 3, image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/texture-glass-images/cotswold-min2.png?mh=500', desc: 'Gently hammered appearance with timeless cottage charm. Ideal for heritage properties and country-style homes.' },
    { name: 'Digital™', privacy: 2, image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/texture-glass-images/digital-min.png?mh=500', desc: 'Geometric block pattern for a bold contemporary statement. Works well in modern extensions and feature panels.' },
    { name: 'Minster™', privacy: 2, image: 'https://www.pilkington.com/-/media/pilkington/site-content/_base/texture-glass-images/minster-min.png?mh=500', desc: 'Classic cathedral-style diamond pattern. A timeless choice for front doors and traditional stained glass alternatives.' },
  ];

  const etchedDesigns = [
    { name: 'Cirque™', privacy: 1, image: 'https://www.pilkington.com/-/media/pilkington/site-content/uk/decorative-microsite/pattern-presenter-images/acid-etched-privacy-levels/pl1-cirque36571.jpg?&mw=500', desc: 'Subtle circular motif with minimal privacy—lets light flood through while adding a designer touch.' },
    { name: 'Linear™', privacy: 2, image: 'https://www.pilkington.com/-/media/pilkington/site-content/uk/decorative-microsite/pattern-presenter-images/acid-etched-privacy-levels/pl2-linear36574.jpg?&mw=500', desc: 'Clean horizontal bands in acid-etched glass. A modern, minimalist choice for partitions and shower screens.' },
    { name: 'Burdock™', privacy: 3, image: 'https://www.pilkington.com/-/media/pilkington/site-content/uk/decorative-microsite/pattern-presenter-images/acid-etched-privacy-levels/pl3burdock36577.jpg?&mw=500', desc: 'Organic botanical pattern with moderate obscuration. Elegant for front doors and internal feature glazing.' },
    { name: 'Bay™ Opal', privacy: 5, image: 'https://www.pilkington.com/-/media/pilkington/site-content/uk/decorative-microsite/pattern-presenter-images/acid-etched-privacy-levels/pl5bay-opal36576.jpg?&mw=500', desc: 'Fully opaque etched finish with a soft diffused glow. Maximum privacy for bathrooms and ground-floor rooms.' },
  ];

  const privacyLabels = { 1: 'Minimal', 2: 'Light', 3: 'Moderate', 4: 'High', 5: 'Maximum' };

  return (
    <section className="py-section px-6 md:px-10 lg:px-16 bg-[#f5f7fa] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 mb-14 md:mb-20">
          <Reveal>
            <p className="section-label mb-6 text-brand-accent">Decorative Glazing</p>
            <h2 className="text-display-md text-brand-navy leading-tight">
              Glass that makes a statement.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="flex flex-col justify-end h-full">
              <p className="text-brand-grey text-lg font-light leading-relaxed">
                From textured privacy glass to acid-etched designer patterns, we offer over 21 decorative glass
                designs across 5 privacy levels—plus Georgian bars, leaded lights, bevels,
                and brilliant cut options to create a distinctive look for any room.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Privacy Level Guide */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-sm font-medium text-brand-navy mr-2">Privacy levels:</span>
            {[1,2,3,4,5].map(level => (
              <div key={level} className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(dot => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full ${dot <= level ? 'bg-brand-accent' : 'bg-brand-silver'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-brand-grey">{privacyLabels[level]}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Texture Glass Grid */}
        <Reveal>
          <h3 className="text-xl font-semibold text-brand-navy mb-6">Pilkington Texture Glass</h3>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {texturePatterns.map((pattern, i) => (
            <Reveal key={pattern.name} delay={i % 4}>
              <button
                onClick={() => setActivePattern(activePattern === pattern.name ? null : pattern.name)}
                className={`group relative w-full text-left rounded-xl overflow-hidden transition-all duration-500 ${
                  activePattern === pattern.name
                    ? 'ring-2 ring-brand-accent shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                {/* Pattern Image */}
                <div className="aspect-square bg-white overflow-hidden">
                  <img
                    src={pattern.image}
                    alt={`Pilkington ${pattern.name} texture glass pattern`}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      activePattern === pattern.name ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  />
                </div>

                {/* Info Bar */}
                <div className={`px-4 py-3 transition-colors duration-300 ${
                  activePattern === pattern.name ? 'bg-brand-navy' : 'bg-white'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      activePattern === pattern.name ? 'text-white' : 'text-brand-navy'
                    }`}>
                      {pattern.name}
                    </span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(dot => (
                        <div
                          key={dot}
                          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            dot <= pattern.privacy
                              ? activePattern === pattern.name ? 'bg-brand-accent' : 'bg-brand-accent'
                              : activePattern === pattern.name ? 'bg-white/20' : 'bg-brand-silver'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expanded Description */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  activePattern === pattern.name ? 'max-h-40' : 'max-h-0'
                }`}>
                  <div className="px-4 pb-4 bg-brand-navy">
                    <p className="text-white/80 text-xs leading-relaxed">
                      {pattern.desc}
                    </p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Oriel Etched Collection */}
        <Reveal>
          <h3 className="text-xl font-semibold text-brand-navy mb-2">Oriel Collection — Etched Glass</h3>
          <p className="text-brand-grey text-sm mb-6">Stunning acid-etched designs for a premium, contemporary finish.</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {etchedDesigns.map((pattern, i) => (
            <Reveal key={pattern.name} delay={i}>
              <button
                onClick={() => setActivePattern(activePattern === `etched-${pattern.name}` ? null : `etched-${pattern.name}`)}
                className={`group relative w-full text-left rounded-xl overflow-hidden transition-all duration-500 ${
                  activePattern === `etched-${pattern.name}`
                    ? 'ring-2 ring-brand-accent shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="aspect-square bg-white overflow-hidden">
                  <img
                    src={pattern.image}
                    alt={`Pilkington Oriel ${pattern.name} etched glass design`}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      activePattern === `etched-${pattern.name}` ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  />
                </div>
                <div className={`px-4 py-3 transition-colors duration-300 ${
                  activePattern === `etched-${pattern.name}` ? 'bg-brand-navy' : 'bg-white'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      activePattern === `etched-${pattern.name}` ? 'text-white' : 'text-brand-navy'
                    }`}>
                      {pattern.name}
                    </span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(dot => (
                        <div
                          key={dot}
                          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            dot <= pattern.privacy
                              ? 'bg-brand-accent'
                              : activePattern === `etched-${pattern.name}` ? 'bg-white/20' : 'bg-brand-silver'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-500 ${
                  activePattern === `etched-${pattern.name}` ? 'max-h-40' : 'max-h-0'
                }`}>
                  <div className="px-4 pb-4 bg-brand-navy">
                    <p className="text-white/80 text-xs leading-relaxed">
                      {pattern.desc}
                    </p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Additional Options + CTA */}
        <Reveal>
          <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-brand-navy mb-3">Additional Decorative Options</h3>
              <div className="flex flex-wrap gap-3">
                {['Georgian Bars', 'Cottage Bars', 'Leaded Lights', 'Stained Glass', 'Bevels', 'Brilliant Cut'].map(option => (
                  <span key={option} className="px-3 py-1.5 bg-[#f5f7fa] rounded-full text-sm text-brand-navy font-medium">
                    {option}
                  </span>
                ))}
              </div>
              <p className="text-brand-grey text-sm mt-4 leading-relaxed">
                We work with Pilkington's full decorative range to create bespoke glazing that matches your home's character—from period restorations to modern feature walls.
              </p>
            </div>
            <Link href="/contact" className="btn-fluid flex-shrink-0">
              Discuss Your Design
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Showroom Section ─── */
function ShowroomSection() {
  return (
    <section className="py-section px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-label mb-6 text-brand-accent">Showroom</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden img-reveal">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80"
                alt="P&J Glass Showroom"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-display-md text-brand-navy mb-8">
                  Visit our showroom to experience our glass collection firsthand.
                </h2>

                <div className="space-y-6 mb-10">
                  <div>
                    <p className="section-label mb-2">Address</p>
                    <p className="text-brand-grey text-lg font-light">
                      Unit 5, Romford Industrial Estate<br />
                      Romford, Essex RM1 2XX, UK
                    </p>
                  </div>

                  <div>
                    <p className="section-label mb-2">Opening Hours</p>
                    <p className="text-brand-grey text-lg font-light">
                      Mon - Fri: 8am - 6pm<br />
                      Saturday: 9am - 4pm
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/contact" className="btn-fluid self-start">
                Book a Visit
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Projects ─── */
function FeaturedProjects() {
  const projects = [
    {
      title: 'Modern Residence',
      tags: ['Frameless Balustrade', 'Glass Staircase'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Kitchen Transformation',
      tags: ['Duck Egg Splashback', 'Custom Cut'],
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Luxury Bathroom',
      tags: ['Walk-in Shower', 'Frameless Screen'],
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Commercial Office',
      tags: ['Glass Partitions', 'Mirror Feature Wall'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <Reveal>
            <p className="section-label mb-4 text-brand-accent">Featured Projects</p>
            <h2 className="text-display-md text-brand-navy">
              Crafted with precision,<br />built to inspire.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <Link href="/portfolio" className="btn-fluid">
              View All Projects
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, idx) => (
            <Reveal key={project.title} delay={idx < 2 ? idx + 1 : idx}>
              <Link href="/portfolio" className="project-card block relative aspect-[16/10] overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="overlay" />
                <div className="content">
                  <h3 className="text-white text-xl md:text-2xl font-light mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] tracking-[0.1em] uppercase text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Client Stories / Testimonials ─── */
function ClientStories() {
  const [active, setActive] = useState(0);
  const testimonials = [
    {
      quote:
        'Unrivaled customer service, cutting edge design and quality. P&J Glass is firmly lodged in our list of preferred suppliers of glazing products.',
      name: 'James Richardson',
      role: 'Founder, Richardson Architects',
    },
    {
      quote:
        'P&J Glass are great. We have finalised a few projects with them in London, and always had very professional, punctual service. Would recommend to all professionals and clients.',
      name: 'Sarah Mitchell',
      role: 'Director, Mitchell Interiors',
    },
    {
      quote:
        'The quality of the glass work and attention to detail is second to none. The team went above and beyond to ensure our vision became reality.',
      name: 'David Park',
      role: 'Lead Architect, Park Studios',
    },
    {
      quote:
        'From initial consultation to final installation, every step was handled with professionalism. The balustrades transformed our space completely.',
      name: 'Emma Collins',
      role: 'Homeowner, Brentwood',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-section px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-label mb-6 text-brand-accent">Client Stories</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Counter */}
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-brand-navy text-sm font-light">
                {String(active + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 h-[1px] bg-brand-silver relative">
                <div
                  className="absolute top-0 left-0 h-full bg-brand-accent transition-all duration-500"
                  style={{ width: `${((active + 1) / testimonials.length) * 100}%` }}
                />
              </div>
              <span className="text-brand-grey text-sm font-light">
                {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                }
                className="w-12 h-12 border border-brand-silver flex items-center justify-center hover:bg-brand-offwhite transition-colors"
                aria-label="Previous testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-navy">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
                className="w-12 h-12 border border-brand-silver flex items-center justify-center hover:bg-brand-offwhite transition-colors"
                aria-label="Next testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-navy">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </Reveal>

          {/* Quote */}
          <Reveal delay={2}>
            <div className="relative min-h-[240px]">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ${
                    idx === active
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <blockquote className="text-brand-navy text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="text-brand-navy text-sm font-medium">
                      {testimonial.name}
                    </p>
                    <p className="text-brand-grey text-sm font-light">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Google Review Score */}
        <Reveal>
          <div className="mt-16 pt-8 border-t border-brand-silver">
            <a
              href="https://www.google.com/search?q=P%26J+Glass+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-brand-grey hover:text-brand-navy transition-colors text-sm"
            >
              <span className="section-label">Google Review Score: 4.9 of 5</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Values Section ─── */
function ValuesSection() {
  const values = [
    {
      title: 'Clarity',
      description:
        'Transparency in how we work. We make complex processes feel simple, guiding clients with precision and openness at every step.',
    },
    {
      title: 'Craft',
      description:
        'Where innovation meets timeless skill. Every detail is shaped with purpose, elevating architecture into something enduring and extraordinary.',
    },
    {
      title: 'Care',
      description:
        'Present in every conversation, every decision, and every installation. We ensure our clients feel valued and proud of what we create together.',
    },
  ];

  return (
    <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-label mb-6 text-brand-accent">Our Values</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {values.map((value, idx) => (
            <Reveal key={value.title} delay={idx + 1}>
              <div className="border-t border-brand-silver pt-8">
                <h3 className="text-brand-navy text-2xl md:text-3xl font-light mb-4">
                  {value.title}
                </h3>
                <p className="text-brand-grey text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Full-width Image Break ─── */
function ImageBreak() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&auto=format&fit=crop&q=80"
        alt="Architectural glass installation"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/60 to-transparent" />
    </section>
  );
}

/* ─── Homepage ─── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductCollection />
      <WhyGlassSection />
      <GlassTechnologySection />
      <DecorativeGlazingSection />
      <ShowroomSection />
      <ImageBreak />
      <FeaturedProjects />
      <ClientStories />
      <ValuesSection />
    </>
  );
}

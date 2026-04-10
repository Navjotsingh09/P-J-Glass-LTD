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
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&auto=format&fit=crop&q=80"
          alt="Modern architectural glass"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2055]/90 via-[#1a2055]/50 to-[#1a2055]/30" />
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
              className="text-display-xl text-brand-white max-w-5xl animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              GLAZING SPECIALISTS
            </h1>
          </div>
          <div className="overflow-hidden mt-8 max-w-2xl">
            <p
              className="text-brand-light text-lg md:text-xl font-light leading-relaxed animate-fade-up"
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
    <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-navy">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-label mb-6 text-brand-accent">About P&J Glass</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal>
            <h2 className="text-display-md text-brand-white leading-tight">
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
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c30f8bf?w=800&auto=format&fit=crop&q=80"
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
      { name: 'Frameless Glass Balustrade', type: 'PREMIUM', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&auto=format&fit=crop&q=80' },
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
    <section className="py-section px-6 md:px-10 lg:px-16 bg-[#0f1540]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-label mb-6 text-brand-accent">Product Collection</p>
        </Reveal>

        <Reveal>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16">
            <h2 className="text-display-md text-brand-white">
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
          <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 text-[0.75rem] tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'text-brand-white bg-brand-blue/30 border-b-2 border-brand-accent'
                    : 'text-brand-grey hover:text-brand-white'
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
                    <h3 className="text-brand-white text-sm md:text-base font-light mt-1 group-hover:text-brand-accent transition-colors">
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
  );
}

/* ─── Showroom Section ─── */
function ShowroomSection() {
  return (
    <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-navy">
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
                <h2 className="text-display-md text-brand-white mb-8">
                  Visit our showroom to experience our glass collection firsthand.
                </h2>

                <div className="space-y-6 mb-10">
                  <div>
                    <p className="section-label mb-2">Address</p>
                    <p className="text-brand-light text-lg font-light">
                      Unit 5, Romford Industrial Estate<br />
                      Romford, Essex RM1 2XX, UK
                    </p>
                  </div>

                  <div>
                    <p className="section-label mb-2">Opening Hours</p>
                    <p className="text-brand-light text-lg font-light">
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
    <section className="py-section px-6 md:px-10 lg:px-16 bg-[#141a4a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <Reveal>
            <p className="section-label mb-4 text-brand-accent">Featured Projects</p>
            <h2 className="text-display-md text-brand-white">
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
                  <h3 className="text-brand-white text-xl md:text-2xl font-light mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] tracking-[0.1em] uppercase text-brand-light/80"
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
    <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-navy">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-label mb-6 text-brand-accent">Client Stories</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Counter */}
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-brand-white text-sm font-light">
                {String(active + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 h-[1px] bg-white/10 relative">
                <div
                  className="absolute top-0 left-0 h-full bg-brand-white transition-all duration-500"
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
                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-white">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Next testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-white">
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
                  <blockquote className="text-brand-white text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="text-brand-white text-sm font-medium">
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
          <div className="mt-16 pt-8 border-t border-white/10">
            <a
              href="https://www.google.com/search?q=P%26J+Glass+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-brand-grey hover:text-brand-white transition-colors text-sm"
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
    <section className="py-section px-6 md:px-10 lg:px-16 bg-[#0f1540]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-label mb-6 text-brand-accent">Our Values</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {values.map((value, idx) => (
            <Reveal key={value.title} delay={idx + 1}>
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-brand-white text-2xl md:text-3xl font-light mb-4">
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
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2055]/60 to-[#2d6db5]/30" />
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
      <ShowroomSection />
      <ImageBreak />
      <FeaturedProjects />
      <ClientStories />
      <ValuesSection />
    </>
  );
}

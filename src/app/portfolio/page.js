'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/projects';

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

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&auto=format&fit=crop&q=80"
            alt="P&J Glass Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/60" />
        </div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-24 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-4">Projects</p>
            <h1 className="text-display-xl text-white">FEATURED PROJECTS</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-display-md text-brand-navy mb-6">
                Every project tells a story of precision, vision, and craftsmanship.
              </h2>
              <p className="text-brand-grey text-lg font-light">
                Explore our portfolio of residential and commercial glass installations
                across London and Essex.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-section px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12 border-b border-brand-silver pb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2.5 text-[0.7rem] tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
                    filter === cat
                      ? 'text-brand-navy bg-brand-accent/15'
                      : 'text-brand-grey hover:text-brand-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {filtered.map((project, idx) => (
              <Reveal key={project.slug} delay={idx % 2 === 0 ? 0 : 1}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="project-card group block relative aspect-[16/10] overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="overlay" />
                  <div className="content">
                    <p className="text-[0.6rem] tracking-[0.15em] uppercase text-brand-accent mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-light mb-1">
                      {project.title}
                    </h3>
                    <p className="text-brand-grey text-xs tracking-[0.1em] uppercase">
                      {project.location}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2,500+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '15+', label: 'Years Experience' },
              { number: '4.9', label: 'Google Rating' },
            ].map((stat, idx) => (
              <Reveal key={stat.label} delay={idx + 1}>
                <div className="border-t border-brand-silver pt-6">
                  <p className="text-brand-navy text-3xl md:text-4xl font-light mb-2">
                    {stat.number}
                  </p>
                  <p className="text-brand-grey text-xs tracking-[0.1em] uppercase">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

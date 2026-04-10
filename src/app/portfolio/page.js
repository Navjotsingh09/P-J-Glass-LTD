'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

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
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

export default function PortfolioPage() {
  const projects = [
    {
      title: 'Modern Residence',
      location: 'Brentwood, Essex',
      tags: ['Frameless Balustrade', 'Glass Staircase'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Kitchen Transformation',
      location: 'Islington, London',
      tags: ['Duck Egg Splashback', 'Custom Cut'],
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Luxury Bathroom Suite',
      location: 'Chelsea, London',
      tags: ['Walk-in Shower', 'Frameless Screen'],
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Commercial Office',
      location: 'Canary Wharf, London',
      tags: ['Glass Partitions', 'Mirror Feature Wall'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Penthouse Renovation',
      location: 'Mayfair, London',
      tags: ['Juliet Balcony', 'Glass Railing'],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c30f8bf?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Restaurant Interior',
      location: 'Shoreditch, London',
      tags: ['Tinted Mirror Wall', 'Splashback'],
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Residential Extension',
      location: 'Hornchurch, Essex',
      tags: ['Semi-Frameless Balustrade'],
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Boutique Hotel',
      location: 'Kensington, London',
      tags: ['Custom Shower Enclosures', 'Mirrors'],
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80',
    },
  ];

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
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-24 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-4">Projects</p>
            <h1 className="text-display-xl text-brand-white">FEATURED PROJECTS</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-display-md text-brand-white mb-6">
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

      {/* Project Grid */}
      <section className="pb-section px-6 md:px-10 lg:px-16 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {projects.map((project, idx) => (
              <Reveal key={project.title} delay={idx % 2 === 0 ? 0 : 1}>
                <div className="project-card group block relative aspect-[16/10] overflow-hidden cursor-pointer">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="overlay" />
                  <div className="content">
                    <h3 className="text-brand-white text-xl md:text-2xl font-light mb-1">
                      {project.title}
                    </h3>
                    <p className="text-brand-grey text-xs tracking-[0.1em] uppercase mb-2">
                      {project.location}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.65rem] tracking-[0.1em] uppercase text-brand-light/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2,500+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '15+', label: 'Years Experience' },
              { number: '4.9', label: 'Google Rating' },
            ].map((stat, idx) => (
              <Reveal key={stat.label} delay={idx + 1}>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-brand-white text-3xl md:text-4xl font-light mb-2">
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

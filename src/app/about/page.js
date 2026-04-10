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

export default function AboutPage() {
  const team = [
    { name: 'Paul Richardson', role: 'Director' },
    { name: 'James Mitchell', role: 'Director' },
    { name: 'David Towler', role: 'Projects Manager' },
    { name: 'Sarah Collins', role: 'Business Development' },
    { name: 'Mark Stevens', role: 'Lead Installer' },
    { name: 'Tom Harris', role: 'Design Consultant' },
  ];

  const values = [
    {
      title: 'Clarity',
      description:
        'Clarity is more than transparency in glass — it\'s transparency in how we work. We make complex processes feel simple, guiding clients with precision and openness at every step.',
    },
    {
      title: 'Craft',
      description:
        'Craft is where innovation meets timeless skill. Every detail is shaped with purpose, elevating architecture into something enduring and extraordinary.',
    },
    {
      title: 'Care',
      description:
        'Care defines the way we build relationships as much as the way we build structures. It\'s present in every conversation, every decision, and every installation.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c30f8bf?w=1920&auto=format&fit=crop&q=80"
            alt="P&J Glass workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/50" />
        </div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-24 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-4">About</p>
            <h1 className="text-display-xl text-white">ABOUT P&J GLASS</h1>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <Reveal>
              <p className="section-label mb-6">Manifesto</p>
              <h2 className="text-display-md text-brand-navy leading-tight">
                Welcome to P&J Glass LTD, your trusted glass design and cutting
                specialist in England. With years of expertise in the glass industry,
                we deliver precision and quality in every project we undertake.
              </h2>
              <p className="text-brand-grey mt-6 text-lg font-light leading-relaxed">
                Whether you need glass cut to size for windows, tabletops, or custom
                installations — from bespoke shower screens to vibrant kitchen splashbacks
                and elegant glass balustrades — we are here to meet your exact specifications.
              </p>
              <div className="mt-10">
                <Link href="/portfolio" className="btn-fluid">
                  Our Projects
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="aspect-[4/5] overflow-hidden img-reveal">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80"
                  alt="P&J Glass craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About Text */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-6">About P&J Glass</p>
          </Reveal>
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-brand-navy text-xl md:text-2xl font-light leading-relaxed">
                Our services extend beyond just cutting glass. We specialise in crafting
                bespoke shower screens tailored to your space and style, vibrant coloured
                kitchen splashbacks, custom glass balustrades, and precision-cut mirrors.
                From sleek, modern designs to more traditional aesthetics, our products
                enhance the beauty and functionality of your home.
              </p>
              <p className="text-brand-grey text-lg font-light leading-relaxed mt-6">
                At P&J Glass LTD, we understand that every project is unique. That&apos;s why
                we work closely with our clients to ensure our products not only meet
                but exceed their expectations. Based at 1181 High Rd, Romford, we serve
                London, Essex, and the surrounding counties with a commitment to quality
                craftsmanship and customer satisfaction at the heart of everything we do.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">The Beliefs That Shape Us</p>
            <h2 className="text-display-md text-brand-navy mb-16">Our Values</h2>
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

      {/* Team */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">Our Team</p>
            <h2 className="text-display-md text-brand-navy mb-16">
              The People Behind the Glass
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <Reveal key={member.name} delay={idx < 3 ? idx + 1 : 0}>
                <div className="border-t border-brand-silver pt-6">
                  <h3 className="text-brand-navy text-lg font-light">{member.name}</h3>
                  <p className="text-brand-grey text-xs tracking-[0.1em] uppercase mt-1">
                    {member.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">Awards &amp; Certifications</p>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {['FENSA Registered', 'BS6180 Compliant', 'BS EN 12150', 'Public Liability Insured'].map(
              (cert, idx) => (
                <Reveal key={cert} delay={idx + 1}>
                  <div className="border-t border-brand-silver pt-6">
                    <p className="text-brand-navy text-sm font-light">{cert}</p>
                  </div>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

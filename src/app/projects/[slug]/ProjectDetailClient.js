'use client';

import { useEffect, useRef, useState } from 'react';
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

export default function ProjectDetailClient({ project, nextProject, prevProject }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-24 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-4">{project.category}</p>
            <h1 className="text-display-xl text-brand-white mb-3">{project.title}</h1>
            <p className="text-brand-light/80 text-lg font-light max-w-2xl">{project.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Project Meta */}
      <section className="bg-brand-black py-12 px-6 md:px-10 lg:px-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Location', value: project.location },
              { label: 'Category', value: project.category },
              { label: 'Year', value: project.year },
              { label: 'Scope', value: project.scope },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[0.65rem] tracking-[0.15em] uppercase text-brand-grey mb-1">{item.label}</p>
                <p className="text-brand-white text-sm font-light">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-brand-black py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <div>
              <p className="section-label mb-4">The Brief</p>
              <p className="text-brand-light text-lg font-light leading-relaxed">
                {project.description}
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <p className="section-label mb-4">Services</p>
              <ul className="space-y-3 mb-10">
                {project.services.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-light text-sm font-light">
                    <span className="text-brand-accent mt-0.5">&#8226;</span>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="section-label mb-4">Specifications</p>
              <ul className="space-y-3">
                {project.specs.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-grey text-sm font-light">
                    <span className="text-brand-accent mt-0.5">&#8226;</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider max-w-7xl mx-auto" />

      {/* Gallery */}
      <section className="bg-brand-black py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">Gallery</p>
            <h2 className="text-display-sm text-brand-white mb-12">Project Photography</h2>
          </Reveal>

          {/* Main Image */}
          <Reveal>
            <div className="aspect-[16/9] overflow-hidden mb-4 img-reveal bg-brand-charcoal">
              <img
                src={project.gallery[activeImage]}
                alt={`${project.title} - Image ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-[16/9] overflow-hidden bg-brand-charcoal transition-opacity duration-300 ${
                  activeImage === i ? 'opacity-100 ring-1 ring-brand-accent' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt={`${project.title} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <>
          <div className="divider max-w-7xl mx-auto" />
          <section className="bg-brand-black py-16 md:py-24 px-6 md:px-10 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <Reveal>
                <blockquote className="text-brand-white text-2xl md:text-3xl font-light leading-relaxed mb-8">
                  &ldquo;{project.testimonial.text}&rdquo;
                </blockquote>
                <p className="text-brand-accent text-sm tracking-[0.1em] uppercase">
                  {project.testimonial.author}
                </p>
                <p className="text-brand-grey text-xs mt-1">{project.testimonial.role}</p>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* Navigation */}
      <section className="bg-brand-charcoal">
        <div className="grid md:grid-cols-2">
          {/* Prev */}
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group relative h-[300px] md:h-[400px] flex items-end overflow-hidden border-r border-white/5"
          >
            <div className="absolute inset-0">
              <img src={prevProject.image} alt={prevProject.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 p-8 md:p-12 w-full">
              <p className="text-[0.65rem] tracking-[0.15em] uppercase text-brand-grey mb-2">&larr; Previous Project</p>
              <h3 className="text-brand-white text-xl md:text-2xl font-light group-hover:text-brand-accent transition-colors">
                {prevProject.title}
              </h3>
              <p className="text-brand-grey text-xs mt-1">{prevProject.location}</p>
            </div>
          </Link>

          {/* Next */}
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group relative h-[300px] md:h-[400px] flex items-end overflow-hidden"
          >
            <div className="absolute inset-0">
              <img src={nextProject.image} alt={nextProject.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 p-8 md:p-12 w-full text-right">
              <p className="text-[0.65rem] tracking-[0.15em] uppercase text-brand-grey mb-2">Next Project &rarr;</p>
              <h3 className="text-brand-white text-xl md:text-2xl font-light group-hover:text-brand-accent transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-brand-grey text-xs mt-1">{nextProject.location}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-black py-20 md:py-28 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <p className="section-label mb-4">Start Your Project</p>
            <h2 className="text-display-md text-brand-white mb-6">
              Have a similar project in mind?
            </h2>
            <p className="text-brand-grey text-lg font-light max-w-xl mx-auto mb-10">
              Contact our team for a free site survey and bespoke quotation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-fluid btn-filled">
                Get a Free Quote
              </Link>
              <Link href="/portfolio" className="btn-fluid btn-outline-fluid">
                View All Projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

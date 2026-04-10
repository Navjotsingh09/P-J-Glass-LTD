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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const faqs = [
    {
      q: 'What types of glass do you work with?',
      a: 'We work with tempered glass, laminated glass, low-emissivity (Low-E) glass, tinted glass, and smart glass for various architectural applications.',
    },
    {
      q: 'Do you offer free consultations?',
      a: 'Yes, we offer complimentary consultations and site surveys for all projects. Contact us to arrange a visit.',
    },
    {
      q: 'What areas do you serve?',
      a: 'We serve London, Essex, and surrounding counties. For larger projects, we cover the entire UK.',
    },
    {
      q: 'How long does installation take?',
      a: 'Most residential installations are completed within 1-2 days. Larger commercial projects are planned on a case-by-case basis.',
    },
    {
      q: 'Can architectural glass be customised?',
      a: 'Yes, all our glass can be customised in terms of size, shape, colour, texture, and special coatings to meet your specific needs.',
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&auto=format&fit=crop&q=80"
            alt="Contact P&J Glass"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-24 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-4">Contact</p>
            <h1 className="text-display-xl text-brand-white">GET IN TOUCH</h1>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-20 mb-20">
            <Reveal>
              <p className="section-label mb-3">Talk to us</p>
              <a
                href="tel:02085991622"
                className="text-brand-white text-2xl md:text-3xl font-light hover:text-brand-accent transition-colors"
              >
                020 8599 1622
              </a>
              <br />
              <a
                href="tel:+447733309314"
                className="text-brand-grey text-lg font-light hover:text-brand-accent transition-colors mt-2 inline-block"
              >
                +44 7733 309 314
              </a>
            </Reveal>
            <Reveal delay={1}>
              <p className="section-label mb-3">Write us</p>
              <a
                href="mailto:info@pj-glass.co.uk"
                className="text-brand-white text-lg md:text-xl font-light hover:text-brand-accent transition-colors uppercase tracking-wide"
              >
                info@pj-glass.co.uk
              </a>
            </Reveal>
            <Reveal delay={2}>
              <p className="section-label mb-3">Visit us</p>
              <Link href="/contact" className="btn-fluid">
                Book a Visit
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>
          </div>

          {/* Address */}
          <Reveal>
            <div className="border-t border-white/10 pt-10">
              <p className="section-label mb-4">Address</p>
              <p className="text-brand-light text-xl md:text-2xl font-light">
                1181 High Rd, Romford<br />
                RM6 4AL, UK
              </p>
              <p className="text-brand-grey text-sm mt-4">
                Mon–Sat: 8 AM – 5 PM &nbsp;|&nbsp; Sun: 10 AM – 2 PM
              </p>
              <a
                href="https://maps.google.com/?q=1181+High+Rd+Romford+RM6+4AL"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fluid mt-6 inline-flex"
              >
                Google Maps
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">Have a Clear Vision in Mind?</p>
            <h2 className="text-display-md text-brand-white mb-4 max-w-3xl">
              Request a tailored quote for your glazing project.
            </h2>
            <p className="text-brand-grey text-lg font-light max-w-2xl mb-12">
              Fill in the form with as much detail as possible — our team will translate
              your vision into a precise proposal that fits your needs.
            </p>
          </Reveal>

          <Reveal>
            {submitted ? (
              <div className="border border-white/10 p-12 text-center">
                <h3 className="text-brand-white text-2xl font-light mb-4">
                  Thank you for your enquiry.
                </h3>
                <p className="text-brand-grey">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="section-label block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-brand-white focus:border-brand-accent focus:outline-none transition-colors text-lg font-light"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="section-label block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-brand-white focus:border-brand-accent focus:outline-none transition-colors text-lg font-light"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="section-label block mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-brand-white focus:border-brand-accent focus:outline-none transition-colors text-lg font-light"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="section-label block mb-2">
                      Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-brand-white focus:border-brand-accent focus:outline-none transition-colors text-lg font-light appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-brand-dark">Select a service</option>
                      <option value="balustrades" className="bg-brand-dark">Glass Balustrades</option>
                      <option value="splashbacks" className="bg-brand-dark">Kitchen Splashbacks</option>
                      <option value="showers" className="bg-brand-dark">Shower Screens</option>
                      <option value="mirrors" className="bg-brand-dark">Mirrors</option>
                      <option value="other" className="bg-brand-dark">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-10">
                  <label htmlFor="message" className="section-label block mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-brand-white focus:border-brand-accent focus:outline-none transition-colors text-lg font-light resize-none"
                  />
                </div>

                <button type="submit" className="btn-filled">
                  Send Enquiry
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section px-6 md:px-10 lg:px-16 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-label mb-4">FAQ</p>
            <h2 className="text-display-md text-brand-white mb-12">
              The questions with honest answers
            </h2>
          </Reveal>

          <div className="max-w-3xl">
            {faqs.map((faq, idx) => (
              <Reveal key={idx}>
                <div className="border-t border-white/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between py-6 text-left"
                  >
                    <h3 className="text-brand-white text-lg font-light pr-8">
                      {faq.q}
                    </h3>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className={`text-brand-grey flex-shrink-0 transition-transform duration-300 ${
                        openFaq === idx ? 'rotate-45' : ''
                      }`}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openFaq === idx ? 'max-h-40 pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-brand-grey text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>
    </>
  );
}

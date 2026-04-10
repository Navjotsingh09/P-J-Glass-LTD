'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productCategories } from '@/lib/products';

const shopCategories = Object.entries(productCategories).map(([key, cat]) => ({
  key,
  name: cat.name,
  slug: cat.slug,
  description: cat.description,
}));

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const megaRef = useRef(null);
  const megaTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Shop', href: '/products', hasMega: true },
    { name: 'Projects', href: '/portfolio' },
    { name: 'Showroom', href: '/contact' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-4">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="P&J Glass"
              width={180}
              height={48}
              priority
              className={`h-10 md:h-12 w-auto transition-all duration-500 ${scrolled ? '' : 'brightness-0 invert'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={handleMegaEnter}
                  onMouseLeave={handleMegaLeave}
                  ref={megaRef}
                >
                  <Link
                    href={link.href}
                    className={`text-[0.75rem] tracking-[0.15em] uppercase font-medium transition-colors duration-300 flex items-center gap-1 ${scrolled ? 'text-brand-navy/70 hover:text-brand-navy' : 'text-white/70 hover:text-white'}`}
                  >
                    {link.name}
                    <svg className={`w-3 h-3 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                      megaOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white border border-brand-silver rounded-lg shadow-2xl p-6 min-w-[640px]">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-silver">
                        <h3 className="text-brand-navy text-xs tracking-[0.2em] uppercase font-semibold">Shop by Category</h3>
                        <Link
                          href="/products"
                          className="text-brand-accent text-xs tracking-[0.1em] uppercase hover:text-brand-navy transition-colors"
                        >
                          View All →
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                        {shopCategories.map((cat) => (
                          <Link
                            key={cat.key}
                            href={`/products?category=${cat.key}`}
                            onClick={() => setMegaOpen(false)}
                            className="group flex flex-col py-2"
                          >
                            <span className="text-brand-navy/80 text-sm font-medium group-hover:text-brand-accent transition-colors duration-200">
                              {cat.name}
                            </span>
                            <span className="text-brand-grey text-xs mt-0.5 line-clamp-1">
                              {cat.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[0.75rem] tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${scrolled ? 'text-brand-navy/70 hover:text-brand-navy' : 'text-white/70 hover:text-white'}`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Get a Quote Button */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/contact"
              className="bg-brand-accent text-brand-navy px-6 py-3 text-[0.7rem] tracking-[0.15em] uppercase font-semibold hover:bg-brand-navy hover:text-white transition-colors duration-300"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1px] transition-all duration-300 ${mobileMenuOpen || !scrolled ? 'bg-white' : 'bg-brand-navy'} ${
                mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1px] transition-all duration-300 ${mobileMenuOpen || !scrolled ? 'bg-white' : 'bg-brand-navy'} ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-navy transition-opacity duration-500 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col justify-center items-center h-full gap-6 overflow-y-auto py-24">
          {navLinks.map((link, i) =>
            link.hasMega ? (
              <div key={link.name} className="flex flex-col items-center">
                <button
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                  className={`text-brand-white text-3xl font-light tracking-wider transition-all duration-500 flex items-center gap-2 ${
                    mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: mobileMenuOpen ? `${i * 100}ms` : '0ms' }}
                >
                  {link.name}
                  <svg className={`w-5 h-5 transition-transform duration-300 ${mobileShopOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${mobileShopOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                  <div className="flex flex-col items-center gap-2 pb-2">
                    <Link
                      href="/products"
                      onClick={() => { setMobileMenuOpen(false); setMobileShopOpen(false); }}
                      className="text-brand-accent text-sm tracking-wider uppercase"
                    >
                      All Products
                    </Link>
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.key}
                        href={`/products?category=${cat.key}`}
                        onClick={() => { setMobileMenuOpen(false); setMobileShopOpen(false); }}
                        className="text-white/60 hover:text-white text-sm tracking-wider transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-brand-white text-3xl font-light tracking-wider transition-all duration-500 ${
                  mobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${i * 100}ms` : '0ms' }}
              >
                {link.name}
              </Link>
            )
          )}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`mt-4 btn-filled transition-all duration-500 ${
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? `${navLinks.length * 100}ms` : '0ms' }}
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </>
  );
}

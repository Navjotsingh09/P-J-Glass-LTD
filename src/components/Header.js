'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productCategories } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

const shopCategories = Object.entries(productCategories).map(([key, cat]) => ({
  key,
  name: cat.name,
  slug: cat.slug,
  description: cat.description,
}));

function SaleBanner() {
  const [dismissed, setDismissed] = useState(true);
  useEffect(() => {
    setDismissed(localStorage.getItem('saleBannerDismissed') === 'true');
  }, []);
  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('saleBannerDismissed', 'true');
  };
  if (dismissed) return null;
  return (
    <div className="bg-red-600 text-white text-center py-2 px-4 text-[0.7rem] tracking-[0.12em] uppercase font-semibold relative z-[60]">
      <Link href="/products" className="hover:underline">
        🔥 15% OFF ALL PRODUCTS — Limited Time Only — Shop Now →
      </Link>
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-lg leading-none"
        aria-label="Dismiss sale banner"
      >
        ×
      </button>
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const megaRef = useRef(null);
  const megaTimeout = useRef(null);
  const { totalItems, setIsOpen: setCartOpen } = useCart();

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
    { name: 'Accessories', href: '/accessories' },
    { name: 'Calculator', href: '/glass-calculator' },
    { name: 'Projects', href: '/portfolio' },
    { name: 'Track Order', href: '/track' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <SaleBanner />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md ${
          scrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-12 xl:px-16 py-3">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="P&J Glass"
              width={160}
              height={42}
              priority
              className="h-9 md:h-10 w-auto transition-all duration-500"
            />
          </Link>

          {/* Desktop Navigation — centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-7 xl:gap-9">
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
                    className="text-[0.7rem] tracking-[0.14em] uppercase font-semibold transition-colors duration-300 flex items-center gap-1 text-brand-navy/70 hover:text-brand-navy"
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
                  className="text-[0.7rem] tracking-[0.14em] uppercase font-semibold transition-colors duration-300 text-brand-navy/70 hover:text-brand-navy"
                >
                  {link.name}
                </Link>
              )
            )}
            </div>
          </nav>

          {/* Instagram + Cart + Get a Quote */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href="https://www.instagram.com/pj_glasslimited/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors duration-300 text-brand-navy/70 hover:text-brand-navy"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 transition-colors duration-300 text-brand-navy/70 hover:text-brand-navy"
              aria-label="Open cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-brand-accent text-brand-navy text-[0.55rem] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              href="/contact"
              className="bg-brand-accent text-brand-navy px-5 py-2.5 text-[0.65rem] tracking-[0.15em] uppercase font-bold hover:bg-brand-navy hover:text-white transition-colors duration-300 rounded-sm"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Cart + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 transition-colors duration-300 text-brand-navy"
              aria-label="Open cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-accent text-brand-navy text-[0.55rem] font-bold rounded-full flex items-center justify-center min-w-[16px] h-[16px]">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[1px] transition-all duration-300 ${mobileMenuOpen ? 'bg-white' : 'bg-brand-navy'} ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1px] transition-all duration-300 ${mobileMenuOpen ? 'bg-white' : 'bg-brand-navy'} ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </button>
          </div>
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
          <a
            href="https://www.instagram.com/pj_glasslimited/"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 flex items-center gap-2 text-white/60 hover:text-brand-accent transition-all duration-500 ${
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? `${(navLinks.length + 1) * 100}ms` : '0ms' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-sm tracking-wider">@pj_glasslimited</span>
          </a>
        </nav>
      </div>
    </>
  );
}

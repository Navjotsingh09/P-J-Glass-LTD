'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Shop', href: '/products' },
    { name: 'Projects', href: '/portfolio' },
    { name: 'Showroom', href: '/contact' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-brand-black/95 backdrop-blur-md shadow-lg'
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
              className="h-10 md:h-12 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-white text-[0.75rem] tracking-[0.15em] uppercase font-medium transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Get a Quote Button */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/contact"
              className="bg-brand-accent text-brand-black px-6 py-3 text-[0.7rem] tracking-[0.15em] uppercase font-semibold hover:bg-white transition-colors duration-300"
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
              className={`block w-6 h-[1px] bg-brand-white transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-brand-white transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-black transition-opacity duration-500 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col justify-center items-center h-full gap-8">
          {navLinks.map((link, i) => (
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
          ))}
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

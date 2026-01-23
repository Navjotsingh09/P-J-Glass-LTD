'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Glass Balustrades', href: '/services/balustrades' },
        { name: 'Kitchen Splashbacks', href: '/services/splashbacks' },
        { name: 'Shower Screens', href: '/showers' },
        { name: 'Mirrors & Glazing', href: '/services/mirrors' },
      ],
    },
    { name: 'Products', href: '/products' },
    { name: 'Online Store', href: '/store' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Trade', href: '/trade' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-white shadow-md'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-charcoal text-white text-sm">
        <div className="container-custom py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>📞 01708 123 456</span>
            <span>✉️ info@pjglass.co.uk</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/trade" className="hover:text-secondary transition-colors">Trade Account</Link>
            <Link href="/about" className="hover:text-secondary transition-colors">About Us</Link>
          </div>
        </div>
      </div>

      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold text-lg">
              PJ
            </div>
            <span className="text-xl md:text-2xl font-bold text-charcoal">P&J Glass</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, colors, glass types..."
                className="w-full px-4 py-2 pr-12 border-2 border-neutral-light rounded-lg focus:border-primary focus:outline-none"
              />
              <button className="absolute right-0 top-0 bottom-0 px-4 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-neutral-dark hover:text-primary font-medium transition-colors"
                >
                  {item.name}
                  {item.dropdown && (
                    <svg
                      className="inline-block ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white shadow-lg rounded-lg py-2 min-w-[220px]">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-neutral-dark hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link href="/contact" className="text-neutral-dark hover:text-primary transition-colors text-sm font-medium">
              Get Quote
            </Link>
            <Link href="/portfolio" className="text-neutral-dark hover:text-primary transition-colors text-sm font-medium">
              Portfolio
            </Link>
            <Link href="/store" className="relative group">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Shop</span>
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-light">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-3 text-neutral-dark hover:text-primary font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 space-y-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-2 text-sm text-neutral-grey hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-3">
              <Link
                href="/contact"
                className="btn-secondary w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
              <Link
                href="/store"
                className="btn-primary w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Design Your Glass →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { name: 'Glass Balustrades', href: '/services/balustrades' },
    { name: 'Kitchen Splashbacks', href: '/services/splashbacks' },
    { name: 'Shower Screens', href: '/showers' },
    { name: 'Mirrors & Glass', href: '/services/mirrors' },
    { name: 'Trade Services', href: '/trade' },
  ];

  const quickLinks = [
    { name: 'All Products', href: '/products' },
    { name: 'Best Sellers', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-[#131921] sticky top-0 z-50">
      {/* Top Navigation Bar */}
      <div className="border-b border-[#3a4553]">
        <div className="container-custom">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 px-2 py-1 hover:border hover:border-white rounded transition-all">
              <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                <span className="font-bold text-2xl text-[#131921]">P&J</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-white">P&J Glass</div>
                <div className="text-xs text-gray-300">Premium Glass Solutions</div>
              </div>
            </Link>

            {/* Delivery Location (Amazon-style) */}
            <button className="hidden lg:flex items-center gap-1 px-2 py-1 hover:border hover:border-white rounded text-white text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-300">Deliver to</div>
                <div className="font-bold">UK</div>
              </div>
            </button>

            {/* Search Bar - Amazon Style */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-3xl mx-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for glass products, balustrades, splashbacks..."
                className="flex-1 px-4 py-2.5 text-sm focus:outline-none rounded-l"
              />
              <button
                type="submit"
                className="px-6 bg-[#febd69] hover:bg-[#f3a847] transition-colors rounded-r flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Account & Cart */}
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hidden lg:flex flex-col items-start px-2 py-1 hover:border hover:border-white rounded text-white text-sm">
                <div className="text-xs text-gray-300">Hello, Customer</div>
                <div className="font-bold">Get a Quote</div>
              </Link>

              <Link href="/products" className="relative px-2 py-1 hover:border hover:border-white rounded flex items-center gap-2 text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="hidden sm:block">
                  <div className="font-bold text-sm">Basket</div>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation - Category Bar */}
      <div className="bg-[#232f3e]">
        <div className="container-custom">
          <div className="flex items-center gap-6 py-2 text-white text-sm overflow-x-auto">
            {/* All Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                onMouseEnter={() => setCategoryMenuOpen(true)}
                onMouseLeave={() => setCategoryMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1 hover:border hover:border-white rounded whitespace-nowrap font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All Categories
              </button>

              {/* Category Dropdown Menu */}
              {categoryMenuOpen && (
                <div
                  onMouseEnter={() => setCategoryMenuOpen(true)}
                  onMouseLeave={() => setCategoryMenuOpen(false)}
                  className="absolute top-full left-0 mt-1 bg-white text-black shadow-lg rounded w-64 py-2 z-50"
                >
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setCategoryMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-2 py-1 hover:border hover:border-white rounded whitespace-nowrap hidden lg:block"
              >
                {link.name}
              </Link>
            ))}

            <Link href="/contact" className="px-2 py-1 hover:border hover:border-white rounded whitespace-nowrap text-[#febd69] font-semibold hidden md:block">
              🎉 Free Quote - Limited Time
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-[#232f3e] px-4 py-2 border-t border-[#3a4553]">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 text-sm focus:outline-none rounded-l"
          />
          <button
            type="submit"
            className="px-4 bg-[#febd69] hover:bg-[#f3a847] transition-colors rounded-r"
          >
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="py-4">
            <div className="space-y-1 px-4">
              <div className="font-bold text-lg mb-3 text-gray-900">Categories</div>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              
              <div className="border-t my-3 pt-3">
                <div className="font-bold text-lg mb-3 text-gray-900">Quick Links</div>
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/contact"
                className="block mt-4 bg-[#febd69] text-center py-3 rounded font-bold hover:bg-[#f3a847] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

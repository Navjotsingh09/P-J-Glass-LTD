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
    <header className="bg-white sticky top-0 z-50 shadow-md">
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 px-2 py-1 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="font-bold text-2xl text-white">P&J</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-gray-900">P&J Glass</div>
                <div className="text-xs text-gray-600">Premium Glass Solutions</div>
              </div>
            </Link>

            {/* Service Area */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg text-sm">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-600">Service Area</div>
                <div className="font-semibold text-gray-900">London & Essex</div>
              </div>
            </div>

            {/* Search Bar - Clean Style */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for glass products, balustrades, splashbacks..."
                className="flex-1 px-4 py-2.5 text-sm border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-l-lg"
              />
              <button
                type="submit"
                className="px-6 bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded-r-lg flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Account & Cart */}
            <div className="flex items-center gap-2">
              <Link href="/contact" className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-sm shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Get a Quote
              </Link>

              <Link href="/products" className="relative px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2 text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="hidden sm:block font-semibold text-sm">Basket</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation - Category Bar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center gap-6 py-2.5 text-gray-700 text-sm overflow-x-auto">
            {/* All Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                onMouseEnter={() => setCategoryMenuOpen(true)}
                onMouseLeave={() => setCategoryMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg whitespace-nowrap font-semibold transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All Categories
              </button>

              {/* Category Dropdown Menu */}
              {categoryMenuOpen && (
                <div
                  onMouseEnter={() => setCategoryMenuOpen(true)}
                  onMouseLeave={() => setCategoryMenuOpen(false)}
                  className="absolute top-full left-0 mt-2 bg-white text-gray-700 shadow-xl rounded-lg w-64 py-2 z-50 border border-gray-200"
                >
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
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
                className="px-3 py-2 hover:text-blue-600 hover:bg-white rounded-lg whitespace-nowrap hidden lg:block font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <Link href="/contact" className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 rounded-lg whitespace-nowrap font-semibold hidden md:block transition-all shadow-sm">
              🎉 Free Quote - Limited Time
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-gray-50 px-4 py-3 border-t border-gray-200">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2.5 text-sm border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-l-lg"
          />
          <button
            type="submit"
            className="px-5 bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded-r-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                className="block mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
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

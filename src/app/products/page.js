'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  balustrades, 
  splashbackColors, 
  splashbackPrints, 
  mirrors, 
  bathScreens,
  productCategories 
} from '../../lib/products';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const allProducts = [
    ...balustrades,
    ...splashbackColors,
    ...splashbackPrints,
    ...mirrors,
    ...bathScreens,
  ];

  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    
    if (priceFilter !== 'all') {
      if (priceFilter === 'under100' && product.priceFrom >= 100) return false;
      if (priceFilter === '100-200' && (product.priceFrom < 100 || product.priceFrom >= 200)) return false;
      if (priceFilter === 'over200' && product.priceFrom < 200) return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container-custom text-center">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Products
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Premium glass products for your home and business
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>
              {Object.entries(productCategories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === key
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Prices</option>
              <option value="under100">Under £100</option>
              <option value="100-200">£100 - £200</option>
              <option value="over200">Over £200</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gray-200 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-6xl">{
                      product.category === 'balustrades' ? '🪜' :
                      product.category === 'splashbacks' ? '🎨' :
                      product.category === 'mirrors' ? '🪞' :
                      product.category === 'bathScreens' ? '🛁' : '✨'
                    }</span>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.popular && (
                      <span className="bg-success text-white text-xs px-2 py-1 rounded">
                        Popular
                      </span>
                    )}
                    {product.bestSeller && (
                      <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
                        Best Seller
                      </span>
                    )}
                    {product.trending && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                        Trending
                      </span>
                    )}
                  </div>

                  {/* Color Swatch for Splashbacks */}
                  {product.hex && (
                    <div className="absolute bottom-3 right-3">
                      <div 
                        className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: product.hex }}
                      />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Product Details */}
                  <div className="text-sm text-gray-600 mb-3 space-y-1">
                    {product.thickness && (
                      <div>Thickness: <span className="font-medium">{product.thickness}</span></div>
                    )}
                    {product.finish && (
                      <div>Finish: <span className="font-medium">{product.finish}</span></div>
                    )}
                    {product.colorName && (
                      <div>Color: <span className="font-medium">{product.colorName}</span></div>
                    )}
                  </div>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <ul className="text-xs text-gray-500 mb-3 space-y-1">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-success mr-1">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-amber-400">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.reviews || 0})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {product.priceDisplay || `£${product.priceFrom}`}
                      </div>
                      {product.priceFrom < product.priceTo && (
                        <div className="text-xs text-gray-500">Starting from</div>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-2">
                    <Link 
                      href={`/products/${product.id}`}
                      className="btn-primary flex-1 text-center text-sm py-2"
                    >
                      View Details
                    </Link>
                    <Link 
                      href="/contact"
                      className="btn-outline flex-1 text-center text-sm py-2"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No products found matching your filters.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceFilter('all');
                }}
                className="btn-primary mt-4"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg mb-6 opacity-90">
            We offer custom solutions tailored to your specific needs
          </p>
          <Link href="/contact" className="btn-secondary">
            Contact Us for Custom Quote
          </Link>
        </div>
      </section>
    </div>
  );
}

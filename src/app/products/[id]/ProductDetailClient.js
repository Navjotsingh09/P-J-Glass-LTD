'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductDetailClient({ product, allProducts }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Create gallery with product image repeated 4 times as placeholder
  const gallery = [product.image, product.image, product.image, product.image];

  const features = [
    { icon: '✨', title: 'Premium Quality', desc: 'Highest grade materials' },
    { icon: '🛠️', title: 'Expert Installation', desc: 'Professional fitting included' },
    { icon: '📏', title: 'Custom Sizes', desc: 'Made to your exact measurements' },
    { icon: '✅', title: '10-Year Warranty', desc: 'Comprehensive coverage' },
  ];

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-primary">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-neutral-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl overflow-hidden shadow-xl"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl">{product.image}</span>
                </div>
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl">{img}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {product.badge && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {product.inStock !== false && (
                    <span className="px-3 py-1 bg-success/10 text-success text-sm font-semibold rounded-full">
                      ✓ In Stock
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        {i < Math.floor(product.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-neutral-600">
                    {product.rating} ({product.reviews || 42} reviews)
                  </span>
                </div>

                <p className="text-3xl font-bold text-primary mb-6">
                  £{product.price.toFixed(2)}
                  <span className="text-base text-neutral-600 font-normal ml-2">per m²</span>
                </p>
              </div>

              <div className="prose max-w-none">
                <p className="text-neutral-700 text-lg">{product.description}</p>
              </div>

              {/* Size Selector */}
              {product.sizes && (
                <div>
                  <label className="block text-sm font-semibold mb-3">Select Size</label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-white'
                            : 'border-neutral-300 hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && (
                <div>
                  <label className="block text-sm font-semibold mb-3">Available Colors</label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-12 h-12 rounded-full border-2 border-neutral-300 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold mb-3">Quantity (m²)</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg border-2 border-neutral-300 hover:border-primary transition-all flex items-center justify-center text-xl font-bold"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-12 text-center text-xl font-bold border-2 border-neutral-300 rounded-lg focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-lg border-2 border-neutral-300 hover:border-primary transition-all flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                  <div className="ml-4">
                    <p className="text-sm text-neutral-600">Total Price</p>
                    <p className="text-2xl font-bold text-primary">
                      £{(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="btn-primary flex-1">
                  <span className="mr-2">🛒</span>
                  Add to Cart
                </button>
                <Link href="/contact" className="btn-secondary flex-1 text-center">
                  Request Quote
                </Link>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6 space-y-3 border border-neutral-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <p className="font-semibold">Free Delivery</p>
                    <p className="text-sm text-neutral-600">On orders over £500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold">Expert Support</p>
                    <p className="text-sm text-neutral-600">Call 01708 123 456</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔧</span>
                  <div>
                    <p className="font-semibold">Professional Installation</p>
                    <p className="text-sm text-neutral-600">Available across London & Essex</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-neutral-200">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-neutral-50 rounded-xl hover:shadow-lg transition-all"
              >
                <span className="text-5xl mb-4 block">{feature.icon}</span>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Product Specifications */}
          <div className="mt-16 pt-16 border-t border-neutral-200">
            <h2 className="text-3xl font-bold mb-8">Product Specifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Category</span>
                  <span className="text-neutral-700">{product.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Material</span>
                  <span className="text-neutral-700">Toughened Safety Glass</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Thickness</span>
                  <span className="text-neutral-700">10mm - 19mm</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Warranty</span>
                  <span className="text-neutral-700">10 Years</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Installation</span>
                  <span className="text-neutral-700">Professional Required</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Customization</span>
                  <span className="text-neutral-700">Available</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Lead Time</span>
                  <span className="text-neutral-700">2-3 Weeks</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Maintenance</span>
                  <span className="text-neutral-700">Low - Easy Clean</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mt-16 pt-16 border-t border-neutral-200">
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {[
                {
                  name: 'Sarah Mitchell',
                  rating: 5,
                  date: 'Dec 2025',
                  comment: 'Absolutely stunning quality! The installation was flawless and the team was very professional.',
                },
                {
                  name: 'James Anderson',
                  rating: 5,
                  date: 'Nov 2025',
                  comment: 'Excellent product and service. Really transformed our space. Highly recommend!',
                },
                {
                  name: 'Emma Thompson',
                  rating: 4,
                  date: 'Oct 2025',
                  comment: 'Great quality glass. Installation took a bit longer than expected but the end result is perfect.',
                },
              ].map((review, idx) => (
                <div key={idx} className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{review.name}</h4>
                      <p className="text-sm text-neutral-600">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          {i < review.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {allProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="card hover:scale-105 transition-transform"
                >
                  <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-5xl">{relatedProduct.image}</span>
                  </div>
                  <h3 className="font-bold mb-2">{relatedProduct.name}</h3>
                  <p className="text-primary font-bold">
                    £{relatedProduct.price.toFixed(2)}/m²
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        {i < Math.floor(relatedProduct.rating) ? '★' : '☆'}
                      </span>
                    ))}
                    <span className="text-sm text-neutral-600 ml-1">
                      ({relatedProduct.rating})
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-8 text-white/90">
            Our glass experts are here to guide you through your options
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:01708123456" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              📞 Call 01708 123 456
            </a>
            <Link href="/contact" className="btn bg-white text-primary hover:bg-neutral-100">
              Request Free Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

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
            <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">SKU</span>
                  <span className="text-neutral-700">{product.sku || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Category</span>
                  <span className="text-neutral-700 capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Material</span>
                  <span className="text-neutral-700">{product.material || 'Toughened Safety Glass'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Thickness</span>
                  <span className="text-neutral-700">{product.thickness || '10mm - 19mm'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Finish</span>
                  <span className="text-neutral-700">{product.finish || 'Clear'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Warranty</span>
                  <span className="text-neutral-700">10 Years Manufacturer's Warranty</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Installation</span>
                  <span className="text-neutral-700">Professional Installation Required</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Customization</span>
                  <span className="text-neutral-700">Custom Sizes & Finishes Available</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Lead Time</span>
                  <span className="text-neutral-700">10-15 Working Days</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Maintenance</span>
                  <span className="text-neutral-700">Low Maintenance - Easy Clean</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Compliance</span>
                  <span className="text-neutral-700">BS EN 12150 / Building Regs</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="font-semibold">Service Area</span>
                  <span className="text-neutral-700">London & Essex</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features & Benefits */}
          {product.features && (
            <div className="mt-16 pt-16 border-t border-neutral-200">
              <h2 className="text-3xl font-bold mb-8">Key Features & Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                    <span className="text-2xl text-primary">✓</span>
                    <div>
                      <p className="text-neutral-800 font-medium">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Installation Process */}
          <div className="mt-16 pt-16 border-t border-neutral-200">
            <h2 className="text-3xl font-bold mb-8">Professional Installation Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="font-bold text-lg mb-2">Site Survey</h3>
                <p className="text-neutral-600 text-sm">
                  Free on-site measurement and consultation to understand your exact requirements
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="font-bold text-lg mb-2">Custom Manufacture</h3>
                <p className="text-neutral-600 text-sm">
                  Glass cut and finished to your exact specifications in our specialist workshop
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="font-bold text-lg mb-2">Quality Check</h3>
                <p className="text-neutral-600 text-sm">
                  Rigorous quality control inspection before delivery to ensure perfection
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="font-bold text-lg mb-2">Expert Installation</h3>
                <p className="text-neutral-600 text-sm">
                  Professional fitting by certified installers with full insurance coverage
                </p>
              </motion.div>
            </div>
          </div>

          {/* Application Use Cases */}
          {product.useCases && (
            <div className="mt-16 pt-16 border-t border-neutral-200">
              <h2 className="text-3xl font-bold mb-8">Ideal Applications</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {product.useCases.map((useCase, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 rounded-xl border border-neutral-200 text-center hover:shadow-xl transition-all">
                    <span className="text-4xl mb-4 block">🏠</span>
                    <p className="font-semibold text-lg">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Care & Maintenance */}
          <div className="mt-16 pt-16 border-t border-neutral-200">
            <h2 className="text-3xl font-bold mb-8">Care & Maintenance Guide</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
                <div className="text-4xl mb-4">🧼</div>
                <h3 className="text-xl font-bold mb-4">Daily Cleaning</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-neutral-700">Use warm water and mild detergent for regular cleaning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-neutral-700">Wipe with a soft microfiber cloth to avoid scratches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-neutral-700">Rinse thoroughly and dry with a clean cloth</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-4">Deep Cleaning</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-neutral-700">Use specialized glass cleaner for stubborn marks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-neutral-700">Avoid abrasive cleaners or scouring pads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-neutral-700">Apply protective nano coating annually for easier maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 pt-16 border-t border-neutral-200">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 group">
                <summary className="font-bold text-lg cursor-pointer flex items-center justify-between">
                  Is this product suitable for outdoor use?
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-neutral-700">
                  Yes, all our toughened glass products are suitable for both indoor and outdoor applications. 
                  They are weather-resistant and UV stable, making them perfect for balconies, terraces, and outdoor areas.
                </p>
              </details>
              
              <details className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 group">
                <summary className="font-bold text-lg cursor-pointer flex items-center justify-between">
                  How long does installation take?
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-neutral-700">
                  Installation time varies depending on the project size. A typical residential installation takes 1-2 days. 
                  We'll provide a detailed timeline during your free site survey.
                </p>
              </details>
              
              <details className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 group">
                <summary className="font-bold text-lg cursor-pointer flex items-center justify-between">
                  Do you offer custom sizes?
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-neutral-700">
                  Absolutely! All our products are made to measure. We can create glass in virtually any size and shape 
                  to fit your exact requirements. Contact us for a custom quote.
                </p>
              </details>
              
              <details className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 group">
                <summary className="font-bold text-lg cursor-pointer flex items-center justify-between">
                  What safety standards does this meet?
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-neutral-700">
                  All our glass products meet British Standard BS EN 12150 for toughened safety glass and comply with 
                  Building Regulations Part K for glazing safety. We provide certification with every installation.
                </p>
              </details>
              
              <details className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 group">
                <summary className="font-bold text-lg cursor-pointer flex items-center justify-between">
                  What's included in the warranty?
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-neutral-700">
                  Our 10-year warranty covers manufacturing defects, delamination, and hardware failures. 
                  It includes both the glass and installation work when professionally fitted by our team.
                </p>
              </details>
              
              <details className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 group">
                <summary className="font-bold text-lg cursor-pointer flex items-center justify-between">
                  Can I get a sample before ordering?
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-neutral-700">
                  Yes! We offer free samples of our glass finishes and colors. Visit our showroom in Essex or 
                  contact us to request samples delivered to your location.
                </p>
              </details>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mt-16 pt-16 border-t border-neutral-200">
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                <div className="text-5xl font-bold text-yellow-600 mb-2">{product.rating || 4.9}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>
                <p className="text-neutral-600">Based on {product.reviews || 127} reviews</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="text-5xl font-bold text-green-600 mb-2">98%</div>
                <p className="text-lg font-semibold mb-2">Would Recommend</p>
                <p className="text-neutral-600">Customer satisfaction rate</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="text-5xl font-bold text-blue-600 mb-2">2,500+</div>
                <p className="text-lg font-semibold mb-2">Projects Completed</p>
                <p className="text-neutral-600">Since 2010</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  name: 'Sarah Mitchell',
                  location: 'Chigwell, Essex',
                  rating: 5,
                  date: 'Dec 2025',
                  verified: true,
                  project: 'Glass Balustrade Installation',
                  comment: 'Absolutely stunning quality! The installation was flawless and the team was very professional. Our balcony looks amazing and the glass really opens up the space.',
                },
                {
                  name: 'James Anderson',
                  location: 'Brentwood, Essex',
                  rating: 5,
                  date: 'Nov 2025',
                  verified: true,
                  project: 'Kitchen Splashback',
                  comment: 'Excellent product and service from start to finish. Really transformed our kitchen. The color match was perfect and the quality is outstanding. Highly recommend!',
                },
                {
                  name: 'Emma Thompson',
                  location: 'Romford, London',
                  rating: 4,
                  date: 'Oct 2025',
                  verified: true,
                  project: 'Shower Enclosure',
                  comment: 'Great quality glass and professional installation. The lead time was slightly longer than expected but the end result is perfect. Worth the wait!',
                },
              ].map((review, idx) => (
                <div key={idx} className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">{review.name}</h4>
                        {review.verified && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600">{review.location}</p>
                      <p className="text-sm text-neutral-500 italic mt-1">{review.project}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            {i < review.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-neutral-600">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-neutral-700">{review.comment}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                <span>📝</span>
                Leave Your Review
              </Link>
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
                  <h3 className="font-bold mb-2 line-clamp-2">{relatedProduct.name}</h3>
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

      {/* Project Showcase */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Real Projects, Real Results</h2>
            <p className="text-xl text-neutral-600">See this product in action in our recent installations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Modern Residential Balcony',
                location: 'Chigwell, Essex',
                type: 'Residential',
                size: '12m² Installation',
                description: 'Complete glass balustrade system with frameless design creating stunning views',
              },
              {
                title: 'Contemporary Office Space',
                location: 'Canary Wharf, London',
                type: 'Commercial',
                size: '45m² Installation',
                description: 'Large-scale commercial installation with powder-coated posts and clear glass',
              },
              {
                title: 'Luxury Home Extension',
                location: 'Brentwood, Essex',
                type: 'Residential',
                size: '8m² Installation',
                description: 'Elegant frameless glass balustrade complementing modern architecture',
              },
            ].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20 group-hover:opacity-30 transition-opacity">
                    🏗️
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl">{project.title}</h3>
                  <p className="text-primary font-semibold">📍 {project.location}</p>
                  <p className="text-sm text-neutral-600 font-medium">📏 {project.size}</p>
                  <p className="text-neutral-700">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary inline-flex items-center gap-2">
              <span>🖼️</span>
              View Complete Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Documentation */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Technical Documentation & Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="/downloads/installation-guide.pdf"
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                📄
              </div>
              <h3 className="font-bold mb-2">Installation Guide</h3>
              <p className="text-sm text-neutral-600 mb-3">Complete step-by-step fitting instructions</p>
              <span className="text-primary text-sm font-semibold">Download PDF →</span>
            </a>
            
            <a
              href="/downloads/product-datasheet.pdf"
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="font-bold mb-2">Technical Datasheet</h3>
              <p className="text-sm text-neutral-600 mb-3">Detailed specifications and compliance</p>
              <span className="text-primary text-sm font-semibold">Download PDF →</span>
            </a>
            
            <a
              href="/downloads/care-maintenance.pdf"
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                🧹
              </div>
              <h3 className="font-bold mb-2">Care Guide</h3>
              <p className="text-sm text-neutral-600 mb-3">Maintenance and cleaning instructions</p>
              <span className="text-primary text-sm font-semibold">Download PDF →</span>
            </a>
            
            <a
              href="/downloads/warranty-certificate.pdf"
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                ✅
              </div>
              <h3 className="font-bold mb-2">Warranty Info</h3>
              <p className="text-sm text-neutral-600 mb-3">10-year warranty terms and conditions</p>
              <span className="text-primary text-sm font-semibold">Download PDF →</span>
            </a>
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

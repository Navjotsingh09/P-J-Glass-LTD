'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getPopularProducts, productCategories } from '../../lib/products';

export default function StorePage() {
  const popularProducts = getPopularProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90" />
        
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Online Glass Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Browse our complete range of glass products with instant pricing
            </p>
            <Link href="/products" className="btn-secondary text-lg">
              Shop All Products →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you need</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(productCategories).map(([key, category], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href="/products"
                  className="card group hover:shadow-2xl transition-all duration-300 h-full"
                >
                  <div className="text-center">
                    <div className="text-7xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <span className="text-primary font-semibold group-hover:underline">
                      Browse Products →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Right Now</h2>
            <p className="text-xl text-gray-600">Our bestselling products</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card group hover:shadow-xl transition-all"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-6xl">
                    {product.category === 'balustrades' ? '🪜' :
                     product.category === 'splashbacks' ? '🎨' :
                     product.category === 'mirrors' ? '🪞' :
                     product.category === 'bathScreens' ? '🛁' : '✨'}
                  </span>
                  {product.hex && (
                    <div 
                      className="absolute bottom-3 right-3 w-8 h-8 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: product.hex }}
                    />
                  )}
                  {(product.popular || product.bestSeller) && (
                    <span className="absolute top-3 left-3 bg-success text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <div className="text-2xl font-bold text-primary mb-3">
                  {product.priceDisplay}
                </div>

                <Link 
                  href="/products"
                  className="btn-primary w-full text-center text-sm"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="btn-outline text-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Shop With Us?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '✅',
                title: 'Instant Pricing',
                description: 'See exact prices for your requirements instantly online',
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                description: '7-10 day lead time on most products',
              },
              {
                icon: '💰',
                title: 'Best Prices',
                description: 'Competitive pricing with no hidden fees',
              },
              {
                icon: '🛡️',
                title: '10-Year Guarantee',
                description: 'All products backed by comprehensive warranty',
              },
              {
                icon: '📏',
                title: 'Made to Measure',
                description: 'Every product custom-made to your exact size',
              },
              {
                icon: '🎨',
                title: 'Any Color',
                description: 'RAL color matching available on splashbacks',
              },
              {
                icon: '👷',
                title: 'Expert Installation',
                description: 'Professional fitting service available',
              },
              {
                icon: '💬',
                title: 'Free Advice',
                description: 'Expert guidance from our knowledgeable team',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Browse our full product range and get instant pricing
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/products" className="btn-secondary text-lg">
                Browse Products
              </Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">
                Get Expert Advice
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

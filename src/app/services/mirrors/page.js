'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { mirrors } from '../../../lib/products';

export default function MirrorsPage() {
  const mirrorTypes = [
    {
      name: 'Frameless Wall Mirrors',
      description: 'Clean, modern mirrors in any size',
      features: ['Polished edges', 'Safety backing', 'Drill holes optional', 'Custom shapes'],
      priceFrom: 37,
      icon: '🪞',
    },
    {
      name: 'Leaner Mirrors',
      description: 'Full-length free-standing mirrors',
      features: ['Rectangle or arch', 'No fixing required', 'Various sizes', 'Premium finish'],
      priceFrom: 75,
      icon: '🖼️',
    },
    {
      name: 'Gym & Dance Mirrors',
      description: 'Large format mirrors for studios',
      features: ['Shatter-resistant', 'Wall-mounted', 'Custom sizing', 'Commercial grade'],
      priceFrom: 145,
      icon: '💪',
    },
    {
      name: 'Tinted Mirrors',
      description: 'Grey, bronze, or antique bronze',
      features: ['Unique aesthetic', 'Reduces glare', 'Decorative', 'Statement pieces'],
      priceFrom: 85,
      icon: '✨',
    },
  ];

  const shapes = [
    { name: 'Round', icon: '⭕' },
    { name: 'Rectangle', icon: '▭' },
    { name: 'Square', icon: '◻️' },
    { name: 'Arch', icon: '🌈' },
    { name: 'Pebble', icon: '🥚' },
    { name: 'Custom', icon: '✂️' },
  ];

  const finishes = [
    { name: 'Silver Mirror', description: 'Standard high-quality mirror', popular: true },
    { name: 'Grey Tinted', description: 'Modern smoked effect' },
    { name: 'Bronze Tinted', description: 'Warm vintage look' },
    { name: 'Antique Bronze', description: 'Aged mirror effect' },
  ];

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
              Bespoke Mirrors & Glazing
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Custom-made mirrors in any size, shape, and finish
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-secondary">
                Get Free Quote
              </Link>
              <Link href="/products" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                View Mirror Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products from Database */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Mirror Products</h2>
            <p className="text-xl text-gray-600">From our product catalog</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mirrors.map((mirror, index) => (
              <motion.div
                key={mirror.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all"
              >
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-8xl">🪞</span>
                  {mirror.trending && (
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full">
                      Trending
                    </span>
                  )}
                  {mirror.popular && (
                    <span className="absolute top-3 left-3 bg-success text-white text-xs px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{mirror.name}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {mirror.thickness} • {mirror.finish}
                </p>

                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {mirror.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {mirror.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-amber-400">
                      {'★'.repeat(Math.floor(mirror.rating))}
                    </div>
                    <span className="text-xs text-gray-500">({mirror.reviews || 0})</span>
                  </div>
                )}

                <div className="text-3xl font-bold text-primary mb-4">
                  {mirror.priceDisplay}
                </div>

                <Link href="/contact" className="btn-primary w-full text-center">
                  Get Quote
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mirror Types */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mirror Solutions</h2>
            <p className="text-xl text-gray-600">For every space and style</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mirrorTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{type.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{type.name}</h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {type.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <span className="text-success mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-primary">
                          £{type.priceFrom}+
                        </div>
                        <div className="text-sm text-gray-500">Starting from</div>
                      </div>
                      <Link href="/contact" className="btn-primary">
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shapes Available */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Any Shape You Need</h2>
            <p className="text-xl text-gray-600">Standard or custom shapes available</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {shapes.map((shape, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card text-center hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-5xl mb-3">{shape.icon}</div>
                <p className="font-semibold">{shape.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Finishes */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mirror Finishes</h2>
            <p className="text-xl text-gray-600">Choose your perfect finish</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {finishes.map((finish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card relative"
              >
                {finish.popular && (
                  <span className="absolute top-3 right-3 bg-success text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{finish.name}</h3>
                <p className="text-gray-600">{finish.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Mirrors?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '✂️',
                title: 'Made to Measure',
                description: 'Every mirror cut precisely to your exact specifications',
              },
              {
                icon: '💎',
                title: 'Premium Quality',
                description: 'High-quality float glass with perfect clarity',
              },
              {
                icon: '🛡️',
                title: 'Safety Backed',
                description: 'Protective backing prevents dangerous shards if broken',
              },
              {
                icon: '✨',
                title: 'Polished Edges',
                description: 'Smooth, professional edge polishing on all mirrors',
              },
              {
                icon: '📐',
                title: 'Any Size',
                description: 'From small bathroom mirrors to wall-sized installations',
              },
              {
                icon: '⚡',
                title: 'Fast Turnaround',
                description: '7-10 day lead time for most mirror orders',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
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
            <h2 className="text-4xl font-bold mb-4">Ready to Order Your Custom Mirror?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free quote with exact measurements and pricing
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-secondary">
                Request Free Quote
              </Link>
              <a href="tel:01708123456" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Call: 01708 123 456
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

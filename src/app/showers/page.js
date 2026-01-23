'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ShowerScreens() {
  const showerTypes = [
    {
      name: 'Walk-In Shower Screens',
      description: '8-10mm frameless toughened glass panels',
      features: ['Frameless design', 'Chrome or Matt Black fittings', 'Custom sizes', 'Easy clean coating'],
      priceFrom: 295,
      image: '🚿',
    },
    {
      name: 'Quadrant Shower Enclosures',
      description: 'Space-saving curved enclosures',
      features: ['8mm toughened glass', 'Sliding doors', 'Various sizes', 'Modern finish'],
      priceFrom: 445,
      image: '🛁',
    },
    {
      name: 'Bi-Fold Shower Doors',
      description: 'Space-efficient folding doors',
      features: ['6mm toughened glass', 'Smooth operation', 'Chrome finish', 'Standard sizes'],
      priceFrom: 325,
      image: '🚪',
    },
    {
      name: 'Wetroom Screens',
      description: 'Full-height glass panels for wet rooms',
      features: ['10mm toughened glass', 'Floor to ceiling', 'Minimal frame', 'Bespoke sizes'],
      priceFrom: 595,
      image: '💧',
    },
  ];

  const glassOptions = [
    { name: 'Clear Glass', description: 'Standard toughened glass' },
    { name: 'Frosted Glass', description: 'Privacy with light transmission' },
    { name: 'Patterned Glass', description: 'Decorative textured finishes' },
    { name: 'Tinted Glass', description: 'Grey or bronze tints' },
  ];

  const process = [
    { step: 1, title: 'Free Consultation', description: 'We visit to measure and discuss your requirements' },
    { step: 2, title: 'Design & Quote', description: 'CAD drawings and detailed quotation provided' },
    { step: 3, title: 'Manufacturing', description: 'Precision cutting and tempering in our facility' },
    { step: 4, title: 'Professional Install', description: 'Expert fitting by our qualified team' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90" />
        <div className="absolute inset-0 backdrop-blur-sm" />
        
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Shower Screens & Enclosures
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Bespoke toughened glass shower solutions for modern bathrooms
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-secondary">
                Free Design Consultation
              </Link>
              <Link href="/products" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                View Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shower Types */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shower Screen Options</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From walk-in wetrooms to space-saving enclosures
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {showerTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{type.image}</div>
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

      {/* Glass Options */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Glass Finishes Available</h2>
            <p className="text-xl text-gray-600">Choose the perfect glass for your bathroom style</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {glassOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl">
                  💎
                </div>
                <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                <p className="text-gray-600">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Shower Screens?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🛡️',
                title: 'Safety First',
                description: 'All glass is toughened to BS EN 12150 standards for maximum safety',
              },
              {
                icon: '💧',
                title: 'Easy Clean',
                description: 'Optional protective coating makes cleaning quick and effortless',
              },
              {
                icon: '📏',
                title: 'Made to Measure',
                description: 'Every screen custom-made to perfectly fit your bathroom',
              },
              {
                icon: '⚡',
                title: 'Fast Installation',
                description: '7-10 day lead time from measurement to installation',
              },
              {
                icon: '✨',
                title: 'Frameless Design',
                description: 'Modern minimal aesthetics with maximum light flow',
              },
              {
                icon: '✅',
                title: '10-Year Guarantee',
                description: 'Comprehensive warranty on all workmanship and materials',
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

      {/* Process Timeline */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Installation Process</h2>
            <p className="text-xl text-gray-600">From consultation to completion</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
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
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Bathroom?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free consultation and quote for your bespoke shower screen
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-secondary">
                Book Free Consultation
              </Link>
              <a href="tel:01708123456" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Call: 01708 123 456
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'What thickness glass do you recommend?',
                a: 'We recommend 8mm for standard shower screens and 10mm for walk-in wetroom panels for added stability.',
              },
              {
                q: 'How long does installation take?',
                a: 'Installation typically takes 2-4 hours depending on the complexity of the design.',
              },
              {
                q: 'Do you offer easy-clean coating?',
                a: 'Yes, we offer optional protective coating that repels water and soap scum for easier cleaning.',
              },
              {
                q: 'What is the lead time for custom screens?',
                a: 'From measurement to installation, expect 7-10 working days for standard designs.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <h3 className="text-xl font-bold mb-2 text-primary">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

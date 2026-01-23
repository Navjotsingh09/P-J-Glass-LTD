'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TradePage() {
  const tradeServices = [
    {
      icon: '🏗️',
      title: 'Builders & Contractors',
      description: 'Reliable glass supply for your construction projects',
      benefits: ['Bulk discounts', 'Flexible delivery', 'Trade account', 'Priority service'],
    },
    {
      icon: '🏠',
      title: 'Developers',
      description: 'Large-scale glass solutions for property developments',
      benefits: ['Project management', 'Volume pricing', 'Dedicated support', 'Fast turnaround'],
    },
    {
      icon: '🎨',
      title: 'Interior Designers',
      description: 'Bespoke glass for your design projects',
      benefits: ['Custom solutions', 'Design consultation', 'Sample service', 'Trade pricing'],
    },
    {
      icon: '🔧',
      title: 'Installers',
      description: 'Quality glass products for professional fitters',
      benefits: ['Trade prices', 'Technical support', 'Quick quotes', 'Reliable supply'],
    },
  ];

  const benefits = [
    {
      icon: '💰',
      title: 'Trade Discount',
      description: 'Competitive trade pricing with volume discounts',
    },
    {
      icon: '📋',
      title: 'Trade Account',
      description: 'Easy account setup with flexible payment terms',
    },
    {
      icon: '📞',
      title: 'Dedicated Support',
      description: 'Direct line to our trade team for fast quotes',
    },
    {
      icon: '🚛',
      title: 'Flexible Delivery',
      description: 'Scheduled deliveries to match your project timeline',
    },
    {
      icon: '📐',
      title: 'Technical Help',
      description: 'Expert advice on specifications and installation',
    },
    {
      icon: '⚡',
      title: 'Fast Turnaround',
      description: 'Priority production for trade customers',
    },
  ];

  const products = [
    { name: 'Glass Balustrades', description: 'All thicknesses and finishes' },
    { name: 'Splashbacks', description: 'Any color, printed or painted' },
    { name: 'Shower Screens', description: 'Frameless and framed systems' },
    { name: 'Mirrors', description: 'Any size and shape' },
    { name: 'Table Tops', description: 'Toughened glass surfaces' },
    { name: 'Glass Panels', description: 'Custom cut to size' },
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
              Trade Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premium glass products at trade prices for professionals
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-secondary text-lg">
                Open Trade Account
              </Link>
              <a href="tel:01708123456" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">
                Call Trade Line
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Who We Serve</h2>
            <p className="text-xl text-gray-600">Trusted by trade professionals across London and Essex</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tradeServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-sm text-left space-y-2">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trade Benefits</h2>
            <p className="text-xl text-gray-600">Why professionals choose P&J Glass</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{benefit.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Available */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trade Products</h2>
            <p className="text-xl text-gray-600">Complete range available at trade prices</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card text-center hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Opening a Trade Account</h2>
            <p className="text-xl text-gray-600">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: 1,
                title: 'Contact Us',
                description: 'Call our trade line or fill in the contact form with your business details',
              },
              {
                step: 2,
                title: 'Submit Documents',
                description: 'Provide business registration, insurance, and trade references',
              },
              {
                step: 3,
                title: 'Start Ordering',
                description: 'Account approved within 24 hours - start getting trade prices immediately',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary text-lg">
              Apply for Trade Account
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Trade Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Smith',
                company: 'Smith Building Services',
                text: 'P&J Glass are our go-to supplier. Reliable, professional, and always deliver on time.',
              },
              {
                name: 'Rachel Green',
                company: 'Green Interior Design',
                text: 'The trade team are fantastic. Great prices and the quality is consistently excellent.',
              },
              {
                name: 'Mike Johnson',
                company: 'Johnson Developments',
                text: 'We use P&J for all our developments. Their service is second to none.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex text-amber-400 text-xl mb-3">
                  ★★★★★
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-3">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
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
            <h2 className="text-4xl font-bold mb-4">Ready to Join Our Trade Network?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Start saving with trade prices today
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-secondary text-lg">
                Open Trade Account
              </Link>
              <a href="tel:01708123456" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">
                Call: 01708 123 456
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

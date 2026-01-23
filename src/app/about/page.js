'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We never compromise on quality. Every piece of glass is precision-cut and expertly installed.',
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'Honest quotes, transparent pricing, and straightforward communication every step of the way.',
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'Using the latest technology and techniques to deliver cutting-edge glass solutions.',
    },
    {
      icon: '💚',
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and recyclable materials throughout our operations.',
    },
  ];

  const certifications = [
    { name: 'FENSA Registered', icon: '✅' },
    { name: 'BS 6180:2011 Certified', icon: '✅' },
    { name: 'BS EN 12150 Compliant', icon: '✅' },
    { name: 'Public Liability Insured', icon: '✅' },
  ];

  const team = [
    {
      name: 'Paul Johnson',
      role: 'Co-Founder & Director',
      bio: '25 years of experience in architectural glass',
      icon: '👨‍💼',
    },
    {
      name: 'James Smith',
      role: 'Co-Founder & Technical Director',
      bio: 'Expert in glass fabrication and installation',
      icon: '👨‍🔧',
    },
    {
      name: 'Sarah Mitchell',
      role: 'Operations Manager',
      bio: 'Ensuring every project runs smoothly',
      icon: '👩‍💼',
    },
    {
      name: 'Mike Roberts',
      role: 'Lead Installer',
      bio: '15 years installing premium glass products',
      icon: '👷‍♂️',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90" />
        <div className="absolute inset-0 backdrop-blur-sm" />
        
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About P&J Glass
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transforming spaces with premium glass solutions since 2008
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 2008 by Paul Johnson and James Smith, P&J Glass Limited began as a small
                  workshop in Romford with a simple mission: deliver exceptional glass products with
                  unmatched customer service.
                </p>
                <p>
                  Over 15 years later, we've grown to become one of the leading glass fabricators in
                  Greater London and Essex, serving thousands of satisfied residential and commercial clients.
                </p>
                <p>
                  From our state-of-the-art 12,000 sq ft facility, we design, manufacture, and install
                  everything from glass balustrades and kitchen splashbacks to bespoke shower screens and
                  architectural glazing.
                </p>
                <p className="font-semibold text-primary">
                  Today, we're proud to combine traditional craftsmanship with modern technology, delivering
                  stunning glass solutions that stand the test of time.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center"
            >
              <span className="text-9xl">🏢</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The experts behind your perfect glass solutions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-7xl mb-4">{member.icon}</div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Certifications & Accreditations</h2>
            <p className="text-xl text-gray-600">Trusted, certified, and fully insured</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl mb-3">{cert.icon}</div>
                <p className="font-semibold">{cert.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '5,000+', label: 'Projects Completed' },
              { number: '98%', label: 'Customer Satisfaction' },
              { number: '24/7', label: 'Emergency Service' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-gray-600 text-lg">{stat.label}</p>
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
            <h2 className="text-4xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free consultation and quote for your glass project
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-secondary">
                Get Free Quote
              </Link>
              <Link href="/products" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                View Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

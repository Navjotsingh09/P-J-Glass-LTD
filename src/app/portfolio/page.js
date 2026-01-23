'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'balustrades', name: 'Balustrades' },
    { id: 'splashbacks', name: 'Splashbacks' },
    { id: 'showers', name: 'Shower Screens' },
    { id: 'commercial', name: 'Commercial' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Modern Glass Balustrade - Hampstead',
      category: 'balustrades',
      description: '17mm laminated glass balustrade with stainless steel posts',
      location: 'Hampstead, London',
      year: '2025',
      icon: '🪜',
    },
    {
      id: 2,
      title: 'Copper Marble Splashback - Chelsea',
      category: 'splashbacks',
      description: 'Custom printed copper marble splashback for luxury kitchen',
      location: 'Chelsea, London',
      year: '2025',
      icon: '🎨',
    },
    {
      id: 3,
      title: 'Walk-In Wetroom - Chigwell',
      category: 'showers',
      description: '10mm frameless walk-in shower screen with matt black fittings',
      location: 'Chigwell, Essex',
      year: '2025',
      icon: '🚿',
    },
    {
      id: 4,
      title: 'Commercial Office Glazing - Canary Wharf',
      category: 'commercial',
      description: 'Full-height glass partitions for modern office space',
      location: 'Canary Wharf, London',
      year: '2024',
      icon: '🏢',
    },
    {
      id: 5,
      title: 'Staircase Balustrade - Romford',
      category: 'balustrades',
      description: '13mm laminated glass with chrome handrail',
      location: 'Romford, Essex',
      year: '2024',
      icon: '🪜',
    },
    {
      id: 6,
      title: 'Sage Green Splashback - Stratford',
      category: 'splashbacks',
      description: 'Painted glass splashback in trendy sage green',
      location: 'Stratford, London',
      year: '2024',
      icon: '🎨',
    },
    {
      id: 7,
      title: 'Juliet Balcony - Brentwood',
      category: 'balustrades',
      description: '21mm laminated glass with top-mount fixings',
      location: 'Brentwood, Essex',
      year: '2024',
      icon: '🏛️',
    },
    {
      id: 8,
      title: 'Frameless Shower Enclosure - Ilford',
      category: 'showers',
      description: '8mm bi-fold door system with easy-clean coating',
      location: 'Ilford, Essex',
      year: '2024',
      icon: '🚿',
    },
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  const testimonials = [
    {
      name: 'Sarah Thompson',
      location: 'Hampstead',
      text: 'Absolutely thrilled with our new glass balustrade. The team was professional, the installation was seamless, and the result is stunning.',
      rating: 5,
      project: 'Glass Balustrade',
    },
    {
      name: 'Michael Chen',
      location: 'Chelsea',
      text: 'The copper marble splashback transformed our kitchen. Exactly what we wanted and installed perfectly. Highly recommend P&J Glass!',
      rating: 5,
      project: 'Kitchen Splashback',
    },
    {
      name: 'Emma Wilson',
      location: 'Chigwell',
      text: 'From quote to completion, the service was excellent. Our wetroom looks incredible with the frameless glass screen.',
      rating: 5,
      project: 'Shower Screen',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90" />
        
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Showcasing our finest glass installations across London and Essex
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '500+', label: 'Projects This Year' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '15+', label: 'Years Experience' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedFilter === cat.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <p className="text-center mt-4 text-gray-600">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:shadow-2xl transition-all duration-300"
              >
                {/* Project Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg overflow-hidden mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl">{project.icon}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary">
                    {project.year}
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-2">📍</span>
                  {project.location}
                </div>
                <Link href="/contact" className="btn-primary w-full text-center">
                  Start Your Project
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real feedback from real projects</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                {/* Star Rating */}
                <div className="flex text-amber-400 text-2xl mb-4">
                  {'★'.repeat(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="border-t pt-4">
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-sm text-primary mt-1">{testimonial.project}</p>
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
            <h2 className="text-4xl font-bold mb-4">Your Project Could Be Next</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free consultation and quote for your glass project
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-secondary">
                Start Your Project
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

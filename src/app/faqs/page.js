'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'What areas do you serve?',
          answer: 'We serve Romford, Essex, and all of Greater London. We also take on select projects in surrounding areas. Contact us to check if we serve your location.'
        },
        {
          question: 'Do you offer free quotes?',
          answer: 'Yes! We provide free, no-obligation quotes for all our services. We can provide estimates over the phone or arrange a site visit for more complex projects.'
        },
        {
          question: 'How long does installation take?',
          answer: 'Installation times vary by project. Most balustrade installations take 1-2 days, splashbacks take 2-4 hours, and shower screens typically take 3-5 hours. We\'ll provide a detailed timeline with your quote.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept bank transfers, credit/debit cards, and cheques. For larger projects, we typically require a 50% deposit with the balance due upon completion.'
        },
      ],
    },
    {
      category: 'Glass Balustrades',
      questions: [
        {
          question: 'Is toughened glass safe for balustrades?',
          answer: 'Absolutely! Toughened glass is 5x stronger than regular glass and meets all UK building regulations (BS 6180:2011). If broken, it shatters into small, blunt pieces rather than dangerous shards. For extra safety, we also offer laminated options.'
        },
        {
          question: 'What thickness glass do I need?',
          answer: 'It depends on the height and application. For most residential balustrades, 10-13mm is suitable. For commercial or taller installations, we recommend 15-21mm. Our experts will advise on the best option for your project.'
        },
        {
          question: 'Can glass balustrades be used outdoors?',
          answer: 'Yes! Our toughened and laminated glass is perfect for outdoor use. It\'s weather-resistant, won\'t rust like metal, and maintains its clarity for years. We use marine-grade stainless steel fixings for maximum durability.'
        },
        {
          question: 'Do you install Juliet balconies?',
          answer: 'Yes, we supply and install complete Juliet balcony systems with toughened or laminated glass panels and all necessary fixings and certification.'
        },
      ],
    },
    {
      category: 'Kitchen Splashbacks',
      questions: [
        {
          question: 'Can I match any color?',
          answer: 'Yes! We can color-match to RAL, Pantone, Dulux, and most other color systems. Bring us a sample or color code, and we\'ll match it perfectly.'
        },
        {
          question: 'How heat-resistant are glass splashbacks?',
          answer: 'Our toughened glass splashbacks are heat-resistant up to 400°C, making them safe for use behind gas and electric hobs. They won\'t discolor, warp, or crack from heat.'
        },
        {
          question: 'Are glass splashbacks easy to clean?',
          answer: 'Very easy! Glass splashbacks are non-porous, so they don\'t harbor bacteria or stain. Simply wipe with a damp cloth and glass cleaner. No grout lines means no scrubbing!'
        },
        {
          question: 'Can you install around plug sockets?',
          answer: 'Yes, we cut precise holes and notches for all sockets, switches, and fixtures. Everything is measured on-site to ensure a perfect fit.'
        },
      ],
    },
    {
      category: 'Shower Screens',
      questions: [
        {
          question: 'What\'s the difference between 8mm and 10mm glass?',
          answer: '10mm glass is thicker and heavier, providing a more premium feel and better stability. 8mm is perfectly adequate for most residential showers. We recommend 10mm for larger enclosures or walk-in screens.'
        },
        {
          question: 'Do you offer easy-clean coating?',
          answer: 'Yes! Our EnduroShield protective coating makes cleaning easier and prevents water spots and soap scum buildup. We highly recommend it for all shower glass.'
        },
        {
          question: 'Can you work with existing tiles?',
          answer: 'Absolutely. We can install shower screens to complement your existing bathroom design. We take careful measurements to ensure a perfect fit.'
        },
        {
          question: 'What about warranties?',
          answer: 'We offer a 2-year installation warranty and our glass comes with manufacturer guarantees. Hardware typically has a 5-year warranty depending on the brand.'
        },
      ],
    },
    {
      category: 'Installation & Maintenance',
      questions: [
        {
          question: 'Do I need to prepare anything before installation?',
          answer: 'We\'ll provide specific instructions with your booking. Generally, we need clear access to the work area and a power supply. For splashbacks, walls should be flat and painted/tiled.'
        },
        {
          question: 'Will you protect my property during installation?',
          answer: 'Yes! We use dust sheets, floor protection, and take great care to leave your property clean and tidy. We also remove all waste and packaging.'
        },
        {
          question: 'How do I clean glass balustrades?',
          answer: 'Use warm soapy water or standard glass cleaner with a soft cloth or squeegee. For stubborn marks, a solution of white vinegar and water works well. Avoid abrasive cleaners.'
        },
        {
          question: 'What if the glass gets damaged?',
          answer: 'Toughened glass is very durable, but if damage occurs, panels can usually be replaced individually without replacing the entire installation. Contact us for a replacement quote.'
        },
      ],
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about our glass products and services
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-neutral-dark">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const globalIndex = `${categoryIndex}-${index}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-light/50 transition-colors"
                      >
                        <span className="font-semibold text-lg text-neutral-dark pr-8">
                          {faq.question}
                        </span>
                        <svg
                          className={`w-6 h-6 text-primary transition-transform flex-shrink-0 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 py-4 bg-neutral-light/30 border-t border-neutral-light"
                        >
                          <p className="text-neutral-grey leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-neutral-light">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-neutral-grey mb-8">
            Can't find the answer you're looking for? Our friendly team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link href="tel:01708123456" className="btn-secondary">
              Call: 01708 123 456
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Our Services</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Glass Balustrades', href: '/services/balustrades', icon: '🪜' },
              { name: 'Kitchen Splashbacks', href: '/services/splashbacks', icon: '🎨' },
              { name: 'Shower Screens', href: '/showers', icon: '🚿' },
              { name: 'View Portfolio', href: '/portfolio', icon: '📸' },
            ].map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="card text-center hover:shadow-xl transition-shadow group"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

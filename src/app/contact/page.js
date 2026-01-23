'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your actual form endpoint (Formspree, etc.)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      title: 'Phone',
      details: ['01708 123 456', 'Mon-Fri: 8am-6pm', 'Sat: 9am-4pm'],
      action: 'tel:01708123456',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      title: 'Email',
      details: ['info@pjglass.co.uk', 'Quick response', 'within 24 hours'],
      action: 'mailto:info@pjglass.co.uk',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Visit Us',
      details: ['Unit 5, Romford Industrial Estate', 'Romford, Essex RM1 2XX', 'By appointment'],
      action: 'https://maps.google.com/?q=Unit+5+Romford+Industrial+Estate',
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center bg-gradient-to-r from-secondary to-primary">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)',
          }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-white/90">
              Ready to start your project? We're here to help with expert advice and free quotes.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-neutral-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.action}
                target={info.action.startsWith('http') ? '_blank' : undefined}
                rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="card text-center hover:shadow-card-hover transition-all group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className={idx === 0 ? 'text-primary font-semibold' : 'text-neutral-grey text-sm'}>
                    {detail}
                  </p>
                ))}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-h2 font-bold mb-4">Send Us a Message</h2>
              <p className="text-neutral-grey mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed response.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="01708 123456"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select a service...</option>
                    <option value="balustrades">Glass Balustrades</option>
                    <option value="splashbacks">Kitchen Splashbacks</option>
                    <option value="showers">Shower Screens</option>
                    <option value="mirrors">Mirrors & Glazing</option>
                    <option value="trade">Trade Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field"
                    placeholder="Tell us about your project, including dimensions if known..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-success/10 border border-success text-success rounded-card">
                    <p className="font-medium">✓ Message sent successfully!</p>
                    <p className="text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-error/10 border border-error text-error rounded-card">
                    <p className="font-medium">× Something went wrong</p>
                    <p className="text-sm">Please try again or call us directly.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-sm text-neutral-grey text-center">
                  By submitting this form, you agree to our privacy policy.
                </p>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Choose P&J Glass?</h3>
                <ul className="space-y-4">
                  {[
                    'Free consultation & site survey',
                    'Detailed 3D designs before you commit',
                    'Transparent pricing with no hidden costs',
                    'Expert installation by certified fitters',
                    '10-year comprehensive warranty',
                    'Full insurance & building regulations compliance',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-success flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-grey">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card bg-primary text-white">
                <h3 className="text-2xl font-bold mb-4">Emergency Service</h3>
                <p className="mb-4">
                  Need urgent glass repair or replacement? We offer same-day emergency callouts for broken glass.
                </p>
                <a href="tel:07700900123" className="btn-primary bg-white text-primary hover:bg-neutral-light inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Emergency: 07700 900 123
                </a>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Our Service Areas</h3>
                <p className="text-neutral-grey mb-4">
                  We serve Romford and the surrounding areas including:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-neutral-grey">
                  {['Romford', 'Hornchurch', 'Upminster', 'Dagenham', 'Barking', 'Ilford', 'Woodford', 'Chigwell', 'Brentwood', 'Basildon', 'Chelmsford', 'Grays'].map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-neutral-light">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.123456789!2d0.1807!3d51.5750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDM0JzMwLjAiTiAwwrAxMCc1MC41IkU!5e0!3m2!1sen!2suk!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="P&J Glass Location"
        />
      </section>
    </main>
  );
}

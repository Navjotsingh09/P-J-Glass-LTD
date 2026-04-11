import Link from 'next/link';

export const metadata = {
  title: 'Glass Balustrades | Frameless Glass Railings in Romford',
  description: 'Premium glass balustrades for stairs, balconies & terraces. Frameless & semi-frameless options. Expert design & installation. Free quote in Romford & London.',
};

export default function BalustradesPage() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Building Regulations Compliant',
      description: 'All installations meet UK building regulations for safety and structural integrity',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Custom Design Service',
      description: 'Tailored solutions to match your exact specifications and aesthetic preferences',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Fast Installation',
      description: 'Professional installation typically completed within 1-2 days',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '10-Year Guarantee',
      description: 'Comprehensive warranty on all materials and workmanship',
    },
  ];

  const balustradeSystems = [
    {
      name: 'Frameless Glass',
      description: 'Minimalist design with no visible posts. Glass panels fixed directly to structure.',
      price: 'From £450/m',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&auto=format&fit=crop&q=80',
      features: ['10-17.5mm toughened glass', 'Structural glazing', 'Ultra-modern aesthetic', 'Maximum light flow'],
    },
    {
      name: 'Semi-Frameless',
      description: 'Elegant balance of glass panels with discrete stainless steel posts.',
      price: 'From £350/m',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80',
      features: ['10-12mm toughened glass', 'Stainless steel posts', 'Versatile design', 'Cost-effective'],
    },
    {
      name: 'Juliet Balconies',
      description: 'Space-saving solution for French doors with full glass protection.',
      price: 'From £850/unit',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&auto=format&fit=crop&q=80',
      features: ['Made-to-measure', 'Easy installation', 'No floor space required', 'Building regs approved'],
    },
  ];

  const applications = [
    'Internal Staircases',
    'External Balconies',
    'Mezzanine Floors',
    'Terraces & Decking',
    'Pool Fencing',
    'Juliet Balconies',
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&auto=format&fit=crop&q=80"
            alt="Glass Balustrade Installation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 to-brand-navy/40" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Glass Balustrades
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Transform your space with sleek, modern glass balustrades. 
              Frameless and semi-frameless systems for stairs, balconies, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-lg">
                Get Free Quote
              </Link>
              <Link href="/store" className="btn-outline text-white border-white hover:bg-white hover:text-neutral-dark text-lg">
                Design Online →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-section bg-neutral-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-neutral-grey text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Balustrade Systems */}
      <section className="py-section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-h2 font-bold mb-4">Balustrade Systems</h2>
            <p className="text-lg text-neutral-grey">
              Choose from our range of premium glass balustrade systems, each designed 
              to deliver safety, style, and durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {balustradeSystems.map((system, index) => (
              <div key={index} className="card group hover:shadow-card-hover transition-all">
                <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                  <img
                    src={system.image}
                    alt={system.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{system.name}</h3>
                <p className="text-primary font-bold text-xl mb-3">{system.price}</p>
                <p className="text-neutral-grey mb-4">{system.description}</p>
                <ul className="space-y-2 mb-6">
                  {system.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-secondary w-full text-center">
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-section bg-neutral-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-bold text-center mb-12">Perfect For...</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {applications.map((app, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-card shadow-card text-center hover:shadow-card-hover transition-shadow"
                >
                  <svg className="w-12 h-12 mx-auto mb-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-semibold">{app}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-section">
        <div className="container-custom">
          <h2 className="text-h2 font-bold text-center mb-16">Our Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Free Consultation & Measure',
                  description: 'We visit your site to take precise measurements and discuss your requirements.',
                },
                {
                  step: '02',
                  title: 'Custom Design & Quote',
                  description: 'Receive detailed 3D designs and transparent pricing within 48 hours.',
                },
                {
                  step: '03',
                  title: 'Precision Fabrication',
                  description: 'Your balustrade is manufactured to exact specifications in our UK workshop.',
                },
                {
                  step: '04',
                  title: 'Professional Installation',
                  description: 'Expert fitters install your balustrade with minimal disruption, typically in 1-2 days.',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-neutral-grey">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-h2 font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a free consultation and quote for your glass balustrade project. 
            No obligation, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-primary hover:bg-neutral-light">
              Request Free Quote
            </Link>
            <Link href="tel:01708123456" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              Call: 01708 123 456
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

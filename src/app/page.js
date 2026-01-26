import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'P&J Glass - Premium Glass Solutions | Start Your Project Today',
  description: 'Transform your space with custom glass balustrades, splashbacks, shower screens & mirrors. Expert installation. Free consultation. London & Essex.',
};

export default function HomePage() {
  // Structured data for homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'P&J Glass',
    image: 'https://pjglass.co.uk/images/logo.svg',
    '@id': 'https://pjglass.co.uk',
    url: 'https://pjglass.co.uk',
    telephone: '+441708123456',
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 5, Romford Industrial Estate',
      addressLocality: 'Romford',
      addressRegion: 'Essex',
      postalCode: 'RM1 2XX',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.5779,
      longitude: 0.1821,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  };
  
  return (
    <main className="overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* HERO SECTION - Mobile First, Shopify-inspired */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                Trusted by 2,500+ Customers Across London & Essex
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-none">
                Premium Glass,
                <span className="block text-blue-600 mt-2">Beautifully Crafted</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transform your space with custom glass balustrades, splashbacks, shower screens & mirrors. Expert installation, lifetime quality.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link 
                  href="/contact" 
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5"
                >
                  Start Free Consultation
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/products" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-gray-300"
                >
                  Browse Products
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-8 pt-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Free UK Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">10-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Expert Installation</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl order-first lg:order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop"
                alt="Modern Glass Balustrade Installation"
                className="w-full h-full object-cover"
              />
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6 z-20 grid grid-cols-3 gap-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">2,500+</div>
                  <div className="text-xs text-gray-600 mt-1">Projects</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">4.9★</div>
                  <div className="text-xs text-gray-600 mt-1">Rating</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">15+</div>
                  <div className="text-xs text-gray-600 mt-1">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY SECTION */}
      <section className="py-12 md:py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-wide">Trusted by leading architects, builders, and homeowners</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-40">
            <div className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight">ARCHITECH</div>
            <div className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight">BUILDCO</div>
            <div className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight">HOMEPLUS</div>
            <div className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight">LUXEHOME</div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Our Premium Glass Solutions
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: 'Glass Balustrades',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus.',
                icon: '🪜',
                image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&auto=format&fit=crop',
                href: '/services/balustrades',
                price: 'From £44'
              },
              {
                title: 'Kitchen Splashbacks',
                desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                icon: '🎨',
                image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&auto=format&fit=crop',
                href: '/services/splashbacks',
                price: 'From £66'
              },
              {
                title: 'Shower Screens',
                desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
                icon: '🚿',
                image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format&fit=crop',
                href: '/showers',
                price: 'From £280'
              },
              {
                title: 'Mirrors & Glass',
                desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
                icon: '🪞',
                image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop',
                href: '/services/mirrors',
                price: 'From £95'
              },
            ].map((service, index) => (
              <Link 
                key={index}
                href={service.href}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    {service.icon}
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">{service.price}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT SHOWCASE */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <div className="space-y-4">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop"
                  alt="Luxury Kitchen Installation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&auto=format&fit=crop"
                    alt="Glass Detail 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop"
                    alt="Glass Detail 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Featured Project
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                Award-Winning Glass Installations
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Premium Materials', desc: 'Lorem ipsum dolor sit amet consectetur' },
                  { label: 'Expert Craftsmanship', desc: 'Sed do eiusmod tempor incididunt ut labore' },
                  { label: 'Lifetime Warranty', desc: 'Et dolore magna aliqua ut enim ad minim' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.label}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link 
                href="/portfolio"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group"
              >
                View Our Portfolio
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                name: 'Sarah Thompson', 
                location: 'Hampstead, London', 
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Absolutely stunning balustrade installation. The quality exceeded our expectations and the team was professional from start to finish.',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop'
              },
              { 
                name: 'James Wilson', 
                location: 'Chelsea, London', 
                text: 'Ut enim ad minim veniam, quis nostrud exercitation. The splashback transformed our kitchen completely. Quality is exceptional and the installation was seamless and efficient.',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop'
              },
              { 
                name: 'Emma Davies', 
                location: 'Chigwell, Essex', 
                text: 'Duis aute irure dolor in reprehenderit in voluptate. Beautiful wetroom installation and couldn\'t be happier with the results. Great value for the quality provided.',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop'
              },
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all p-6 md:p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Get a free consultation and personalized quote within 24 hours. Our experts are ready to help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1"
            >
              Get Free Quote
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a 
              href="tel:01708123456" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call: 01708 123 456
            </a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '2,500+', label: 'Projects Completed' },
              { number: '15+', label: 'Years Experience' },
              { number: '4.9/5', label: 'Customer Rating' },
              { number: '100%', label: 'Quality Guarantee' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

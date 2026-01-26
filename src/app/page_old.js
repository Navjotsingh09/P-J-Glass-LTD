import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'P&J Glass - Premium Glass Solutions | Start Your Project Today',
  description: 'Transform your space with custom glass balustrades, splashbacks, shower screens & mirrors. Expert installation. Free consultation. London & Essex. Start your free trial today.',
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
      
      {/* HERO SECTION - Mobile First */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                ⭐ Over 2,500 Happy Customers
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Premium Glass Solutions for Your Home
              </h1>
              <p className="text-xl mb-6 text-white/90">
                Balustrades, Splashbacks, Shower Screens & More
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all inline-flex items-center gap-2">
                  Shop Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">
                  Free Quote
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-lg">Free Nationwide Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-lg">Expert Installation Available</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-lg">24hr Quote Turnaround</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="container-custom mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/services/balustrades" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-center">
            <div className="text-5xl mb-3">🪜</div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Balustrades</h3>
            <p className="text-sm text-neutral-grey">From £44.34</p>
          </Link>
          <Link href="/services/splashbacks" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-center">
            <div className="text-5xl mb-3">🎨</div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Splashbacks</h3>
            <p className="text-sm text-neutral-grey">From £66.60</p>
          </Link>
          <Link href="/showers" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-center">
            <div className="text-5xl mb-3">🚿</div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Shower Screens</h3>
            <p className="text-sm text-neutral-grey">From £280</p>
          </Link>
          <Link href="/services/mirrors" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-center">
            <div className="text-5xl mb-3">🪞</div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Mirrors</h3>
            <p className="text-sm text-neutral-grey">From £95</p>
          </Link>
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="bg-success text-white py-4 mb-8">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4 flex-wrap text-center">
            <span className="font-bold text-lg">🎉 Limited Time Offer:</span>
            <span>10% OFF on all Kitchen Splashbacks</span>
            <Link href="/services/splashbacks" className="bg-white text-success px-4 py-1 rounded-full font-semibold hover:bg-white/90 transition-colors">
              Shop Now →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-custom mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-neutral-grey">Handpicked premium glass solutions</p>
          </div>
          <Link href="/products" className="text-primary font-semibold hover:underline flex items-center gap-2">
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all group">
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-xl flex items-center justify-center overflow-hidden">
                <div className="text-6xl">{
                  product.category === 'balustrades' ? '🪜' :
                  product.category === 'splashbacks' ? '🎨' :
                  product.category === 'mirrors' ? '🪞' : '✨'
                }</div>
                {product.popular && (
                  <span className="absolute top-3 left-3 bg-secondary text-white text-xs px-3 py-1 rounded-full font-semibold">
                    POPULAR
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-primary">{product.priceDisplay}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-neutral-grey ml-2">(128)</span>
                </div>
                <Link href="/products" className="block w-full bg-primary text-white py-2 rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container-custom mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Best Sellers</h2>
            <p className="text-neutral-grey">Most popular products this month</p>
          </div>
          <Link href="/products" className="text-primary font-semibold hover:underline">See All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredProducts.slice(4, 10).map((product, index) => (
            <Link key={product.id} href="/products" className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-4 group">
              <div className="relative h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <div className="text-4xl">{
                  product.category === 'balustrades' ? '🪜' :
                  product.category === 'splashbacks' ? '🎨' :
                  product.category === 'mirrors' ? '🪞' : '✨'
                }</div>
              </div>
              <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="font-bold text-primary">{product.priceDisplay.split('-')[0]}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="bg-neutral-light/50 py-12 mb-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/services/balustrades" className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-white overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 text-9xl opacity-10">🪜</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Glass Balustrades</h3>
                <p className="mb-4 text-white/90">Modern designs from £44.34</p>
                <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                  Shop Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
            <Link href="/services/splashbacks" className="relative bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-8 text-white overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 text-9xl opacity-10">🎨</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Kitchen Splashbacks</h3>
                <p className="mb-4 text-white/90">Any color from £66.60</p>
                <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                  Shop Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
            <Link href="/showers" className="relative bg-gradient-to-br from-success to-success/80 rounded-2xl p-8 text-white overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 text-9xl opacity-10">🚿</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Shower Screens</h3>
                <p className="mb-4 text-white/90">Custom designs from £280</p>
                <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                  Shop Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="container-custom mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Sarah Thompson', location: 'Hampstead', text: 'Absolutely stunning balustrade. Professional from start to finish! The quality exceeded our expectations.', rating: 5 },
            { name: 'James Wilson', location: 'Chelsea', text: 'The splashback transformed our kitchen. Quality is exceptional and installation was seamless.', rating: 5 },
            { name: 'Emma Davies', location: 'Chigwell', text: 'Beautiful wetroom installation. Couldn\'t be happier! Great value for money.', rating: 5 },
          ].map((review, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-grey mb-4">"{review.text}"</p>
              <div className="font-semibold">{review.name}</div>
              <div className="text-sm text-neutral-grey">{review.location}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 mb-12">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need Help Choosing the Right Glass Solution?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Our experts are ready to help. Get a free consultation and personalized quote within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-white/90 transition-all inline-flex items-center justify-center gap-2">
              Get Free Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a href="tel:01708123456" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition-all inline-flex items-center justify-center gap-2">
              📞 Call: 01708 123 456
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
function ProcessStep({ step, index }) {
  return (
    <div className="text-center animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="w-16 h-16 bg-success text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        {index + 1}
      </div>
      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
      <p className="text-neutral-grey">{step.description}</p>
    </div>
  );
}

// Data
const services = [
  {
    name: 'Glass Balustrades',
    icon: '🪜',
    description: 'Architectural glass balustrades for stairs, balconies, and terraces. Frameless elegance meets structural strength.',
    href: '/services/balustrades',
    cta: 'Explore Designs',
  },
  {
    name: 'Kitchen Splashbacks',
    icon: '🎨',
    description: 'Any color, any size. Heat-resistant toughened glass up to 400°C. Endless RAL color matching.',
    href: '/services/splashbacks',
    cta: 'View Colors',
  },
  {
    name: 'Shower Screens',
    icon: '🚿',
    description: 'Made-to-measure shower screens and wet room panels. Seamless glass, precision hinges, watertight installation.',
    href: '/services/showers',
    cta: 'Get Quote',
  },
  {
    name: 'Mirrors & Glazing',
    icon: '🪞',
    description: 'Custom-cut mirrors, textured glass, and double glazing units. Commercial and residential solutions.',
    href: '/services/mirrors',
    cta: 'Learn More',
  },
];

const process = [
  {
    title: 'Design Consultation',
    description: 'Free consultation to understand your vision. Measurements, material selection, and design mockups.',
  },
  {
    title: 'Precision Fabrication',
    description: 'Cut to size in our Romford workshop using precision equipment and premium Pilkington glass.',
  },
  {
    title: 'Expert Installation',
    description: 'Professional fitting by experienced installers. Clean, efficient, on-time service.',
  },
  {
    title: 'Quality Assurance',
    description: 'Final inspection, cleanup, and walkthrough. Full warranty on materials and workmanship.',
  },
];

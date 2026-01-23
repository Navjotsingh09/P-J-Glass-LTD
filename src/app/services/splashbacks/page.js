import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Kitchen Splashbacks | Coloured Glass Splashbacks in Romford',
  description: 'Custom coloured glass kitchen splashbacks. 200+ RAL colours, made-to-measure. Heat-resistant, easy-clean surface. Free design service & quote.',
};

export default function SplashbacksPage() {
  const benefits = [
    'Heat & water resistant up to 150°C',
    'Easy to clean - just wipe with cloth',
    'Hygienic - no grout lines for bacteria',
    'Endless colour options (RAL/Pantone)',
    'Made-to-measure for perfect fit',
    'Can include plug sockets & fixtures',
  ];

  const colours = [
    { name: 'Pure White', code: 'RAL 9010', hex: '#FFFFFF' },
    { name: 'Anthracite Grey', code: 'RAL 7016', hex: '#293133' },
    { name: 'Sage Green', code: 'RAL 6019', hex: '#BDECB6' },
    { name: 'Navy Blue', code: 'RAL 5013', hex: '#1E2460' },
    { name: 'Terracotta', code: 'RAL 3012', hex: '#C1876B' },
    { name: 'Blush Pink', code: 'RAL 3015', hex: '#EA899A' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/splashbacks-hero.jpg"
            alt="Glass Kitchen Splashbacks"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Kitchen Splashbacks
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Transform your kitchen with beautiful coloured glass splashbacks. 
              Choose from 200+ colours or match to any sample.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-lg">
                Get Free Quote
              </Link>
              <Link href="/store" className="btn-outline text-white border-white hover:bg-white hover:text-neutral-dark text-lg">
                Colour Selector Tool →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-section bg-neutral-light">
        <div className="container-custom">
          <h2 className="text-h2 font-bold text-center mb-12">Why Glass Splashbacks?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <svg className="w-6 h-6 text-success flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-grey">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Colours */}
      <section className="py-section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h2 font-bold mb-4">Popular Colours</h2>
            <p className="text-lg text-neutral-grey">
              These are just a few favourites. We can match any RAL, Pantone, or custom colour.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {colours.map((colour, index) => (
              <div key={index} className="group cursor-pointer">
                <div 
                  className="aspect-square rounded-card shadow-card group-hover:shadow-card-hover transition-shadow mb-3"
                  style={{ backgroundColor: colour.hex }}
                />
                <h3 className="font-semibold text-sm mb-1">{colour.name}</h3>
                <p className="text-xs text-neutral-grey">{colour.code}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/store" className="btn-primary">
              Explore Full Colour Range (200+)
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-section bg-neutral-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-bold text-center mb-12">Pricing Guide</h2>
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">£350</div>
                  <p className="text-neutral-grey mb-4">per m² (supplied)</p>
                  <ul className="text-sm text-left space-y-2 text-neutral-grey">
                    <li>✓ 6mm toughened glass</li>
                    <li>✓ Any RAL colour</li>
                    <li>✓ Cut-outs for sockets</li>
                    <li>✓ Polished edges</li>
                  </ul>
                </div>
                <div className="text-center border-l border-r border-neutral-light/50 md:px-8">
                  <div className="text-4xl font-bold text-success mb-2">£550</div>
                  <p className="text-neutral-grey mb-4">per m² (fitted)</p>
                  <ul className="text-sm text-left space-y-2 text-neutral-grey">
                    <li>✓ Everything in 'supplied'</li>
                    <li>✓ Professional installation</li>
                    <li>✓ Adhesive & materials</li>
                    <li>✓ 10-year warranty</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-neutral-dark mb-2">FREE</div>
                  <p className="text-neutral-grey mb-4">with every order</p>
                  <ul className="text-sm text-left space-y-2 text-neutral-grey">
                    <li>✓ Home consultation</li>
                    <li>✓ Colour samples</li>
                    <li>✓ 3D design mockup</li>
                    <li>✓ Precise measuring</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 p-4 bg-primary/10 rounded-card text-center">
                <p className="text-sm text-neutral-grey">
                  <strong>Average kitchen splashback:</strong> 3-4m² = £1,650-£2,200 fully installed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-section">
        <div className="container-custom">
          <h2 className="text-h2 font-bold text-center mb-16">Simple 4-Step Process</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Choose Colour', desc: 'Browse our range or bring a sample' },
              { step: 2, title: 'We Measure', desc: 'Free home visit for accurate dimensions' },
              { step: 3, title: 'We Make', desc: '5-7 days fabrication in our workshop' },
              { step: 4, title: 'We Fit', desc: 'Expert installation in just 2-3 hours' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-grey">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-h2 font-bold mb-4">Ready for Your Dream Kitchen?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a free quote and colour samples delivered to your door.
          </p>
          <Link href="/contact" className="btn-primary bg-white text-secondary hover:bg-neutral-light">
            Get Free Quote & Samples
          </Link>
        </div>
      </section>
    </main>
  );
}

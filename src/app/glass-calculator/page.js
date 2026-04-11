import Link from 'next/link';

export const metadata = {
  title: 'Glass Price Calculator',
  description: 'Get an instant quote for custom cut glass. Choose glass type, shape, dimensions, thickness, edge finishes & more with our easy-to-use glass price calculator.',
  openGraph: {
    title: 'Glass Price Calculator | P&J Glass',
    description: 'Get an instant quote for custom cut glass with our easy-to-use price calculator.',
  },
};

export default function GlassCalculatorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="section-label text-brand-accent mb-4">Instant Quote</p>
          <h1 className="text-display-xl text-white mb-6">Glass Price Calculator</h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Get an instant price for custom cut glass. Select your glass type, shape,
            dimensions, thickness, edge finishes and more — delivered straight to your door.
          </p>
        </div>
      </section>

      {/* Calculator Embed */}
      <section className="bg-white py-12 md:py-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="border border-brand-silver rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://glasswarehouse.co.uk/glass-calculator/index.php/index.php?iniframe="
              title="Glass Price Calculator"
              className="w-full border-0"
              style={{ minHeight: '900px', height: '100vh', maxHeight: '1200px' }}
              loading="lazy"
              allow="payment"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-brand-offwhite py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-sm text-brand-navy mb-12 text-center">How to Use the Calculator</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose Glass Type', desc: 'Clear, low-iron, tinted, frosted, painted or printed glass' },
              { step: '02', title: 'Set Dimensions', desc: 'Enter width, length/height and select shape (rectangle, circle, etc.)' },
              { step: '03', title: 'Pick Finishes', desc: 'Polished edges, sandblasted, bevelled, radius corners, drill holes' },
              { step: '04', title: 'Get Your Price', desc: 'Instant price shown — add to cart or request delivery to your door' },
            ].map((item, i) => (
              <div key={i} className="border-t border-brand-silver pt-6">
                <span className="text-brand-accent text-sm tracking-wide">{item.step}</span>
                <h3 className="text-brand-navy text-lg mt-3 mb-2">{item.title}</h3>
                <p className="text-brand-grey text-sm font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-sm text-brand-navy mb-6">Need Help With Your Quote?</h2>
          <p className="text-brand-grey text-lg font-light mb-10">
            Our glass specialists are ready to assist. Call us or visit our showroom for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:02085991622" className="btn-fluid btn-filled text-center">
              Call 020 8599 1622
            </a>
            <a
              href="https://wa.me/442085991622?text=Hi%2C%20I%20need%20help%20with%20a%20glass%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fluid btn-outline-fluid text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

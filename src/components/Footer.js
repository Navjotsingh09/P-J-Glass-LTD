'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black border-t border-white/10">
      {/* CTA Section */}
      <section className="py-section px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            <div>
              <h2 className="text-display-lg text-brand-white mb-6">
                Where Vision<br />Meets Execution
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link href="/contact" className="btn-filled">
                Get in Touch
              </Link>
              <Link href="/contact" className="btn-outline-fluid">
                Visit Showroom
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider mx-6 md:mx-10 lg:mx-16" />

      {/* Footer Bottom */}
      <div className="px-6 md:px-10 lg:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Logo & Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <span className="text-brand-white text-lg tracking-[0.2em] font-light uppercase">
                  P&J Glass
                </span>
              </Link>
              <p className="text-brand-grey text-sm leading-relaxed">
                Premium glazing solutions for ambitious architectural projects.
                Every pane reflects our commitment to clarity, quality, and collaboration.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-brand-grey hover:text-brand-white text-sm transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-brand-grey hover:text-brand-white text-sm transition-colors">
                    Collection
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-brand-grey hover:text-brand-white text-sm transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-brand-grey hover:text-brand-white text-sm transition-colors">
                    Showroom
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-brand-grey hover:text-brand-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <ul className="space-y-3 text-sm text-brand-grey">
                <li>
                  <a href="tel:01708123456" className="hover:text-brand-white transition-colors">
                    01708 123 456
                  </a>
                </li>
                <li>
                  <a href="mailto:info@pjglass.co.uk" className="hover:text-brand-white transition-colors">
                    info@pjglass.co.uk
                  </a>
                </li>
                <li className="leading-relaxed">
                  Unit 5, Romford Industrial Estate<br />
                  Romford, Essex RM1 2XX, UK
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://instagram.com/pjglass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-grey hover:text-brand-white text-sm transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/@pjglass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-grey hover:text-brand-white text-sm transition-colors"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/pjglass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-grey hover:text-brand-white text-sm transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/pjglass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-grey hover:text-brand-white text-sm transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-grey text-xs">
              &copy;{currentYear}, P&J Glass
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-brand-grey hover:text-brand-white text-xs transition-colors">
                Privacy policy
              </Link>
              <Link href="/terms-conditions" className="text-brand-grey hover:text-brand-white text-xs transition-colors">
                Terms &amp; conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

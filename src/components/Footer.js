'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy border-t border-brand-silver">
      {/* CTA Section */}
      <section className="py-section px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            <div>
              <h2 className="text-display-lg text-white mb-6">
                Where Vision<br />Meets Execution
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link href="/contact" className="btn-filled">
                Get in Touch
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-white/40 text-white text-[0.75rem] tracking-[0.15em] uppercase font-medium transition-all duration-400 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-navy">
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
                <Image
                  src="/images/logo-white.svg"
                  alt="P&J Glass"
                  width={180}
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-white/60 text-sm leading-relaxed">
                Premium glazing solutions for ambitious architectural projects.
                Every pane reflects our commitment to clarity, quality, and collaboration.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-white/60 hover:text-white text-sm transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-white/60 hover:text-white text-sm transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/accessories" className="text-white/60 hover:text-white text-sm transition-colors">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/glass-calculator" className="text-white/60 hover:text-white text-sm transition-colors">
                    Price Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-white/60 hover:text-white text-sm transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <ul className="space-y-3 text-sm text-white/60">
                <li>
                  <a href="tel:02085991622" className="hover:text-white transition-colors">
                    020 8599 1622
                  </a>
                </li>
                <li>
                  <a href="tel:+447733309314" className="hover:text-white transition-colors">
                    +44 7733 309 314
                  </a>
                </li>
                <li>
                  <a href="mailto:info@pj-glass.co.uk" className="hover:text-white transition-colors">
                    info@pj-glass.co.uk
                  </a>
                </li>
                <li className="leading-relaxed">
                  1181 High Rd, Romford<br />
                  RM6 4AL, UK
                </li>
                <li className="leading-relaxed">
                  Mon–Sat: 8 AM – 5 PM<br />
                  Sun: 10 AM – 2 PM
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
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/@pjglass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/pjglass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/pjglass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">
              &copy;{currentYear}, P&J Glass
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-white/40 hover:text-white text-xs transition-colors">
                Privacy policy
              </Link>
              <Link href="/terms-conditions" className="text-white/40 hover:text-white text-xs transition-colors">
                Terms &amp; conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

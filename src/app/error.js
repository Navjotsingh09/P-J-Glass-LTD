'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <h1 className="text-display-md text-brand-navy mb-4">Something went wrong</h1>
        <p className="text-brand-grey mb-8">
          We apologise for the inconvenience. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-filled">
            Try Again
          </button>
          <Link href="/" className="btn-outline-fluid">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

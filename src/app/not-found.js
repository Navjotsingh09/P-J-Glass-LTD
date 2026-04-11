import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <p className="section-label mb-4">404</p>
        <h1 className="text-display-md text-brand-navy mb-4">Page Not Found</h1>
        <p className="text-brand-grey mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-filled">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

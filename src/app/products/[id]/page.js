import Link from 'next/link';
import { getAllProducts, getProductById, getProductsByCategory } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

// Server Component
export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-black">
        <div className="text-center">
          <h1 className="text-display-md text-brand-white mb-6">Product Not Found</h1>
          <Link href="/products" className="btn-fluid btn-filled">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

// Generate static params for all products
export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

// Generate metadata for each product page
export function generateMetadata({ params }) {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    return { title: 'Product Not Found | P&J Glass' };
  }

  return {
    title: `${product.name} | P&J Glass`,
    description: product.shortDesc,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
    },
  };
}

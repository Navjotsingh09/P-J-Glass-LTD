import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

// Server Component
export default function ProductDetailPage({ params }) {
  const { id } = params;
  const products = getAllProducts();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} allProducts={products} />;
}

// Generate static params for all products
export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Generate metadata for each product page
export function generateMetadata({ params }) {
  const { id } = params;
  const products = getAllProducts();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return {
      title: 'Product Not Found | P&J Glass',
    };
  }

  return {
    title: `${product.name} - £${product.price}/m² | P&J Glass`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'product',
    },
  };
}

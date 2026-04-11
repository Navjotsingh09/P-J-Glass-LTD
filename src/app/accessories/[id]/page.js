import { getAllAccessories, getAccessoryById, accessoryCategories } from '@/lib/accessories';
import { getProductsByCategory, productCategories } from '@/lib/products';
import { notFound } from 'next/navigation';
import AccessoryDetailClient from './AccessoryDetailClient';

export async function generateStaticParams() {
  const accessories = getAllAccessories();
  return accessories.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const accessory = getAccessoryById(id);
  if (!accessory) return {};
  const catInfo = accessoryCategories[accessory.category];
  return {
    title: `${accessory.name} | P&J Glass Accessories`,
    description: accessory.shortDesc,
    openGraph: {
      title: accessory.name,
      description: accessory.shortDesc,
      images: [{ url: accessory.image, width: 600, height: 600, alt: accessory.name }],
    },
  };
}

export default async function AccessoryDetailPage({ params }) {
  const { id } = await params;
  const accessory = getAccessoryById(id);
  if (!accessory) notFound();

  // Get glass products this accessory pairs with
  const pairedProducts = [];
  if (accessory.fitsWith) {
    for (const catKey of accessory.fitsWith) {
      const products = getProductsByCategory(catKey);
      pairedProducts.push(...products.slice(0, 2)); // 2 from each category max
    }
  }

  // Get related accessories from same category
  const { getAllAccessories: getAll } = require('@/lib/accessories');
  const related = getAll()
    .filter((a) => a.category === accessory.category && a.id !== accessory.id)
    .slice(0, 3);

  return (
    <AccessoryDetailClient
      accessory={accessory}
      pairedProducts={pairedProducts.slice(0, 6)}
      relatedAccessories={related}
    />
  );
}

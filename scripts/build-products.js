// Build products.js from egw-products.json
const fs = require('fs');
const path = require('path');
const data = require('./egw-products.json');

// Map product_type to category key and metadata
const categoryMap = {
  'Juliet Balcony': { key: 'julietBalconies', name: 'Juliet Balconies', slug: 'juliet-balconies', description: 'Complete Juliet balcony systems with toughened laminate glass & fittings' },
  'Balustrade': { key: 'balustrades', name: 'Glass Balustrades', slug: 'balustrades', description: 'Premium toughened glass balustrade panels for stairs, balconies and decking' },
  'Mirror': { key: 'mirrors', name: 'Mirrors', slug: 'mirrors', description: 'Frameless mirrors — leaner, arch, pebble, gym, round & more' },
  'Painted Kitchen Splashbacks': { key: 'paintedSplashbacks', name: 'Painted Splashbacks', slug: 'painted-splashbacks', description: 'Colour-matched painted glass splashbacks in any RAL or Pantone shade' },
  'Printed Kitchen Splashbacks': { key: 'printedSplashbacks', name: 'Printed Splashbacks', slug: 'printed-splashbacks', description: 'High-resolution digitally printed glass splashbacks with stunning designs' },
  'wall art': { key: 'wallArt', name: 'Glass Wall Art', slug: 'wall-art', description: 'Premium printed glass wall art panels for stunning interior features' },
  'Bath Screen': { key: 'bathScreens', name: 'Bath Screens', slug: 'bath-screens', description: 'Frameless toughened glass bath screens with premium hinges' },
  'Table Top': { key: 'tableTopGlass', name: 'Table Top Glass', slug: 'table-top-glass', description: 'Toughened glass table top protectors in rectangle, round & square' },
  'Glass Whiteboard': { key: 'glassAccessories', name: 'Glass Accessories', slug: 'glass-accessories', description: 'Glass whiteboards, calendars and desk accessories' },
  'Glass Calendar': { key: 'glassAccessories', name: 'Glass Accessories', slug: 'glass-accessories', description: 'Glass whiteboards, calendars and desk accessories' },
};

// Build product entries grouped by category
const grouped = {};
for (const p of data) {
  const catInfo = categoryMap[p.product_type];
  if (!catInfo) continue;
  const key = catInfo.key;
  if (!grouped[key]) grouped[key] = [];
  
  // Generate a clean ID from handle
  const id = p.handle;
  
  // Format price display
  let priceDisplay;
  if (p.priceFrom === p.priceTo || p.priceTo === 0) {
    priceDisplay = `£${p.priceFrom.toFixed(2)}`;
  } else {
    priceDisplay = `£${p.priceFrom.toFixed(2)} – £${p.priceTo.toFixed(2)}`;
  }
  
  grouped[key].push({
    id,
    name: p.title,
    category: key,
    shortDesc: p.description.substring(0, 150) || p.title,
    priceFrom: p.priceFrom,
    priceTo: p.priceTo,
    priceDisplay,
    image: p.image,
    handle: p.handle,
  });
}

// Build the output file
let output = `// P&J GLASS - PRODUCT DATABASE
// Complete product catalog with ${data.length} products from EGW with Shopify CDN images

export const productCategories = {\n`;

// Write category definitions
const catKeys = Object.values(categoryMap).reduce((acc, c) => {
  if (!acc.find(x => x.key === c.key)) acc.push(c);
  return acc;
}, []);

for (const cat of catKeys) {
  output += `  ${cat.key}: {\n`;
  output += `    name: '${cat.name}',\n`;
  output += `    slug: '${cat.slug}',\n`;
  output += `    description: '${cat.description}',\n`;
  output += `  },\n`;
}
output += `};\n\n`;

// Write each category's products
for (const cat of catKeys) {
  const products = grouped[cat.key] || [];
  output += `export const ${cat.key} = [\n`;
  for (const p of products) {
    const name = p.name.replace(/'/g, "\\'");
    const shortDesc = (p.shortDesc || '').replace(/'/g, "\\'").replace(/\n/g, ' ');
    output += `  { id: '${p.id}', name: '${name}', category: '${p.category}', shortDesc: '${shortDesc}', priceFrom: ${p.priceFrom}, priceTo: ${p.priceTo}, priceDisplay: '${p.priceDisplay}', image: '${p.image}' },\n`;
  }
  output += `];\n\n`;
}

// Write helper functions
output += `// ─── Helper Functions ────────────────────────────────────────

export function getAllProducts() {
  return [${catKeys.map(c => `...${c.key}`).join(', ')}];
}

export function getProductsByCategory(category) {
  const map = { ${catKeys.map(c => c.key).join(', ')} };
  return map[category] || [];
}

export function getProductById(id) {
  return getAllProducts().find((p) => p.id === id);
}

export function getFeaturedProducts() {
  const all = getAllProducts();
  // Pick first from each category
  const seen = new Set();
  const featured = [];
  for (const p of all) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      featured.push(p);
      if (featured.length >= 6) break;
    }
  }
  return featured;
}

export function getPopularProducts() {
  // Return first 12 products across categories
  const all = getAllProducts();
  return all.slice(0, 12);
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'lib', 'products.js'), output);
console.log('Generated src/lib/products.js with', data.length, 'products across', catKeys.length, 'categories');
console.log('Categories:', catKeys.map(c => `${c.key} (${(grouped[c.key] || []).length})`).join(', '));

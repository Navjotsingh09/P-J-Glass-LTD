// P&J GLASS - PRODUCT DATABASE
// Complete product catalog with pricing, specifications, and details

export const productCategories = {
  balustrades: {
    name: 'Glass Balustrades',
    slug: 'balustrades',
    description: 'Premium toughened glass balustrade systems',
    icon: '🪜',
  },
  splashbacks: {
    name: 'Kitchen Splashbacks',
    slug: 'splashbacks',
    description: 'Painted & printed glass splashbacks',
    icon: '🎨',
  },
  bathScreens: {
    name: 'Bath Screens',
    slug: 'bath-screens',
    description: 'Frameless toughened glass bath screens',
    icon: '🛁',
  },
  showers: {
    name: 'Shower Screens',
    slug: 'showers',
    description: 'Custom shower enclosures & screens',
    icon: '🚿',
  },
  julietBalconies: {
    name: 'Juliet Balconies',
    slug: 'juliet-balconies',
    description: 'Complete Juliet balcony systems',
    icon: '🏛️',
  },
  mirrors: {
    name: 'Mirrors',
    slug: 'mirrors',
    description: 'Frameless mirrors in various styles',
    icon: '🪞',
  },
};

// GLASS BALUSTRADES
export const balustrades = [
  {
    id: 'bal-10-clear',
    sku: 'BAL-10-CLEAR',
    name: '10mm Clear Toughened Glass Balustrade',
    category: 'balustrades',
    thickness: '10mm',
    material: 'Toughened Glass',
    finish: 'Clear',
    priceFrom: 44.34,
    priceTo: 147.83,
    priceDisplay: '£44.34 - £147.83',
    image: '/images/products/balustrade-1.jpg',
    features: [
      'Polished edges included',
      'BS EN 12150 compliant',
      'Suitable for indoor/outdoor',
      'Lead time: 10-15 working days',
    ],
    sizes: ['800mm x 900mm', '1000mm x 900mm', '1200mm x 900mm', 'Custom sizes available'],
    image: '/images/products/balustrade-clear-10mm.jpg',
    popular: true,
  },
  {
    id: 'bal-10-satin',
    sku: 'BAL-10-SATIN',
    name: '10mm Satin/Frosted Toughened Glass Balustrade',
    category: 'balustrades',
    thickness: '10mm',
    material: 'Satin Toughened Glass',
    finish: 'Frosted/Satin',
    priceFrom: 69.85,
    priceTo: 341.51,
    priceDisplay: '£69.85 - £341.51',
    features: [
      'Privacy without blocking light',
      'Acid-etched finish',
      'Non-slip when wet',
      'Ideal for privacy applications',
    ],
    useCases: ['Balconies requiring privacy', 'Indoor staircases', 'Pool surrounds'],
    image: '/images/products/balustrade-satin-10mm.jpg',
  },
  {
    id: 'bal-12-clear',
    sku: 'BAL-12-CLEAR',
    name: '12mm Toughened Glass Balustrade',
    category: 'balustrades',
    thickness: '12mm',
    material: 'Toughened Glass',
    finish: 'Clear',
    priceFrom: 58.63,
    priceTo: 195.42,
    priceDisplay: '£58.63 - £195.42',
    features: [
      'Thicker for added strength',
      'BS 6180:2011 compliant',
      'Domestic & commercial use',
      'Premium quality',
    ],
    image: '/images/products/balustrade-clear-12mm.jpg',
    popular: true,
  },
  {
    id: 'bal-13-lam',
    sku: 'BAL-13-LAM',
    name: '13mm Toughened Laminated Glass Balustrade',
    category: 'balustrades',
    thickness: '13mm',
    material: 'Toughened Laminate Glass',
    finish: 'Clear',
    priceFrom: 90.44,
    priceTo: 331.62,
    priceDisplay: '£90.44 - £331.62',
    features: [
      'Ultimate safety glass',
      'Holds together if broken',
      'Commercial grade',
      '6mm + PVB + 6mm construction',
    ],
    composition: '6mm toughened + 1mm PVB interlayer + 6mm toughened',
    image: '/images/products/balustrade-laminate-13mm.jpg',
    recommended: true,
  },
  {
    id: 'bal-17-lam',
    sku: 'BAL-17-LAM',
    name: '17mm Toughened Laminated Glass Balustrade',
    category: 'balustrades',
    thickness: '17mm',
    material: 'Toughened Laminate Glass',
    finish: 'Clear',
    priceFrom: 96.68,
    priceTo: 354.49,
    priceDisplay: '£96.68 - £354.49',
    features: [
      'Premium safety standard',
      'Building regs compliant',
      'Maximum strength',
      '8mm + PVB + 8mm construction',
    ],
    composition: '8mm toughened + 1.52mm PVB + 8mm toughened',
    image: '/images/products/balustrade-laminate-17mm.jpg',
  },
];

// KITCHEN SPLASHBACKS - Popular Colors
export const splashbackColors = [
  {
    id: 'splash-duck-egg',
    sku: 'SPLASH-DUCK-EGG',
    name: 'Duck Egg Blue Splashback',
    category: 'splashbacks',
    type: 'painted',
    colorName: 'Duck Egg Blue',
    colorCode: '16C33 Dulux',
    hex: '#A4C4C4',
    priceFrom: 66.60,
    priceTo: 185.00,
    priceDisplay: '£66.60 - £185.00',
    features: ['6mm toughened glass', 'Heat resistant to 400°C', 'Easy clean surface', 'RAL color match available'],
    sizes: [
      { size: '600mm x 750mm', price: 66.60 },
      { size: '900mm x 750mm', price: 95.00 },
      { size: '1200mm x 750mm', price: 125.00 },
      { size: '1500mm x 750mm', price: 155.00 },
      { size: '1800mm x 750mm', price: 165.00 },
      { size: '2400mm x 750mm', price: 175.00 },
      { size: '2800mm x 750mm', price: 185.00 },
    ],
    image: '/images/products/splash-duck-egg.jpg',
    popular: true,
  },
  {
    id: 'splash-teal',
    sku: 'SPLASH-TEAL',
    name: 'Teal Glass Splashback',
    category: 'splashbacks',
    type: 'painted',
    colorName: 'Teal',
    colorCode: '7467C Pantone',
    hex: '#00677F',
    priceFrom: 66.60,
    priceTo: 185.00,
    priceDisplay: '£66.60 - £185.00',
    features: ['6mm toughened glass', 'Heat resistant to 400°C', 'Easy clean surface', 'Custom sizes available'],
    image: '/images/products/splash-teal.jpg',
    popular: true,
  },
  {
    id: 'splash-sage-green',
    sku: 'SPLASH-SAGE-GREEN',
    name: 'Sage Green Glass Splashback',
    category: 'splashbacks',
    type: 'painted',
    colorName: 'Sage Green',
    colorCode: 'Little Greene 80',
    hex: '#92B5A0',
    priceFrom: 66.60,
    priceTo: 185.00,
    priceDisplay: '£66.60 - £185.00',
    features: ['6mm toughened glass', 'Heat resistant to 400°C', 'On-trend color', 'Free color matching'],
    image: '/images/products/splash-sage.jpg',
    trending: true,
  },
  {
    id: 'splash-copper-metallic',
    sku: 'SPLASH-COPPER-METALLIC',
    name: 'Copper Metallic Glass Splashback',
    category: 'splashbacks',
    type: 'painted',
    colorName: 'Copper Metallic',
    colorCode: 'Custom Metallic',
    hex: '#B87333',
    priceFrom: 66.60,
    priceTo: 185.00,
    priceDisplay: '£66.60 - £185.00',
    features: ['6mm toughened glass', 'Metallic shimmer finish', 'Heat resistant', 'Luxurious appearance'],
    image: '/images/products/splash-copper-metallic.jpg',
    popular: true,
  },
  {
    id: 'splash-rose-gold',
    sku: 'SPLASH-ROSE-GOLD',
    name: 'Rose Gold Glass Splashback',
    category: 'splashbacks',
    type: 'painted',
    colorName: 'Rose Gold',
    colorCode: 'Custom Metallic',
    hex: '#B76E79',
    priceFrom: 66.60,
    priceTo: 185.00,
    priceDisplay: '£66.60 - £185.00',
    features: ['6mm toughened glass', 'Metallic shimmer finish', 'Instagram-worthy', 'On-trend color'],
    image: '/images/products/splash-rose-gold.jpg',
    trending: true,
  },
];

// SPLASHBACKS - Popular Printed Designs
export const splashbackPrints = [
  {
    id: 'splash-copper-marble',
    sku: 'SPLASH-COPPER-MARBLE',
    name: 'Copper Marble Splashback',
    category: 'splashbacks',
    type: 'printed',
    designNumber: '105',
    pattern: 'Copper Marble',
    priceFrom: 79.20,
    priceTo: 220.00,
    priceDisplay: '£79.20 - £220.00',
    features: ['High-resolution digital print', '6mm toughened glass', 'Heat resistant to 400°C', 'UV stable'],
    image: '/images/products/splash-copper-marble.jpg',
    rating: 5.0,
    reviews: 4,
    bestSeller: true,
  },
  {
    id: 'splash-gold-marble',
    sku: 'SPLASH-GOLD-MARBLE',
    name: 'Gold Marble Splashback',
    category: 'splashbacks',
    type: 'printed',
    designNumber: '109',
    pattern: 'Gold Marble',
    priceFrom: 79.20,
    priceTo: 220.00,
    priceDisplay: '£79.20 - £220.00',
    features: ['Luxury marble effect', '6mm toughened glass', 'Heat resistant', 'Easy to clean'],
    image: '/images/products/splash-gold-marble.jpg',
    popular: true,
  },
  {
    id: 'splash-white-marble',
    sku: 'SPLASH-WHITE-MARBLE',
    name: 'White Marble Splashback',
    category: 'splashbacks',
    type: 'printed',
    designNumber: '140',
    pattern: 'White Marble',
    priceFrom: 79.20,
    priceTo: 220.00,
    priceDisplay: '£79.20 - £220.00',
    features: ['Classic marble look', '6mm toughened glass', 'Timeless design', 'Premium quality'],
    image: '/images/products/splash-white-marble.jpg',
    popular: true,
  },
  {
    id: 'splash-emerald-green',
    sku: 'SPLASH-EMERALD-GREEN',
    name: 'Emerald Green Splashback',
    category: 'splashbacks',
    type: 'printed',
    designNumber: '137',
    pattern: 'Abstract Fluid',
    priceFrom: 79.20,
    priceTo: 220.00,
    priceDisplay: '£79.20 - £220.00',
    features: ['Bold statement piece', '6mm toughened glass', 'Modern design', 'Vibrant colors'],
    image: '/images/products/splash-emerald.jpg',
    rating: 5.0,
    reviews: 3,
  },
];

// MIRRORS
export const mirrors = [
  {
    id: 'mirror-leaner-rect',
    sku: 'MIRROR-LEANER-RECT',
    name: 'Frameless Leaner Mirror',
    category: 'mirrors',
    type: 'Leaner',
    shape: 'Rectangle',
    thickness: '6mm',
    finish: 'Silver',
    priceFrom: 75.00,
    priceTo: 395.00,
    priceDisplay: '£75 - £395',
    features: ['Free-standing design', 'Polished edges', 'Safety backing', 'Made to measure'],
    sizes: [
      { size: '400mm x 1200mm', price: 75.00 },
      { size: '600mm x 1600mm', price: 145.00 },
      { size: '800mm x 2000mm', price: 245.00 },
    ],
    image: '/images/products/mirror-leaner-rect.jpg',
    rating: 5.0,
    popular: true,
  },
  {
    id: 'mirror-leaner-arch',
    sku: 'MIRROR-LEANER-ARCH',
    name: 'Frameless Arch Leaner Mirror',
    category: 'mirrors',
    type: 'Leaner',
    shape: 'Arch',
    thickness: '6mm',
    finish: 'Silver',
    priceFrom: 105.00,
    priceTo: 425.00,
    priceDisplay: '£105 - £425',
    features: ['Arched top design', 'Free-standing', 'Polished edges', 'On-trend shape'],
    image: '/images/products/mirror-leaner-arch.jpg',
    rating: 5.0,
    trending: true,
  },
  {
    id: 'mirror-silver-round',
    sku: 'MIRROR-SILVER-ROUND',
    name: 'Silver Round Mirror',
    category: 'mirrors',
    type: 'Wall Mount',
    shape: 'Round',
    thickness: '6mm',
    finish: 'Silver',
    priceFrom: 71.50,
    priceTo: 100.00,
    priceDisplay: '£71.50 - £100',
    features: ['Polished edges', 'Drill holes optional', 'Safety backing', 'Various sizes'],
    image: '/images/products/mirror-round.jpg',
    popular: true,
  },
];

// BATH SCREENS
export const bathScreens = [
  {
    id: 'bath-8-black',
    sku: 'BATH-8-BLACK',
    name: '8mm Bath Screen with Matt Black Hinges',
    category: 'bathScreens',
    thickness: '8mm',
    material: 'Toughened Glass',
    hardware: 'Matt Black',
    priceFrom: 255.00,
    priceTo: 300.00,
    priceDisplay: '£255 - £300',
    features: ['Frameless design', '8mm toughened glass', 'Matt black hinges', 'Easy clean coating option'],
    sizes: ['800mm x 1400mm', '900mm x 1400mm', '1000mm x 1400mm'],
    image: '/images/products/bath-screen-black.jpg',
    popular: true,
  },
  {
    id: 'bath-8-brass',
    sku: 'BATH-8-BRASS',
    name: '8mm Bath Screen with Brass Hinges',
    category: 'bathScreens',
    thickness: '8mm',
    material: 'Toughened Glass',
    hardware: 'Brushed Brass',
    priceFrom: 245.00,
    priceTo: 290.00,
    priceDisplay: '£245 - £290',
    features: ['Frameless design', '8mm toughened glass', 'Brushed brass hinges', 'Luxury finish'],
    image: '/images/products/bath-screen-brass.jpg',
    trending: true,
  },
];

// JULIET BALCONIES
export const julietBalconies = [
  {
    id: 'juliet-skyforce-top',
    sku: 'JULIET-SKYFORCE-TOP-BLACK',
    name: 'SkyForce Top Mount Juliet Balcony',
    category: 'julietBalconies',
    type: 'Complete System',
    mounting: 'Top Mount',
    priceFrom: 295.99,
    priceTo: 994.11,
    priceDisplay: '£295.99 - £994.11',
    features: [
      '13mm, 17mm, or 21mm glass',
      'Anodised aluminium profiles',
      'Building regs compliant',
      'Invisible mounting',
      'Multiple colors available',
    ],
    glassThickness: ['13mm', '17mm', '21mm'],
    widthRange: '1000mm - 3000mm',
    image: '/images/products/juliet-skyforce.jpg',
    rating: 4.0,
  },
];

// Helper functions
export function getAllProducts() {
  return [
    ...balustrades,
    ...splashbackColors,
    ...splashbackPrints,
    ...mirrors,
    ...bathScreens,
  ];
}

export function getProductsByCategory(category) {
  switch (category) {
    case 'balustrades':
      return balustrades;
    case 'splashbacks':
      return [...splashbackColors, ...splashbackPrints];
    case 'mirrors':
      return mirrors;
    case 'bathScreens':
      return bathScreens;
    case 'julietBalconies':
      return julietBalconies;
    default:
      return [];
  }
}

export function getProductById(id) {
  const allProducts = [
    ...balustrades,
    ...splashbackColors,
    ...splashbackPrints,
    ...mirrors,
    ...bathScreens,
    ...julietBalconies,
  ];
  return allProducts.find(p => p.id === id);
}

export function getFeaturedProducts() {
  return [
    balustrades[0], // 10mm Clear
    splashbackColors[0], // Duck Egg
    splashbackPrints[0], // Copper Marble
    mirrors[0], // Leaner Mirror
  ];
}

export function getPopularProducts() {
  const allProducts = [
    ...balustrades,
    ...splashbackColors,
    ...splashbackPrints,
    ...mirrors,
    ...bathScreens,
  ];
  return allProducts.filter(p => p.popular || p.bestSeller);
}

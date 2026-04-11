// P&J GLASS - ACCESSORIES DATABASE
// CRL-inspired glass hardware & accessories with placeholder pricing

import { getSalePrice, SALE_DISCOUNT } from './products';

export const accessoryCategories = {
  showerAccessories: {
    name: 'Shower Hardware',
    slug: 'shower-hardware',
    description: 'Premium shower door hinges, handles, support bars & seals',
  },
  mirrorAccessories: {
    name: 'Mirror Accessories',
    slug: 'mirror-accessories',
    description: 'Mirror mounting kits, adhesives, clips & heated defogger pads',
  },
  balustradeAccessories: {
    name: 'Balustrade Fittings',
    slug: 'balustrade-fittings',
    description: 'Glass clamps, railing clamps, standoffs & handrails',
  },
  sealantsCleaning: {
    name: 'Sealants & Cleaning',
    slug: 'sealants-cleaning',
    description: 'Glass sealants, cleaners, glazing tapes & easy-clean coatings',
  },
};

// ─── Shower Accessories ──────────────────────────────────────

const showerAccessories = [
  { id: 'acc-shower-hinge-bellagio-90-wall', name: 'Bellagio 90° Wall-to-Glass Shower Hinge — Chrome', category: 'showerAccessories', shortDesc: 'Premium 90° wall-mounted shower hinge for frameless glass doors. Suitable for 8–10mm toughened glass. Adjustable for a perfect fit.', priceFrom: 42, priceTo: null, priceDisplay: '£42.00', image: 'https://www.egw.co.uk/cdn/shop/products/chrome-shower-door-hinge-wall-mounted-90_1200x1200.jpg?v=1669802012', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black', 'Brushed Nickel'], brand: 'CRL' },
  { id: 'acc-shower-hinge-bellagio-180-gg', name: 'Bellagio 180° Glass-to-Glass Shower Hinge — Chrome', category: 'showerAccessories', shortDesc: '180° glass-to-glass shower hinge for inline frameless shower enclosures. Supports 8–10mm glass panels.', priceFrom: 55, priceTo: null, priceDisplay: '£55.00', image: 'https://www.egw.co.uk/cdn/shop/products/APH-H09_1200x655.jpg?v=1614176179', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black', 'Brushed Nickel'], brand: 'CRL' },
  { id: 'acc-shower-hinge-murano-90-wall', name: 'Murano 90° Wall-to-Glass Shower Hinge — Matt Black', category: 'showerAccessories', shortDesc: 'Contemporary square-profile 90° shower door hinge in matt black finish. For 8–10mm frameless glass.', priceFrom: 48, priceTo: null, priceDisplay: '£48.00', image: 'https://www.egw.co.uk/cdn/shop/products/SH-NKE-H01_Bblackglasstowallhingeconcealedfixings_7478d766-325a-42b5-87fe-67b6d4411744_1200x1200.jpg?v=1672995526', fitsWith: ['bathScreens'], finishes: ['Matt Black', 'Chrome', 'Brushed Brass'], brand: 'CRL' },
  { id: 'acc-shower-knob-round-30mm', name: 'Round 30mm Back-to-Back Shower Door Knob', category: 'showerAccessories', shortDesc: 'Sleek 30mm round shower door knob set (back-to-back). Suitable for 6–10mm toughened glass.', priceFrom: 14, priceTo: null, priceDisplay: '£14.00', image: 'https://www.egw.co.uk/cdn/shop/products/SHAPHK01-1024x559_1200x655.jpg?v=1601033349', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black', 'Brushed Nickel'], brand: 'CRL' },
  { id: 'acc-shower-knob-square-30mm', name: 'Square 30mm Back-to-Back Shower Door Knob', category: 'showerAccessories', shortDesc: 'Modern square 30mm shower door knob set. Back-to-back mounting for 6–10mm glass panels.', priceFrom: 18, priceTo: null, priceDisplay: '£18.00', image: 'https://www.egw.co.uk/cdn/shop/products/APH-K12_1200x655.jpg?v=1601979014', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black'], brand: 'CRL' },
  { id: 'acc-shower-pull-handle-tubular-300', name: 'Tubular Pull Handle 300mm — Shower Door', category: 'showerAccessories', shortDesc: '300mm tubular stainless steel pull handle for frameless shower doors. Single-sided or back-to-back mounting.', priceFrom: 22, priceTo: null, priceDisplay: '£22.00', image: 'https://www.egw.co.uk/cdn/shop/files/6-inch-d-shaped-shower-door-handles_1200x1200.jpg?v=1726737804', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black', 'Brushed Nickel'], brand: 'CRL' },
  { id: 'acc-shower-pull-handle-square-300', name: 'Square Pull Handle 300mm — Shower Door', category: 'showerAccessories', shortDesc: '300mm square-profile pull handle for glass shower doors. Premium stainless steel construction.', priceFrom: 32, priceTo: null, priceDisplay: '£32.00', image: 'https://www.egw.co.uk/cdn/shop/products/GGA-P05_1200x676.jpg?v=1601990013', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black'], brand: 'CRL' },
  { id: 'acc-shower-towel-bar-600', name: 'Towel Bar 600mm — Glass Mounted', category: 'showerAccessories', shortDesc: '600mm towel bar designed to mount on frameless glass shower panels. Stainless steel construction.', priceFrom: 28, priceTo: null, priceDisplay: '£28.00', image: 'https://www.egw.co.uk/cdn/shop/products/3068SH-GGA-P01_1200x655.jpg?v=1601987806', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black'], brand: 'CRL' },
  { id: 'acc-shower-support-bar-round-1000', name: 'Round Support Bar 1000mm — Wall-to-Glass', category: 'showerAccessories', shortDesc: '1000mm round support bar for frameless glass shower panels. Adjustable angle wall bracket included.', priceFrom: 35, priceTo: null, priceDisplay: '£35.00', image: 'https://www.egw.co.uk/cdn/shop/products/SHAPHT03-AD_1200x655.jpg?v=1614770844', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black', 'Brushed Nickel'], brand: 'CRL' },
  { id: 'acc-shower-support-bar-square-1200', name: 'Square Support Bar 1200mm — Wall-to-Glass', category: 'showerAccessories', shortDesc: '1200mm square-profile support bar. Complete wall-to-glass set with adjustable brackets. For 8–10mm glass.', priceFrom: 45, priceTo: null, priceDisplay: '£45.00', image: 'https://www.egw.co.uk/cdn/shop/products/SHAPHT03-AD_1200x655.jpg?v=1614770844', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black'], brand: 'CRL' },
  { id: 'acc-shower-u-channel-dry-2000', name: 'U-Channel Dry Glaze 2000mm — Floor Mount', category: 'showerAccessories', shortDesc: '2000mm aluminium U-channel for dry-glazing frameless shower panels to the floor. For 8–10mm glass.', priceFrom: 22, priceTo: null, priceDisplay: '£22.00', image: 'https://www.egw.co.uk/cdn/shop/products/blackchannel_1200x1200.jpg?v=1677168098', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black', 'Brushed Nickel'], brand: 'CRL' },
  { id: 'acc-shower-seal-curved-2000', name: 'Curved Shower Seal Strip 2000mm', category: 'showerAccessories', shortDesc: 'Flexible curved shower door seal strip. Prevents water leakage at bottom of frameless shower doors. For 6–10mm glass.', priceFrom: 9, priceTo: null, priceDisplay: '£9.00', image: 'https://www.egw.co.uk/cdn/shop/files/Translucent-Glass-To-Floor-Seals_1200x1200.webp?v=1727685845', fitsWith: ['bathScreens'], finishes: [], brand: 'CRL' },
  { id: 'acc-shower-seal-magnetic-2000', name: 'Magnetic Shower Door Seal Pair 2000mm', category: 'showerAccessories', shortDesc: 'Pair of magnetic seals for double shower doors. Creates a watertight closure. For 6–8mm glass.', priceFrom: 15, priceTo: null, priceDisplay: '£15.00', image: 'https://www.egw.co.uk/cdn/shop/files/Magnetic-Seals-Main-Image_1200x1200.webp?v=1727688902', fitsWith: ['bathScreens'], finishes: [], brand: 'CRL' },
  { id: 'acc-shower-threshold-1000', name: 'Shower Door Threshold Strip 1000mm', category: 'showerAccessories', shortDesc: 'Low-profile aluminium threshold strip to contain water at the shower entrance. Sloped for wheelchair access.', priceFrom: 18, priceTo: null, priceDisplay: '£18.00', image: 'https://www.egw.co.uk/cdn/shop/files/Bubble-Seal-Main-Image_1200x1200.jpg?v=1727688066', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black'], brand: 'CRL' },
  { id: 'acc-shower-glass-clamp-square', name: 'Square Glass Clamp — Shower Panel', category: 'showerAccessories', shortDesc: 'Square glass-to-wall clamp for fixed shower panels. Zinc alloy with stainless steel finish. For 8–10mm glass.', priceFrom: 12, priceTo: null, priceDisplay: '£12.00', image: 'https://www.egw.co.uk/cdn/shop/products/ATB-B-S-Fbrushedbalustradeclamp_1200x655.jpg?v=1601373163', fitsWith: ['bathScreens'], finishes: ['Chrome', 'Matt Black', 'Brushed Nickel'], brand: 'CRL' },
];

// ─── Mirror Accessories ──────────────────────────────────────

const mirrorAccessories = [
  { id: 'acc-mirror-mount-kit-professional', name: 'Professional Mirror Mounting Kit', category: 'mirrorAccessories', shortDesc: 'Complete mirror mounting kit with Z-clips, screws, wall plugs and spacers. Suitable for mirrors up to 20kg.', priceFrom: 22, priceTo: null, priceDisplay: '£22.00', image: 'https://www.egw.co.uk/cdn/shop/products/BohleSelfSupports-BO5207331_1200x1084.jpg?v=1642782719', fitsWith: ['mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-mirror-mount-kit-heavy-duty', name: 'Heavy-Duty Mirror Mounting Kit', category: 'mirrorAccessories', shortDesc: 'Heavy-duty Z-clip mounting kit for large mirrors and gym mirrors. Supports mirrors up to 40kg. Includes all fixings.', priceFrom: 32, priceTo: null, priceDisplay: '£32.00', image: 'https://www.egw.co.uk/cdn/shop/products/BohleSelfSupports-BO5207331_1200x1084.jpg?v=1642782719', fitsWith: ['mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-mirror-adhesive-evergrip', name: 'EverGrip Premium Mirror Adhesive 310ml', category: 'mirrorAccessories', shortDesc: 'Professional-grade mirror adhesive. Safe for silvered mirrors — will not damage backing. 310ml cartridge.', priceFrom: 10, priceTo: null, priceDisplay: '£10.00', image: 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102', fitsWith: ['mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-mirror-adhesive-ms-polymer', name: 'MS Polymer Mirror Adhesive 290ml', category: 'mirrorAccessories', shortDesc: 'High-performance MS polymer adhesive for mirrors. Solvent-free, mirror-safe formula. Crystal clear finish.', priceFrom: 12, priceTo: null, priceDisplay: '£12.00', image: 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102', fitsWith: ['mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-mirror-foam-tape-roll', name: 'Double-Sided Mirror Foam Tape 25mm × 5m', category: 'mirrorAccessories', shortDesc: 'Double-sided foam mounting tape for mirrors. 25mm wide × 5m roll. For lightweight mirror panels.', priceFrom: 7, priceTo: null, priceDisplay: '£7.00', image: 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102', fitsWith: ['mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-mirror-clips-ez-mount-set', name: 'E-Z Mount Mirror Clip Set (4 Pack)', category: 'mirrorAccessories', shortDesc: 'Set of 4 E-Z Mount mirror clips with screws. Spring-loaded for secure hold. Chrome finish.', priceFrom: 8, priceTo: null, priceDisplay: '£8.00', image: 'https://www.egw.co.uk/cdn/shop/products/MirrorDomeHeadScrew_1200x894.jpg?v=1623667169', fitsWith: ['mirrors'], finishes: ['Chrome'], brand: 'CRL' },
  { id: 'acc-mirror-clips-decorative-set', name: 'Decorative Mirror Clip Set (4 Pack) — Round', category: 'mirrorAccessories', shortDesc: 'Set of 4 decorative round mirror clips. Polished chrome finish. For 4–6mm mirrors.', priceFrom: 12, priceTo: null, priceDisplay: '£12.00', image: 'https://www.egw.co.uk/cdn/shop/products/MirrorDomeHeadScrew_1200x894.jpg?v=1623667169', fitsWith: ['mirrors'], finishes: ['Chrome', 'Brushed Nickel'], brand: 'CRL' },
  { id: 'acc-mirror-defogger-pad-small', name: 'Heated Mirror Defogger Pad — Small (300×400mm)', category: 'mirrorAccessories', shortDesc: 'Electric heated pad that sticks behind your mirror to prevent condensation. 300×400mm, 35W. IP44 rated.', priceFrom: 28, priceTo: null, priceDisplay: '£28.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-mirror-defogger-pad-large', name: 'Heated Mirror Defogger Pad — Large (500×700mm)', category: 'mirrorAccessories', shortDesc: 'Large electric heated defogger pad for bathroom mirrors. 500×700mm, 65W. Easy peel-and-stick installation.', priceFrom: 42, priceTo: null, priceDisplay: '£42.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-mirror-safety-backing-film', name: 'Mirror Safety Backing Film — Roll (1m × 2m)', category: 'mirrorAccessories', shortDesc: 'Self-adhesive safety backing film for mirrors. Prevents shattering. BS 6206 / EN 12600 compliant. 1m × 2m roll.', priceFrom: 15, priceTo: null, priceDisplay: '£15.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-mirror-j-channel-2000', name: 'Mirror J-Channel 2000mm — Wall Mount', category: 'mirrorAccessories', shortDesc: 'Aluminium J-channel for bottom-mounting mirrors to walls. 2000mm length. For 4–6mm mirrors.', priceFrom: 14, priceTo: null, priceDisplay: '£14.00', image: 'https://www.egw.co.uk/cdn/shop/products/blackchannel_1200x1200.jpg?v=1677168098', fitsWith: ['mirrors'], finishes: ['Chrome', 'Matt Black'], brand: 'CRL' },
  { id: 'acc-mirror-led-strip-kit', name: 'LED Backlight Strip Kit for Mirrors', category: 'mirrorAccessories', shortDesc: 'Warm white LED strip kit for creating backlit mirror effects. 2m strip with driver. IP44 rated for bathrooms.', priceFrom: 35, priceTo: null, priceDisplay: '£35.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['mirrors'], finishes: [], brand: 'P&J Glass' },
];

// ─── Balustrade Accessories ──────────────────────────────────

const balustradeAccessories = [
  { id: 'acc-balustrade-clamp-square-45', name: 'Square Glass Clamp 45×45mm — Flat Back', category: 'balustradeAccessories', shortDesc: 'Square 45×45mm flat-back glass clamp for balustrades. 316 stainless steel. For 8–12mm glass.', priceFrom: 18, priceTo: null, priceDisplay: '£18.00', image: 'https://www.egw.co.uk/cdn/shop/products/ATB-B-S-Fbrushedbalustradeclamp_1200x655.jpg?v=1601373163', fitsWith: ['balustrades'], finishes: ['Satin', 'Mirror Polish'], brand: 'CRL' },
  { id: 'acc-balustrade-clamp-square-55', name: 'Square Glass Clamp 55×55mm — Flat Back', category: 'balustradeAccessories', shortDesc: 'Large 55×55mm flat-back glass clamp for balustrades and partitions. 316 stainless steel. For 10–17mm glass.', priceFrom: 24, priceTo: null, priceDisplay: '£24.00', image: 'https://www.egw.co.uk/cdn/shop/products/ATB-B-S-Fbrushedbalustradeclamp_1200x655.jpg?v=1601373163', fitsWith: ['balustrades'], finishes: ['Satin', 'Mirror Polish'], brand: 'CRL' },
  { id: 'acc-balustrade-clamp-d-shape', name: 'D-Shape Glass Clamp — Round Back', category: 'balustradeAccessories', shortDesc: 'D-shape glass clamp with round back for post mounting. 316 stainless steel. For 8–12mm glass.', priceFrom: 16, priceTo: null, priceDisplay: '£16.00', image: 'https://www.egw.co.uk/cdn/shop/products/SH-ATB-B-Dbrushedstainlesssteelroundbackbalustradeclamp_1200x655.jpg?v=1601302048', fitsWith: ['balustrades'], finishes: ['Satin', 'Mirror Polish'], brand: 'CRL' },
  { id: 'acc-balustrade-railing-clamp-round', name: 'Round Railing Clamp — Top Mount', category: 'balustradeAccessories', shortDesc: 'Round top-mount railing clamp for connecting handrails to glass balustrade panels. 316 stainless steel.', priceFrom: 28, priceTo: null, priceDisplay: '£28.00', image: 'https://www.egw.co.uk/cdn/shop/products/2204SH-ATB-GF03_XLHeavydutystainlesssteeloffsetfitting_1200x655.jpg?v=1601380199', fitsWith: ['balustrades', 'julietBalconies'], finishes: ['Satin', 'Mirror Polish'], brand: 'CRL' },
  { id: 'acc-balustrade-standoff-50mm', name: 'Glass Standoff Pin 50mm', category: 'balustradeAccessories', shortDesc: '50mm glass standoff pin for point-fixing glass panels. 316 stainless steel. For 10–12mm glass. Set of 4.', priceFrom: 35, priceTo: null, priceDisplay: '£35.00', image: 'https://www.egw.co.uk/cdn/shop/products/2204SH-ATB-GF03_XLHeavydutystainlesssteeloffsetfitting_1200x655.jpg?v=1601380199', fitsWith: ['balustrades'], finishes: ['Satin', 'Mirror Polish'], brand: 'CRL' },
  { id: 'acc-balustrade-standoff-25mm', name: 'Glass Standoff Pin 25mm — Countersunk', category: 'balustradeAccessories', shortDesc: '25mm countersunk glass standoff pin. Sleek flush design. 316 stainless steel. For 10–12mm glass. Set of 4.', priceFrom: 30, priceTo: null, priceDisplay: '£30.00', image: 'https://www.egw.co.uk/cdn/shop/products/6083SH-ATB-GF03stainlesssteeloffsetbalustradefittingonstaircase_1200x655.jpg?v=1601307818', fitsWith: ['balustrades'], finishes: ['Satin', 'Mirror Polish'], brand: 'CRL' },
  { id: 'acc-balustrade-handrail-round-1000', name: 'Round Stainless Steel Handrail 1000mm', category: 'balustradeAccessories', shortDesc: '42.4mm diameter round stainless steel handrail. 1000mm length. Includes end caps. Cut-to-size available.', priceFrom: 45, priceTo: null, priceDisplay: '£45.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['balustrades', 'julietBalconies'], finishes: ['Satin', 'Mirror Polish'], brand: 'CRL' },
  { id: 'acc-balustrade-handrail-round-2000', name: 'Round Stainless Steel Handrail 2000mm', category: 'balustradeAccessories', shortDesc: '42.4mm diameter round stainless steel handrail. 2000mm length. Includes end caps. Professional finish.', priceFrom: 75, priceTo: null, priceDisplay: '£75.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['balustrades', 'julietBalconies'], finishes: ['Satin', 'Mirror Polish'], brand: 'CRL' },
  { id: 'acc-balustrade-gasket-rubber-roll', name: 'Rubber Gasket Strip for Glass Clamps — 5m Roll', category: 'balustradeAccessories', shortDesc: 'EPDM rubber gasket strip for glass balustrade clamps. Protects glass edges. 5m roll, suitable for 8–17mm glass.', priceFrom: 8, priceTo: null, priceDisplay: '£8.00', image: 'https://www.egw.co.uk/cdn/shop/files/Bubble-Seal-Main-Image_1200x1200.jpg?v=1727688066', fitsWith: ['balustrades'], finishes: [], brand: 'CRL' },
  { id: 'acc-balustrade-base-shoe-2500', name: 'Aluminium Base Shoe Channel 2500mm', category: 'balustradeAccessories', shortDesc: 'Aluminium base shoe channel for floor-mounting glass balustrade panels. 2500mm length. For 12–21mm glass.', priceFrom: 55, priceTo: null, priceDisplay: '£55.00', image: 'https://www.egw.co.uk/cdn/shop/products/blackchannel_1200x1200.jpg?v=1677168098', fitsWith: ['balustrades'], finishes: ['Mill Finish', 'Anodised'], brand: 'CRL' },
  { id: 'acc-balustrade-spigot-square', name: 'Square Glass Spigot — Floor Mount', category: 'balustradeAccessories', shortDesc: 'Square floor-mounted glass spigot for frameless glass balustrades. 316 stainless steel. For 12–17mm glass.', priceFrom: 38, priceTo: null, priceDisplay: '£38.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['balustrades'], finishes: ['Satin', 'Mirror Polish', 'Matt Black'], brand: 'CRL' },
  { id: 'acc-balustrade-post-end-cap', name: 'Handrail End Cap — Flat (Pair)', category: 'balustradeAccessories', shortDesc: 'Flat end caps for 42.4mm round handrails. Sold as a pair. Push-fit design.', priceFrom: 6, priceTo: null, priceDisplay: '£6.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['balustrades', 'julietBalconies'], finishes: ['Satin', 'Mirror Polish'], brand: 'CRL' },
];

// ─── Sealants & Cleaning ─────────────────────────────────────

const sealantsCleaning = [
  { id: 'acc-sealant-silicone-clear-310', name: 'Clear Silicone Glass Sealant 310ml', category: 'sealantsCleaning', shortDesc: 'Professional-grade clear silicone sealant for glass installations. Mould-resistant. Suitable for wet areas.', priceFrom: 8, priceTo: null, priceDisplay: '£8.00', image: 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102', fitsWith: ['bathScreens', 'balustrades', 'paintedSplashbacks', 'printedSplashbacks'], finishes: [], brand: 'CRL' },
  { id: 'acc-sealant-silicone-white-310', name: 'White Silicone Glass Sealant 310ml', category: 'sealantsCleaning', shortDesc: 'White silicone sealant for glass-to-wall joints. Anti-mould formula. Perfect for shower enclosures.', priceFrom: 8, priceTo: null, priceDisplay: '£8.00', image: 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102', fitsWith: ['bathScreens', 'paintedSplashbacks', 'printedSplashbacks'], finishes: [], brand: 'CRL' },
  { id: 'acc-sealant-acrylic-clear-310', name: 'Acrylic Glass Sealant 310ml — Paintable', category: 'sealantsCleaning', shortDesc: 'Paintable acrylic sealant for glass splashbacks and interior glass installations. Low odour formula.', priceFrom: 6, priceTo: null, priceDisplay: '£6.00', image: 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102', fitsWith: ['paintedSplashbacks', 'printedSplashbacks', 'mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-cleaner-glass-spray-500', name: 'Professional Glass Cleaner Spray 500ml', category: 'sealantsCleaning', shortDesc: 'Streak-free professional glass cleaner. Safe for toughened, laminated and coated glass surfaces. 500ml spray bottle.', priceFrom: 6, priceTo: null, priceDisplay: '£6.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['bathScreens', 'mirrors', 'balustrades', 'paintedSplashbacks', 'printedSplashbacks', 'tableTopGlass'], finishes: [], brand: 'P&J Glass' },
  { id: 'acc-glazing-tape-6mm-roll', name: 'Glazing Setting Tape 6mm × 20m', category: 'sealantsCleaning', shortDesc: 'Self-adhesive glazing setting tape for glass installations. 6mm wide × 20m roll. Prevents glass-to-metal contact.', priceFrom: 5, priceTo: null, priceDisplay: '£5.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['balustrades', 'bathScreens'], finishes: [], brand: 'CRL' },
  { id: 'acc-easy-clean-coating-kit', name: 'Easy-Clean Glass Coating Kit', category: 'sealantsCleaning', shortDesc: 'Nano-technology easy-clean coating for shower glass. Repels water, limescale and soap scum. Enough for 8 sq m.', priceFrom: 22, priceTo: null, priceDisplay: '£22.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['bathScreens', 'mirrors'], finishes: [], brand: 'CRL' },
  { id: 'acc-shims-setting-blocks-bag', name: 'Glass Setting Blocks & Shims — Bag of 50', category: 'sealantsCleaning', shortDesc: 'Bag of 50 assorted plastic setting blocks and shims for glass installation. Various sizes 3–6mm.', priceFrom: 4, priceTo: null, priceDisplay: '£4.00', image: 'https://placehold.co/600x600/1a2055/5ec4d4.png?text=Coming+Soon', fitsWith: ['balustrades', 'bathScreens', 'julietBalconies'], finishes: [], brand: 'CRL' },
  { id: 'acc-primer-glass-metal-250', name: 'Glass & Metal Primer 250ml', category: 'sealantsCleaning', shortDesc: 'Primer for improving adhesion of sealants to glass and metal surfaces. 250ml bottle with applicator.', priceFrom: 10, priceTo: null, priceDisplay: '£10.00', image: 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102', fitsWith: ['balustrades', 'bathScreens'], finishes: [], brand: 'CRL' },
];

// ─── Sale Pricing Helper ─────────────────────────────────────

function withSalePricing(product) {
  const saleFrom = getSalePrice(product.priceFrom);
  const saleTo = product.priceTo ? getSalePrice(product.priceTo) : null;
  const salePriceDisplay = saleTo && saleTo !== saleFrom
    ? `£${saleFrom.toFixed(2)} – £${saleTo.toFixed(2)}`
    : `£${saleFrom.toFixed(2)}`;
  return {
    ...product,
    onSale: true,
    originalPriceFrom: product.priceFrom,
    originalPriceTo: product.priceTo,
    originalPriceDisplay: product.priceDisplay,
    priceFrom: saleFrom,
    priceTo: saleTo,
    priceDisplay: salePriceDisplay,
  };
}

// ─── Helper Functions ────────────────────────────────────────

export function getAllAccessories() {
  return [...showerAccessories, ...mirrorAccessories, ...balustradeAccessories, ...sealantsCleaning].map(withSalePricing);
}

export function getAccessoriesByCategory(category) {
  const map = { showerAccessories, mirrorAccessories, balustradeAccessories, sealantsCleaning };
  return (map[category] || []).map(withSalePricing);
}

export function getAccessoryById(id) {
  const raw = [...showerAccessories, ...mirrorAccessories, ...balustradeAccessories, ...sealantsCleaning].find((p) => p.id === id);
  return raw ? withSalePricing(raw) : undefined;
}

export function getAccessoriesForCategory(productCategory) {
  // Find accessories that "fit with" a given glass product category
  const all = getAllAccessories();
  return all.filter((a) => a.fitsWith && a.fitsWith.includes(productCategory));
}

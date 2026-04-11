#!/usr/bin/env node
// Script to update accessories.js with EGW CDN image URLs
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lib', 'accessories.js');
let content = fs.readFileSync(filePath, 'utf8');

// Image mapping: product id → EGW CDN image URL
const imageMap = {
  // ─── Shower Accessories ──────────────────────────────────
  'acc-shower-hinge-bellagio-90-wall': 'https://www.egw.co.uk/cdn/shop/products/chrome-shower-door-hinge-wall-mounted-90_1200x1200.jpg?v=1669802012',
  'acc-shower-hinge-bellagio-180-gg': 'https://www.egw.co.uk/cdn/shop/products/APH-H09_1200x655.jpg?v=1614176179',
  'acc-shower-hinge-murano-90-wall': 'https://www.egw.co.uk/cdn/shop/products/SH-NKE-H01_Bblackglasstowallhingeconcealedfixings_7478d766-325a-42b5-87fe-67b6d4411744_1200x1200.jpg?v=1672995526',
  'acc-shower-knob-round-30mm': 'https://www.egw.co.uk/cdn/shop/products/SHAPHK01-1024x559_1200x655.jpg?v=1601033349',
  'acc-shower-knob-square-30mm': 'https://www.egw.co.uk/cdn/shop/products/APH-K12_1200x655.jpg?v=1601979014',
  'acc-shower-pull-handle-tubular-300': 'https://www.egw.co.uk/cdn/shop/files/6-inch-d-shaped-shower-door-handles_1200x1200.jpg?v=1726737804',
  'acc-shower-pull-handle-square-300': 'https://www.egw.co.uk/cdn/shop/products/GGA-P05_1200x676.jpg?v=1601990013',
  'acc-shower-towel-bar-600': 'https://www.egw.co.uk/cdn/shop/products/3068SH-GGA-P01_1200x655.jpg?v=1601987806',
  'acc-shower-support-bar-round-1000': 'https://www.egw.co.uk/cdn/shop/products/SHAPHT03-AD_1200x655.jpg?v=1614770844',
  'acc-shower-support-bar-square-1200': 'https://www.egw.co.uk/cdn/shop/products/SHAPHT03-AD_1200x655.jpg?v=1614770844',
  'acc-shower-u-channel-dry-2000': 'https://www.egw.co.uk/cdn/shop/products/blackchannel_1200x1200.jpg?v=1677168098',
  'acc-shower-seal-curved-2000': 'https://www.egw.co.uk/cdn/shop/files/Translucent-Glass-To-Floor-Seals_1200x1200.webp?v=1727685845',
  'acc-shower-seal-magnetic-2000': 'https://www.egw.co.uk/cdn/shop/files/Magnetic-Seals-Main-Image_1200x1200.webp?v=1727688902',
  'acc-shower-threshold-1000': 'https://www.egw.co.uk/cdn/shop/files/Bubble-Seal-Main-Image_1200x1200.jpg?v=1727688066',
  'acc-shower-glass-clamp-square': 'https://www.egw.co.uk/cdn/shop/products/ATB-B-S-Fbrushedbalustradeclamp_1200x655.jpg?v=1601373163',

  // ─── Mirror Accessories ──────────────────────────────────
  'acc-mirror-mount-kit-professional': 'https://www.egw.co.uk/cdn/shop/products/BohleSelfSupports-BO5207331_1200x1084.jpg?v=1642782719',
  'acc-mirror-mount-kit-heavy-duty': 'https://www.egw.co.uk/cdn/shop/products/BohleSelfSupports-BO5207331_1200x1084.jpg?v=1642782719',
  'acc-mirror-adhesive-evergrip': 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102',
  'acc-mirror-adhesive-ms-polymer': 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102',
  'acc-mirror-foam-tape-roll': 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102',
  'acc-mirror-clips-ez-mount-set': 'https://www.egw.co.uk/cdn/shop/products/MirrorDomeHeadScrew_1200x894.jpg?v=1623667169',
  'acc-mirror-clips-decorative-set': 'https://www.egw.co.uk/cdn/shop/products/MirrorDomeHeadScrew_1200x894.jpg?v=1623667169',
  'acc-mirror-j-channel-2000': 'https://www.egw.co.uk/cdn/shop/products/blackchannel_1200x1200.jpg?v=1677168098',
  // Keeping local images for: defogger-pad-small, defogger-pad-large, safety-backing-film, led-strip-kit

  // ─── Balustrade Accessories ──────────────────────────────
  'acc-balustrade-clamp-square-45': 'https://www.egw.co.uk/cdn/shop/products/ATB-B-S-Fbrushedbalustradeclamp_1200x655.jpg?v=1601373163',
  'acc-balustrade-clamp-square-55': 'https://www.egw.co.uk/cdn/shop/products/ATB-B-S-Fbrushedbalustradeclamp_1200x655.jpg?v=1601373163',
  'acc-balustrade-clamp-d-shape': 'https://www.egw.co.uk/cdn/shop/products/SH-ATB-B-Dbrushedstainlesssteelroundbackbalustradeclamp_1200x655.jpg?v=1601302048',
  'acc-balustrade-railing-clamp-round': 'https://www.egw.co.uk/cdn/shop/products/2204SH-ATB-GF03_XLHeavydutystainlesssteeloffsetfitting_1200x655.jpg?v=1601380199',
  'acc-balustrade-standoff-50mm': 'https://www.egw.co.uk/cdn/shop/products/2204SH-ATB-GF03_XLHeavydutystainlesssteeloffsetfitting_1200x655.jpg?v=1601380199',
  'acc-balustrade-standoff-25mm': 'https://www.egw.co.uk/cdn/shop/products/6083SH-ATB-GF03stainlesssteeloffsetbalustradefittingonstaircase_1200x655.jpg?v=1601307818',
  'acc-balustrade-gasket-rubber-roll': 'https://www.egw.co.uk/cdn/shop/files/Bubble-Seal-Main-Image_1200x1200.jpg?v=1727688066',
  'acc-balustrade-base-shoe-2500': 'https://www.egw.co.uk/cdn/shop/products/blackchannel_1200x1200.jpg?v=1677168098',
  // Keeping local images for: handrail-round-1000, handrail-round-2000, spigot-square, post-end-cap

  // ─── Sealants & Cleaning ─────────────────────────────────
  'acc-sealant-silicone-clear-310': 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102',
  'acc-sealant-silicone-white-310': 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102',
  'acc-sealant-acrylic-clear-310': 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102',
  'acc-primer-glass-metal-250': 'https://www.egw.co.uk/cdn/shop/products/SplashbackandMirrorGlue_1200x1200.png?v=1641814102',
  // Keeping local images for: glass-spray-500, glazing-tape, easy-clean-coating, shims-setting-blocks
};

let updated = 0;
let skipped = 0;

for (const [id, newImage] of Object.entries(imageMap)) {
  // Match the product line by its unique id and replace the image value
  const idPattern = `id: '${id}'`;
  const imagePattern = /image: '[^']+'/;
  
  // Find the line containing this id
  const lines = content.split('\n');
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(idPattern)) {
      const oldLine = lines[i];
      const newLine = oldLine.replace(imagePattern, `image: '${newImage}'`);
      if (oldLine !== newLine) {
        lines[i] = newLine;
        updated++;
        found = true;
      } else {
        skipped++;
      }
      break;
    }
  }
  if (!found && !skipped) {
    console.log(`WARNING: Product ${id} not found in file`);
  }
  content = lines.join('\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Updated ${updated} product images, ${skipped} skipped (already up to date)`);
console.log(`Products keeping local images: ${47 - updated - skipped}`);

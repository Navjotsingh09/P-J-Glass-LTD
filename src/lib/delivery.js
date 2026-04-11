// UK Postcode-based delivery calculator for P&J Glass
// Based on distance zones from Romford, Essex RM6

const DELIVERY_ZONES = [
  {
    name: 'Local (Romford & Surrounding)',
    prefixes: ['RM', 'IG', 'CM'],
    price: 0,
    label: 'FREE',
    estimate: '2–3 working days',
  },
  {
    name: 'East London & Essex',
    prefixes: ['E', 'DA', 'SS', 'CO', 'EN'],
    price: 14.99,
    label: '£14.99',
    estimate: '3–5 working days',
  },
  {
    name: 'Greater London',
    prefixes: [
      'EC', 'WC', 'W', 'SW', 'SE', 'N', 'NW',
      'BR', 'CR', 'HA', 'KT', 'SM', 'TW', 'UB', 'WD',
    ],
    price: 24.99,
    label: '£24.99',
    estimate: '3–5 working days',
  },
  {
    name: 'South East England',
    prefixes: [
      'AL', 'HP', 'LU', 'SG', 'CB', 'IP', 'NR',
      'ME', 'CT', 'TN', 'BN', 'RH', 'GU', 'SL', 'RG',
      'OX', 'MK', 'NN', 'PE',
    ],
    price: 39.99,
    label: '£39.99',
    estimate: '5–7 working days',
  },
  {
    name: 'Rest of England & Wales',
    prefixes: [],
    price: 59.99,
    label: '£59.99',
    estimate: '7–10 working days',
  },
  {
    name: 'Scotland & Northern Ireland',
    prefixes: [
      'AB', 'DD', 'DG', 'EH', 'FK', 'G', 'HS', 'IV',
      'KA', 'KW', 'KY', 'ML', 'PA', 'PH', 'TD', 'ZE',
      'BT',
    ],
    price: 79.99,
    label: '£79.99',
    estimate: '10–14 working days',
  },
];

// Extra charge per heavy/large item
const HEAVY_ITEM_SURCHARGE = 15;
const HEAVY_CATEGORIES = ['balustrades', 'julietBalconies', 'bathScreens'];

export function calculateDelivery(postcode, cartItems = []) {
  if (!postcode || typeof postcode !== 'string') {
    return null;
  }

  const clean = postcode.trim().toUpperCase().replace(/\s+/g, '');

  // Basic UK postcode validation
  if (!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(clean) && !/^[A-Z]{1,2}\d[A-Z\d]?$/i.test(clean)) {
    return { error: 'Please enter a valid UK postcode' };
  }

  // Extract postcode prefix (outward code area)
  const prefix = clean.match(/^[A-Z]{1,2}/)?.[0];
  if (!prefix) return { error: 'Please enter a valid UK postcode' };

  // Also try with numbers for more specific matching
  const prefixWithNum = clean.match(/^[A-Z]{1,2}\d{0,2}/)?.[0];

  let matchedZone = null;

  for (const zone of DELIVERY_ZONES) {
    if (zone.prefixes.length === 0) continue;
    for (const zp of zone.prefixes) {
      if (prefix === zp || prefixWithNum?.startsWith(zp)) {
        matchedZone = zone;
        break;
      }
    }
    if (matchedZone) break;
  }

  // Default to "Rest of England & Wales"
  if (!matchedZone) {
    matchedZone = DELIVERY_ZONES[4];
  }

  // Calculate heavy item surcharges
  let heavySurcharge = 0;
  let heavyCount = 0;
  if (cartItems.length > 0) {
    for (const item of cartItems) {
      if (HEAVY_CATEGORIES.includes(item.category)) {
        heavyCount += item.quantity;
        heavySurcharge += HEAVY_ITEM_SURCHARGE * item.quantity;
      }
    }
  }

  const totalDelivery = matchedZone.price + heavySurcharge;

  return {
    zone: matchedZone.name,
    basePrice: matchedZone.price,
    baseLabel: matchedZone.label,
    heavySurcharge,
    heavyCount,
    total: totalDelivery,
    totalLabel: totalDelivery === 0 ? 'FREE' : `£${totalDelivery.toFixed(2)}`,
    estimate: matchedZone.estimate,
    postcode: clean,
  };
}

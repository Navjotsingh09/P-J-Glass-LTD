const https = require('https');

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Accept': 'application/json',
      }
    };
    https.get(url, options, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJSON(res.headers.location).then(resolve, reject);
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`Parse error (status ${res.statusCode}): ` + data.substring(0, 200))); }
      });
    }).on('error', reject);
  });
}

async function main() {
  let allProducts = [];
  let page = 1;
  
  while (true) {
    const url = `https://www.egw.co.uk/collections/all-products/products.json?limit=250&page=${page}`;
    console.log(`Fetching page ${page}...`);
    const data = await fetchJSON(url);
    
    if (!data.products || data.products.length === 0) break;
    
    for (const p of data.products) {
      const mainImage = p.images && p.images[0] ? p.images[0].src : null;
      const prices = p.variants.map(v => parseFloat(v.price)).filter(n => !isNaN(n));
      const minPrice = prices.length ? Math.min(...prices) : 0;
      const maxPrice = prices.length ? Math.max(...prices) : 0;
      
      allProducts.push({
        title: p.title,
        handle: p.handle,
        product_type: p.product_type || 'Uncategorized',
        image: mainImage,
        priceFrom: minPrice,
        priceTo: maxPrice,
        description: (p.body_html || '').replace(/<[^>]*>/g, '').substring(0, 200),
        tags: p.tags || [],
      });
    }
    
    console.log(`  Got ${data.products.length} products (total: ${allProducts.length})`);
    if (data.products.length < 30) break; // Shopify returns max ~30 per page
    page++;
  }
  
  // Group by product_type
  const categories = {};
  for (const p of allProducts) {
    const cat = p.product_type || 'Other';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(p);
  }
  
  console.log('\n=== CATEGORIES ===');
  for (const [cat, products] of Object.entries(categories).sort((a,b) => b[1].length - a[1].length)) {
    console.log(`${cat}: ${products.length} products`);
  }
  
  console.log(`\nTotal: ${allProducts.length} products`);
  
  // Output JSON
  const fs = require('fs');
  fs.writeFileSync(
    require('path').join(__dirname, 'egw-products.json'),
    JSON.stringify(allProducts, null, 2)
  );
  console.log('\nSaved to scripts/egw-products.json');
}

main().catch(console.error);

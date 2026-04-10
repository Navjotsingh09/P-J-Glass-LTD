const d = require('./egw-products.json');
d.slice(0, 5).forEach(p => {
  console.log(JSON.stringify({
    title: p.title,
    type: p.product_type,
    handle: p.handle,
    image: p.image,
    priceFrom: p.priceFrom,
    priceTo: p.priceTo
  }, null, 2));
});
console.log('---');
const noImg = d.filter(p => !p.image);
console.log('No image:', noImg.length);
console.log('Total:', d.length);

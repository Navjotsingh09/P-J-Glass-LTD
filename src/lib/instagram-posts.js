/**
 * Instagram posts data — fetched at build/deploy time.
 * Images are stored locally in /public/images/instagram/.
 *
 * To refresh: run `node scripts/fetch-instagram.js` then commit & push.
 */
const instagramPosts = [
  {
    id: 'DWn7TBBkp8b',
    image: '/images/instagram/DWn7TBBkp8b.jpg',
    caption: 'Site visit — on-site in Beckenham',
    permalink: 'https://www.instagram.com/p/DWn7TBBkp8b/',
    type: 'video',
  },
  {
    id: 'DWl60nWEmBD',
    image: '/images/instagram/DWl60nWEmBD.jpg',
    caption: 'On-Going Site #sitevisit #p&jrenovation #p&jglass',
    permalink: 'https://www.instagram.com/p/DWl60nWEmBD/',
    type: 'video',
  },
  {
    id: 'DWg3QA3CETR',
    image: '/images/instagram/DWg3QA3CETR.jpg',
    caption: 'Experts in home & kitchen renovation',
    permalink: 'https://www.instagram.com/p/DWg3QA3CETR/',
    type: 'image',
  },
  {
    id: 'DSsDhH3iO36',
    image: '/images/instagram/DSsDhH3iO36.jpg',
    caption: 'Christmas gives us an opportunity to pause and reflect on the important things around us.',
    permalink: 'https://www.instagram.com/p/DSsDhH3iO36/',
    type: 'image',
  },
  {
    id: 'DSXHLkjCCas',
    image: '/images/instagram/DSXHLkjCCas.jpg',
    caption: 'Recent project — premium glass installation',
    permalink: 'https://www.instagram.com/p/DSXHLkjCCas/',
    type: 'image',
  },
  {
    id: 'DSUV2rECPrt',
    image: '/images/instagram/DSUV2rECPrt.jpg',
    caption: 'Shower glass enclosure — custom made to measure',
    permalink: 'https://www.instagram.com/p/DSUV2rECPrt/',
    type: 'carousel',
  },
];

export default instagramPosts;

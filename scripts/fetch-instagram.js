#!/usr/bin/env node
/**
 * Fetch latest Instagram posts for @pj_glasslimited.
 *
 * Usage: node scripts/fetch-instagram.js
 *
 * This script:
 * 1. Fetches the embed page to discover recent post shortcodes
 * 2. Downloads og:image for each post into public/images/instagram/
 * 3. Updates src/lib/instagram-posts.js with the new data
 *
 * Run this whenever you want to refresh the Instagram feed on the site,
 * then commit and push to deploy.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const USERNAME = 'pj_glasslimited';
const EMBED_URL = `https://www.instagram.com/${USERNAME}/embed/`;
const BOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const IMG_DIR = path.join(__dirname, '..', 'public', 'images', 'instagram');
const DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'instagram-posts.js');

function fetchURL(url, ua) {
  return new Promise((resolve, reject) => {
    const options = { headers: { 'User-Agent': ua || BOT_UA, Accept: 'text/html' } };
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchURL(res.headers.location, ua).then(resolve, reject);
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': BOT_UA } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve, reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', reject);
    }).on('error', reject);
  });
}

async function getShortcodesFromEmbed() {
  console.log('Fetching embed page...');
  const html = await fetchURL(EMBED_URL);

  // Unescape double-escaped JSON
  const cleaned = html.replace(/\\\\"/g, '"').replace(/\\"/g, '"').replace(/\\\\\//g, '/').replace(/\\\//g, '/');

  // Find shortcode_media blocks (top-level posts only, not carousel children)
  const seen = new Set();
  const posts = [];
  const pattern = /"shortcode_media":\{"__typename":"(\w+)"[^}]*?"shortcode":"([A-Za-z0-9_-]+)"/g;
  let m;
  while ((m = pattern.exec(cleaned)) !== null) {
    const [, typename, sc] = m;
    if (!seen.has(sc)) {
      seen.add(sc);
      posts.push({ shortcode: sc, type: typename });
    }
  }

  console.log(`Found ${posts.length} posts from embed page`);
  return posts;
}

async function getPostDetails(shortcode) {
  const url = `https://www.instagram.com/p/${shortcode}/`;
  const html = await fetchURL(url);

  const imageMatch = html.match(/property="og:image"\s*content="([^"]+)"/);
  const descMatch = html.match(/property="og:description"\s*content="([^"]+)"/);

  const image = imageMatch ? imageMatch[1].replace(/&amp;/g, '&') : null;

  let caption = '';
  if (descMatch) {
    const desc = descMatch[1].replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&quot;/g, '"');
    const capMatch = desc.match(/:\s*["\u201c](.+)/);
    if (capMatch) caption = capMatch[1].replace(/["\u201d]\s*\.?\s*$/, '');
  }

  return { image, caption };
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });

  const posts = await getShortcodesFromEmbed();
  if (posts.length === 0) {
    console.error('No posts found! Instagram may be blocking. Try again later.');
    process.exit(1);
  }

  const results = [];

  for (const { shortcode, type } of posts.slice(0, 8)) {
    process.stdout.write(`  ${shortcode} (${type})... `);
    try {
      const details = await getPostDetails(shortcode);
      if (details.image) {
        const dest = path.join(IMG_DIR, `${shortcode}.jpg`);
        await downloadFile(details.image, dest);
        const size = fs.statSync(dest).size;
        console.log(`OK (${(size / 1024).toFixed(0)}KB) - ${details.caption.slice(0, 50) || '(no caption)'}`);

        const typeMap = { GraphImage: 'image', GraphVideo: 'video', GraphSidecar: 'carousel' };
        results.push({
          id: shortcode,
          image: `/images/instagram/${shortcode}.jpg`,
          caption: details.caption,
          permalink: `https://www.instagram.com/p/${shortcode}/`,
          type: typeMap[type] || 'image',
        });
      } else {
        console.log('SKIP (no image)');
      }
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
    }
  }

  // Write data file
  const jsContent = `/**
 * Instagram posts data — fetched at build/deploy time.
 * Images are stored locally in /public/images/instagram/.
 *
 * To refresh: run \`node scripts/fetch-instagram.js\` then commit & push.
 */
const instagramPosts = ${JSON.stringify(results, null, 2)};

export default instagramPosts;
`;

  fs.writeFileSync(DATA_FILE, jsContent);
  console.log(`\nDone! Updated ${results.length} posts in src/lib/instagram-posts.js`);
  console.log('Commit and push to deploy.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

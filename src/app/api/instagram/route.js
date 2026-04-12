import { NextResponse } from 'next/server';

// In-memory cache — refreshed every 6 hours
let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 1000 * 60 * 60 * 6; // 6 hours

const INSTAGRAM_USERNAME = 'pj_glasslimited';
const PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
const EMBED_URL = `${PROFILE_URL}embed/`;
const BOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

export async function GET() {
  // Return cached data if still fresh
  if (cache.data && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    // Step 1: Get list of post shortcodes from the profile embed page
    let shortcodes = await fetchShortcodesFromEmbed();

    // If embed scraping fails, use the hardcoded recent posts as fallback
    if (shortcodes.length === 0) {
      shortcodes = KNOWN_SHORTCODES;
    }

    // Step 2: For each shortcode, fetch the og:image from the post page
    // (This always works — Instagram serves og:image to crawlers)
    const posts = await fetchPostDetails(shortcodes.slice(0, 8));

    if (posts.length > 0) {
      cache = { data: { posts }, timestamp: Date.now() };
      return NextResponse.json({ posts });
    }

    return NextResponse.json({ posts: [] });
  } catch (err) {
    console.error('Instagram feed error:', err.message);
    return NextResponse.json({ posts: [] });
  }
}

/**
 * Fetch shortcodes from the Instagram profile embed page.
 * Returns an array of shortcode strings.
 */
async function fetchShortcodesFromEmbed() {
  try {
    const res = await fetch(EMBED_URL, {
      headers: {
        'User-Agent': BOT_UA,
        Accept: 'text/html',
        'Accept-Language': 'en-GB,en;q=0.9',
        Cookie: 'ig_cb=2',
      },
    });

    if (!res.ok) return [];

    const html = await res.text();

    // Unescape the double-escaped JSON in the embed page
    const cleaned = html
      .replace(/\\\\"/g, '"')
      .replace(/\\"/g, '"')
      .replace(/\\\\\//g, '/')
      .replace(/\\\//g, '/');

    // Extract unique shortcodes from shortcode_media blocks
    const seen = new Set();
    const shortcodes = [];
    const pattern = /"shortcode":"([A-Za-z0-9_-]{10,})"/g;
    let m;
    while ((m = pattern.exec(cleaned)) !== null) {
      if (!seen.has(m[1])) {
        seen.add(m[1]);
        shortcodes.push(m[1]);
      }
    }

    return shortcodes;
  } catch {
    return [];
  }
}

/**
 * For each shortcode, fetch the post page and extract og:image + og:description.
 * Instagram always serves og:image meta tags for individual posts (crawler-accessible).
 */
async function fetchPostDetails(shortcodes) {
  const results = await Promise.allSettled(
    shortcodes.map(async (shortcode) => {
      const url = `https://www.instagram.com/p/${shortcode}/`;
      const res = await fetch(url, {
        headers: { 'User-Agent': BOT_UA, Accept: 'text/html' },
      });

      if (!res.ok) return null;

      const html = await res.text();

      // Extract og:image
      const imageMatch = html.match(
        /property="og:image"\s*content="([^"]+)"/
      );
      if (!imageMatch) return null;

      // Extract og:description (contains likes, date, caption snippet)
      const descMatch = html.match(
        /property="og:description"\s*content="([^"]+)"/
      );

      // Clean the image URL (unescape HTML entities)
      const image = imageMatch[1]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      // Parse caption from og:description
      // Format: "X likes, Y comments - username on DATE: CAPTION"
      let caption = '';
      if (descMatch) {
        const desc = descMatch[1].replace(/&amp;/g, '&').replace(/&#039;/g, "'");
        const captionMatch = desc.match(/:\s*["\u201c](.+)/);
        if (captionMatch) {
          caption = captionMatch[1].replace(/["\u201d]$/, '');
        }
      }

      return {
        id: shortcode,
        shortcode,
        image,
        caption,
        permalink: url,
      };
    })
  );

  return results
    .filter((r) => r.status === 'fulfilled' && r.value)
    .map((r) => r.value);
}

// Known recent shortcodes — used as fallback when embed scraping fails.
// Update periodically or whenever new posts are published.
const KNOWN_SHORTCODES = [
  'DWn7TBBkp8b',
  'DWl60nWEmBD',
  'DWg3QA3CETR',
  'DSsDhH3iO36',
  'DSXHLkjCCas',
  'DSUV2rECPrt',
];

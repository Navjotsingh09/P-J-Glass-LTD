import { NextResponse } from 'next/server';

// In-memory cache — scraping is expensive, cache for 2 hours
let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 1000 * 60 * 120; // 2 hours

const INSTAGRAM_USERNAME = 'pj_glasslimited';
const EMBED_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/embed/`;

export async function GET() {
  // Return cached data if fresh
  if (cache.data && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    const res = await fetch(EMBED_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-GB,en;q=0.9',
      },
      next: { revalidate: 7200 },
    });

    if (!res.ok) {
      console.error('Instagram embed fetch failed:', res.status);
      return NextResponse.json({ posts: [] });
    }

    const html = await res.text();
    const posts = parseEmbedHTML(html);

    if (posts.length > 0) {
      cache = { data: { posts }, timestamp: Date.now() };
      return NextResponse.json({ posts });
    }

    return NextResponse.json({ posts: [] });
  } catch (err) {
    console.error('Instagram scrape error:', err.message);
    return NextResponse.json({ posts: [] });
  }
}

/**
 * Parse Instagram's embed page HTML to extract post data.
 * The embed page contains escaped JSON with graphql_media data.
 */
function parseEmbedHTML(html) {
  const posts = [];
  const seen = new Set();

  // The embed HTML contains double-escaped JSON. Unescape it.
  let cleaned = html
    .replace(/\\\\"/g, '"')
    .replace(/\\"/g, '"')
    .replace(/\\\\\//g, '/')
    .replace(/\\\//g, '/')
    .replace(/\\\\u0026/g, '&')
    .replace(/\\u0026/g, '&');

  // Find all shortcode_media blocks
  const pattern =
    /"shortcode_media":\{"__typename":"(\w+)","id":"(\d+)","shortcode":"([^"]+)"/g;
  let match;

  while ((match = pattern.exec(cleaned)) !== null) {
    const [, typename, id, shortcode] = match;
    if (seen.has(shortcode)) continue;
    seen.add(shortcode);

    // Extract fields from the text after this match
    const rest = cleaned.slice(match.index, match.index + 8000);

    const displayUrl = extractField(rest, /"display_url":"(https:\/\/[^"]+)"/);
    const timestamp = extractField(rest, /"taken_at_timestamp":(\d+)/);
    const caption = extractField(
      rest,
      /"edge_media_to_caption".*?"text":"([^"]*)"/
    );

    if (!displayUrl) continue; // Skip posts without an image URL

    posts.push({
      id,
      shortcode,
      type: typename,
      image: displayUrl,
      caption: caption || '',
      permalink: `https://www.instagram.com/p/${shortcode}/`,
      timestamp: timestamp ? Number(timestamp) : null,
    });

    if (posts.length >= 8) break;
  }

  return posts;
}

function extractField(text, regex) {
  const m = text.match(regex);
  return m ? m[1] : null;
}

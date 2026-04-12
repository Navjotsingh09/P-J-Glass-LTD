import { NextResponse } from 'next/server';

// In-memory cache to avoid hitting Instagram API on every request
let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export async function GET() {
  // Return cached data if fresh
  if (cache.data && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Instagram token not configured', posts: [] }, { status: 200 });
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${token}`,
      { next: { revalidate: 1800 } }
    );

    if (!res.ok) {
      // If token expired, try to refresh it
      if (res.status === 400) {
        const refreshed = await refreshToken(token);
        if (refreshed) {
          // Retry with refreshed token
          const retryRes = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${refreshed}`
          );
          if (retryRes.ok) {
            const retryData = await retryRes.json();
            const posts = formatPosts(retryData.data);
            cache = { data: { posts }, timestamp: Date.now() };
            return NextResponse.json({ posts });
          }
        }
      }
      console.error('Instagram API error:', res.status, await res.text());
      return NextResponse.json({ error: 'Failed to fetch Instagram posts', posts: [] }, { status: 200 });
    }

    const data = await res.json();
    const posts = formatPosts(data.data);

    // Cache the result
    cache = { data: { posts }, timestamp: Date.now() };

    return NextResponse.json({ posts });
  } catch (err) {
    console.error('Instagram fetch error:', err);
    return NextResponse.json({ error: 'Instagram fetch failed', posts: [] }, { status: 200 });
  }
}

function formatPosts(rawPosts) {
  if (!rawPosts) return [];
  return rawPosts
    .filter((p) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      image: p.media_url,
      thumbnail: p.thumbnail_url || p.media_url,
      caption: p.caption || '',
      permalink: p.permalink,
      timestamp: p.timestamp,
    }));
}

async function refreshToken(token) {
  try {
    const res = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    );
    if (res.ok) {
      const data = await res.json();
      // Note: In production, you'd store the new token in a database or env management
      console.log('Instagram token refreshed. New token expires in', data.expires_in, 'seconds');
      return data.access_token;
    }
  } catch (err) {
    console.error('Token refresh failed:', err);
  }
  return null;
}

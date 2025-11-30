// Genius API Client for Lyrics
const GENIUS_API_KEY = import.meta.env.VITE_GENIUS_API_KEY;
const GENIUS_BASE_URL = 'https://api.genius.com';

export const searchGenius = async (query: string) => {
  if (!GENIUS_API_KEY) {
    console.warn('Genius API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${GENIUS_BASE_URL}/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${GENIUS_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch lyrics');
    }

    const data = await response.json();
    return data.response.hits;
  } catch (error) {
    console.error('Genius API error:', error);
    return null;
  }
};

export const getLyrics = async (songTitle: string, artistName: string) => {
  const hits = await searchGenius(`${songTitle} ${artistName}`);
  
  if (!hits || hits.length === 0) {
    return {
      found: false,
      lyrics: 'Lyrics not available',
      url: null,
    };
  }

  const topHit = hits[0].result;
  
  return {
    found: true,
    lyrics: 'Visit Genius.com to view full lyrics',
    url: topHit.url,
    title: topHit.title,
    artist: topHit.primary_artist.name,
    thumbnail: topHit.song_art_image_thumbnail_url,
  };
};

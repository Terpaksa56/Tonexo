// Spotify API Client with OAuth
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/callback`;
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'user-library-read',
  'user-library-modify',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
].join(' ');

export const getAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    show_dialog: 'true',
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
};

export const getSpotifyApi = (token: string) => {
  const baseUrl = 'https://api.spotify.com/v1';

  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  };

  return {
    getCurrentUser: () => fetchWithAuth('/me'),
    getUserPlaylists: (limit = 20) => fetchWithAuth(`/me/playlists?limit=${limit}`),
    getPlaylist: (id: string) => fetchWithAuth(`/playlists/${id}`),
    search: (query: string, type = 'track,album,artist,playlist', limit = 20) =>
      fetchWithAuth(`/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`),
    getFeaturedPlaylists: (limit = 20) => fetchWithAuth(`/browse/featured-playlists?limit=${limit}`),
    getNewReleases: (limit = 20) => fetchWithAuth(`/browse/new-releases?limit=${limit}`),
    getTrack: (id: string) => fetchWithAuth(`/tracks/${id}`),
    play: (deviceId: string, uris?: string[], contextUri?: string, offset?: number) => {
      const body: any = {};
      if (uris) body.uris = uris;
      if (contextUri) body.context_uri = contextUri;
      if (offset !== undefined) body.offset = { position: offset };

      return fetch(`${baseUrl}/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
    pause: (deviceId: string) =>
      fetch(`${baseUrl}/me/player/pause?device_id=${deviceId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }),
    skipToNext: (deviceId: string) =>
      fetch(`${baseUrl}/me/player/next?device_id=${deviceId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
    skipToPrevious: (deviceId: string) =>
      fetch(`${baseUrl}/me/player/previous?device_id=${deviceId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
    seek: (deviceId: string, positionMs: number) =>
      fetch(`${baseUrl}/me/player/seek?position_ms=${positionMs}&device_id=${deviceId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }),
    setVolume: (deviceId: string, volumePercent: number) =>
      fetch(`${baseUrl}/me/player/volume?volume_percent=${volumePercent}&device_id=${deviceId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }),
  };
};

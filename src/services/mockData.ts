export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
}

export const mockTracks: Track[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    album: "Nocturnal Sessions",
    duration: "3:45",
    coverUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Electric Sunrise",
    artist: "Neon Pulse",
    album: "Digital Horizons",
    duration: "4:12",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Cosmic Voyage",
    artist: "Stellar Waves",
    album: "Beyond the Stars",
    duration: "5:23",
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Urban Jungle",
    artist: "City Beats",
    album: "Metro Vibes",
    duration: "3:58",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Ocean Whispers",
    artist: "Blue Horizon",
    album: "Tidal Waves",
    duration: "4:30",
    coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Today's Top Hits",
    description: "The hottest tracks right now",
    coverUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=400&fit=crop",
    tracks: mockTracks.slice(0, 3),
  },
  {
    id: "2",
    name: "Chill Vibes",
    description: "Relax and unwind with these calm tracks",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    tracks: mockTracks.slice(2, 5),
  },
  {
    id: "3",
    name: "Workout Mix",
    description: "High energy tracks to keep you motivated",
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    tracks: mockTracks,
  },
  {
    id: "4",
    name: "Focus Flow",
    description: "Instrumental beats for productivity",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    tracks: mockTracks.slice(1, 4),
  },
  {
    id: "5",
    name: "Night Drive",
    description: "Perfect soundtrack for late-night cruising",
    coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
    tracks: mockTracks.slice(0, 4),
  },
  {
    id: "6",
    name: "Acoustic Sessions",
    description: "Stripped down and authentic",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    tracks: mockTracks.slice(2),
  },
];

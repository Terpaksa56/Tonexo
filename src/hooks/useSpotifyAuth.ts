import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpotifyAuthState {
  token: string | null;
  user: any | null;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
  logout: () => void;
}

export const useSpotifyAuth = create<SpotifyAuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'spotify-auth',
    }
  )
);

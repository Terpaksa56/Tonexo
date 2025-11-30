import { create } from 'zustand';
import { Track } from '@/services/mockData';

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  progress: number;
  volume: number;
  repeat: 'off' | 'context' | 'track';
  shuffle: boolean;
  showLyrics: boolean;
  showQueue: boolean;
  setCurrentTrack: (track: Track) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlayPause: () => void;
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  toggleLyrics: () => void;
  toggleQueue: () => void;
}

export const usePlayer = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  progress: 0,
  volume: 70,
  repeat: 'off',
  shuffle: false,
  showLyrics: false,
  showQueue: false,
  
  setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true, progress: 0 }),
  
  addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
  
  removeFromQueue: (trackId) => set((state) => ({
    queue: state.queue.filter((t) => t.id !== trackId),
  })),
  
  clearQueue: () => set({ queue: [] }),
  
  playNext: () => {
    const state = get();
    if (state.queue.length > 0) {
      const [nextTrack, ...remainingQueue] = state.queue;
      set({ currentTrack: nextTrack, queue: remainingQueue, isPlaying: true, progress: 0 });
    }
  },
  
  playPrevious: () => {
    set({ progress: 0 });
  },
  
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setProgress: (progress) => set({ progress }),
  
  setVolume: (volume) => set({ volume }),
  
  toggleRepeat: () => set((state) => ({
    repeat: state.repeat === 'off' ? 'context' : state.repeat === 'context' ? 'track' : 'off',
  })),
  
  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
  
  toggleLyrics: () => set((state) => ({ showLyrics: !state.showLyrics })),
  
  toggleQueue: () => set((state) => ({ showQueue: !state.showQueue })),
}));

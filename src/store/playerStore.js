import { create } from "zustand";

export const usePlayerStore = create(set => ({
    isPlaying: false,
    currentMusic: { playlist:null, song:null, songs: [] },
    setIsPlaying: (isPlaying) => set({isPlaying}),
    setCurrentMusic: currentMusic => set({currentMusic}),
    volume: 1,
    setVolume: volume => set({volume}),
    random: false,
    setRandom: random => set({random}),
    queue: null,
    setQueue: queue => set({queue}),
}))
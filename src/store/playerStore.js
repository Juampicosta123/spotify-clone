import { create } from "zustand";

export const usePlayerStore = create(set => ({
    isPlaying: false,
    setIsPlaying: (isPlaying) => set({isPlaying}),
    volume: 0.7,
    setVolume: volume => set({volume}),
    random: false,
    setRandom: random => set({random}),
    queue: null,
    setQueue: queue => set({queue}),
}))
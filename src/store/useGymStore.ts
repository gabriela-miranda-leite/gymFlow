import { create } from 'zustand';

import type { OccupancyLevel } from '@/tokens';

interface Gym {
  id: string;
  name: string;
  address: string;
  occupancy: OccupancyLevel;
}

interface GymState {
  gyms: Gym[];
  favoriteIds: string[];
  currentOccupancy: Record<string, OccupancyLevel>;
  setGyms: (gyms: Gym[]) => void;
  toggleFavorite: (gymId: string) => void;
  setOccupancy: (gymId: string, level: OccupancyLevel) => void;
}

export const useGymStore = create<GymState>((set) => ({
  gyms: [],
  favoriteIds: [],
  currentOccupancy: {},

  setGyms: (gyms) => set({ gyms }),

  toggleFavorite: (gymId) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(gymId)
        ? state.favoriteIds.filter((id) => id !== gymId)
        : [...state.favoriteIds, gymId],
    })),

  setOccupancy: (gymId, level) =>
    set((state) => ({
      currentOccupancy: { ...state.currentOccupancy, [gymId]: level },
    })),
}));

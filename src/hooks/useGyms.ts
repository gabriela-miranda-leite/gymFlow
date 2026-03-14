import { useQuery } from '@tanstack/react-query';

import { Config } from '@/config/env';
import type { OccupancyLevel } from '@/tokens';

interface Gym {
  id: string;
  name: string;
  address: string;
  occupancy: OccupancyLevel;
}

async function fetchGyms(): Promise<Gym[]> {
  const response = await fetch(`${Config.apiUrl}/gyms`);
  if (!response.ok) {
    throw new Error('Falha ao buscar academias');
  }
  return response.json() as Promise<Gym[]>;
}

export function useGyms() {
  return useQuery<Gym[], Error>({
    queryKey: ['gyms'],
    queryFn: fetchGyms,
    enabled: Boolean(Config.apiUrl),
  });
}

import { useQuery } from '@tanstack/react-query';

import { Config } from '@/config/env';
import { apiClient } from '@/data/services/apiClient';
import { useTranslation } from '@/shared/i18n';
import type { OccupancyLevel } from '@/tokens';

interface Gym {
  id: string;
  name: string;
  address: string;
  occupancy: OccupancyLevel;
}

export function useGyms() {
  const { t } = useTranslation();

  return useQuery<Gym[], Error>({
    queryKey: ['gyms'],
    queryFn: async () => {
      try {
        return await apiClient.get<Gym[]>('/gyms');
      } catch {
        throw new Error(t('errors.fetchGyms'));
      }
    },
    enabled: Boolean(Config.apiUrl),
  });
}

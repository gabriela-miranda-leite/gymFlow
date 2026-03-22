import type { GymModel } from '@/domain/models/GymModel'
import type { IGymRepository } from '@/domain/useCases/GetNearbyGymsUseCase'

const MOCK_GYMS: GymModel[] = [
  {
    id: '1',
    name: 'Smart Fit – Paulista',
    address: 'Av. Paulista, 1374 – Bela Vista, São Paulo',
    rating: 4.2,
    distanceMeters: 350,
    openingHours: '06:00 – 22:00',
    isOpen: true,
    tags: ['Musculação', 'Cardio', 'Funcional'],
    coordinates: { latitude: -23.565, longitude: -46.6525 },
    occupancy: 'moderate',
  },
  {
    id: '2',
    name: 'Bodytech – Itaim Bibi',
    address: 'R. Leopoldo Couto de Magalhães Jr., 758 – Itaim Bibi',
    rating: 4.7,
    distanceMeters: 820,
    openingHours: '06:00 – 23:00',
    isOpen: true,
    tags: ['Musculação', 'Pilates', 'Natação'],
    coordinates: { latitude: -23.5832, longitude: -46.6765 },
    occupancy: 'busy',
  },
  {
    id: '3',
    name: 'Academia Opera',
    address: 'R. Augusta, 2022 – Consolação, São Paulo',
    rating: 3.9,
    distanceMeters: 1200,
    openingHours: '07:00 – 21:00',
    isOpen: false,
    tags: ['Musculação', 'Yoga'],
    coordinates: { latitude: -23.5558, longitude: -46.6608 },
    occupancy: 'empty',
  },
  {
    id: '4',
    name: 'Cross Endurance',
    address: 'R. Haddock Lobo, 595 – Cerqueira César',
    rating: 4.8,
    distanceMeters: 500,
    openingHours: '06:00 – 22:00',
    isOpen: true,
    tags: ['CrossFit', 'Funcional', 'HIIT'],
    coordinates: { latitude: -23.5592, longitude: -46.6672 },
    occupancy: 'packed',
  },
  {
    id: '5',
    name: 'Revo Fitness',
    address: 'Av. Rebouças, 1585 – Pinheiros, São Paulo',
    rating: 4.4,
    distanceMeters: 1600,
    openingHours: '06:00 – 22:30',
    isOpen: true,
    tags: ['Musculação', 'Cardio', 'Spinning'],
    coordinates: { latitude: -23.5631, longitude: -46.678 },
    occupancy: 'moderate',
  },
]

export const gymRepository: IGymRepository = {
  async getNearby(): Promise<GymModel[]> {
    // todo: substituir por chamada real à API
    await new Promise((resolve) => setTimeout(resolve, 600))
    return MOCK_GYMS
  },
}

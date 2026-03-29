import type { GymModel } from '@/domain/models/GymModel'
import type { IGymRepository } from '@/domain/useCases/GetNearbyGymsUseCase'

const MOCK_GYMS: GymModel[] = [
  {
    id: '1',
    name: 'Smart Fit – Uberlândia Shopping',
    address: 'Av. Rondon Pacheco, 4600 – Tibery, Uberlândia',
    rating: 4.3,
    distanceMeters: 400,
    openingHours: '06:00 – 22:00',
    isOpen: true,
    tags: ['Musculação', 'Cardio', 'Funcional'],
    coordinates: { latitude: -18.9042, longitude: -48.2694 },
    occupancy: 'moderate',
  },
  {
    id: '2',
    name: 'Bodytech – Uberlândia',
    address: 'Av. Getúlio Vargas, 982 – Centro, Uberlândia',
    rating: 4.6,
    distanceMeters: 750,
    openingHours: '06:00 – 23:00',
    isOpen: true,
    tags: ['Musculação', 'Pilates', 'Natação'],
    coordinates: { latitude: -18.9186, longitude: -48.2772 },
    occupancy: 'busy',
  },
  {
    id: '3',
    name: 'Fórmula Academia',
    address: 'R. Olegário Maciel, 567 – Centro, Uberlândia',
    rating: 4.0,
    distanceMeters: 1100,
    openingHours: '07:00 – 21:00',
    isOpen: false,
    tags: ['Musculação', 'Yoga'],
    coordinates: { latitude: -18.9213, longitude: -48.2801 },
    occupancy: 'empty',
  },
  {
    id: '4',
    name: 'CrossFit Uberlândia',
    address: 'R. Goiás, 1200 – Saraiva, Uberlândia',
    rating: 4.9,
    distanceMeters: 550,
    openingHours: '06:00 – 22:00',
    isOpen: true,
    tags: ['CrossFit', 'Funcional', 'HIIT'],
    coordinates: { latitude: -18.9158, longitude: -48.2659 },
    occupancy: 'packed',
  },
  {
    id: '5',
    name: 'Olympo Fitness',
    address: 'Av. João Naves de Ávila, 2121 – Santa Mônica, Uberlândia',
    rating: 4.5,
    distanceMeters: 1400,
    openingHours: '06:00 – 22:30',
    isOpen: true,
    tags: ['Musculação', 'Cardio', 'Spinning'],
    coordinates: { latitude: -18.9097, longitude: -48.2583 },
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

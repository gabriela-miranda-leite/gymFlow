import type { GymModel, HourlyFlowEntry } from '@/domain/models/GymModel'
import type { IGymByIdRepository } from '@/domain/useCases/getGymById/GetGymByIdUseCase'
import type { IGymRepository } from '@/domain/useCases/getNearbyGyms/GetNearbyGymsUseCase'

function makeWeeklyFlow(peakPercent: number): Record<number, HourlyFlowEntry[]> {
  const hours = Array.from({ length: 24 }, (_, h) => h)

  function dayFlow(scale: number): HourlyFlowEntry[] {
    const curve: Record<number, number> = {
      0: 2,
      1: 1,
      2: 1,
      3: 1,
      4: 2,
      5: 5,
      6: 35,
      7: 65,
      8: 70,
      9: 60,
      10: 50,
      11: 55,
      12: 45,
      13: 40,
      14: 35,
      15: 40,
      16: 55,
      17: 80,
      18: 90,
      19: 95,
      20: 85,
      21: 60,
      22: 30,
      23: 10,
    }
    return hours.map((h) => ({
      hour: h,
      occupancyPercent: Math.round((curve[h] ?? 0) * scale * (peakPercent / 100)),
    }))
  }

  return {
    0: dayFlow(0.5), // Sunday
    1: dayFlow(1.0), // Monday
    2: dayFlow(0.9), // Tuesday
    3: dayFlow(1.0), // Wednesday
    4: dayFlow(0.85), // Thursday
    5: dayFlow(0.8), // Friday
    6: dayFlow(0.6), // Saturday
  }
}

const MOCK_GYMS: GymModel[] = [
  {
    id: '1',
    name: 'Smart Fit – Uberlândia Shopping',
    address: 'Av. Rondon Pacheco, 4600 – Tibery, Uberlândia',
    rating: 4.3,
    reviewCount: 214,
    distanceMeters: 400,
    openingHours: '06:00 – 22:00',
    isOpen: true,
    tags: ['Musculação', 'Cardio', 'Funcional'],
    coordinates: { latitude: -18.9042, longitude: -48.2694 },
    occupancy: 'moderate',
    occupancyPercent: 55,
    isFavorite: true,
    lastUpdatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    weeklyFlow: makeWeeklyFlow(80),
  },
  {
    id: '2',
    name: 'Bodytech – Uberlândia',
    address: 'Av. Getúlio Vargas, 982 – Centro, Uberlândia',
    rating: 4.6,
    reviewCount: 328,
    distanceMeters: 750,
    openingHours: '06:00 – 23:00',
    isOpen: true,
    tags: ['Musculação', 'Pilates', 'Natação'],
    coordinates: { latitude: -18.9186, longitude: -48.2772 },
    occupancy: 'busy',
    occupancyPercent: 78,
    isFavorite: false,
    lastUpdatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    weeklyFlow: makeWeeklyFlow(95),
  },
  {
    id: '3',
    name: 'Fórmula Academia',
    address: 'R. Olegário Maciel, 567 – Centro, Uberlândia',
    rating: 4.0,
    reviewCount: 89,
    distanceMeters: 1100,
    openingHours: '07:00 – 21:00',
    isOpen: false,
    tags: ['Musculação', 'Yoga'],
    coordinates: { latitude: -18.9213, longitude: -48.2801 },
    occupancy: 'empty',
    occupancyPercent: 12,
    isFavorite: false,
    lastUpdatedAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    weeklyFlow: makeWeeklyFlow(60),
  },
  {
    id: '4',
    name: 'CrossFit Uberlândia',
    address: 'R. Goiás, 1200 – Saraiva, Uberlândia',
    rating: 4.9,
    reviewCount: 512,
    distanceMeters: 550,
    openingHours: '06:00 – 22:00',
    isOpen: true,
    tags: ['CrossFit', 'Funcional', 'HIIT'],
    coordinates: { latitude: -18.9158, longitude: -48.2659 },
    occupancy: 'packed',
    occupancyPercent: 97,
    isFavorite: true,
    lastUpdatedAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    weeklyFlow: makeWeeklyFlow(100),
  },
  {
    id: '5',
    name: 'Olympo Fitness',
    address: 'Av. João Naves de Ávila, 2121 – Santa Mônica, Uberlândia',
    rating: 4.5,
    reviewCount: 176,
    distanceMeters: 1400,
    openingHours: '06:00 – 22:30',
    isOpen: true,
    tags: ['Musculação', 'Cardio', 'Spinning'],
    coordinates: { latitude: -18.9097, longitude: -48.2583 },
    occupancy: 'moderate',
    occupancyPercent: 48,
    isFavorite: false,
    lastUpdatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    weeklyFlow: makeWeeklyFlow(75),
  },
]

export const gymRepository: IGymRepository & IGymByIdRepository = {
  async getNearby(): Promise<GymModel[]> {
    // todo: substituir por chamada real à API
    await new Promise((resolve) => setTimeout(resolve, 600))
    return MOCK_GYMS
  },
  async getById(id: string): Promise<GymModel | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return MOCK_GYMS.find((g) => g.id === id)
  },
}

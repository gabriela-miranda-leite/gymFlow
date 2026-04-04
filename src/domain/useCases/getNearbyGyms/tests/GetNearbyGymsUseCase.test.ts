import type { GymModel } from '@/domain/models/GymModel'
import type { IGymRepository } from '@/domain/useCases/getNearbyGyms/GetNearbyGymsUseCase'
import { getNearbyGymsUseCase } from '@/domain/useCases/getNearbyGyms/GetNearbyGymsUseCase'

const mockGym: GymModel = {
  id: 'gym-1',
  name: 'Academia Teste',
  address: 'Rua Teste, 123',
  rating: 4.5,
  reviewCount: 100,
  distanceMeters: 500,
  openingHours: '06:00 - 22:00',
  isOpen: true,
  tags: ['musculação'],
  coordinates: { latitude: -23.5, longitude: -46.6 },
  occupancy: 'moderate',
  occupancyPercent: 50,
  isFavorite: false,
  lastUpdatedAt: '2026-04-04T00:00:00.000Z',
  weeklyFlow: {},
}

const mockRepository: IGymRepository = {
  getNearby: jest.fn(),
}

const coordinates = { latitude: -23.5, longitude: -46.6 }

describe('getNearbyGymsUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls repository.getNearby with the correct coordinates', async () => {
    ;(mockRepository.getNearby as jest.Mock).mockResolvedValueOnce([mockGym])

    await getNearbyGymsUseCase(coordinates, mockRepository)

    expect(mockRepository.getNearby).toHaveBeenCalledWith(coordinates)
  })

  it('returns the list of gyms from the repository', async () => {
    ;(mockRepository.getNearby as jest.Mock).mockResolvedValueOnce([mockGym])

    const result = await getNearbyGymsUseCase(coordinates, mockRepository)

    expect(result).toEqual([mockGym])
  })

  it('returns an empty list when there are no nearby gyms', async () => {
    ;(mockRepository.getNearby as jest.Mock).mockResolvedValueOnce([])

    const result = await getNearbyGymsUseCase(coordinates, mockRepository)

    expect(result).toEqual([])
  })

  it('propagates errors from the repository', async () => {
    ;(mockRepository.getNearby as jest.Mock).mockRejectedValueOnce(new Error('network error'))

    await expect(getNearbyGymsUseCase(coordinates, mockRepository)).rejects.toThrow('network error')
  })
})

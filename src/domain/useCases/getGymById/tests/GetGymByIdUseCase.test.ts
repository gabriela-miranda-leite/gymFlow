import type { GymModel } from '@/domain/models/GymModel'
import type { IGymByIdRepository } from '@/domain/useCases/getGymById/GetGymByIdUseCase'
import { getGymByIdUseCase } from '@/domain/useCases/getGymById/GetGymByIdUseCase'

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

const mockRepository: IGymByIdRepository = {
  getById: jest.fn(),
}

describe('getGymByIdUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('retorna a academia quando o repositório a encontra', async () => {
    ;(mockRepository.getById as jest.Mock).mockResolvedValueOnce(mockGym)

    const result = await getGymByIdUseCase('gym-1', mockRepository)

    expect(result).toEqual(mockGym)
  })

  it('chama o repositório com o id correto', async () => {
    ;(mockRepository.getById as jest.Mock).mockResolvedValueOnce(mockGym)

    await getGymByIdUseCase('gym-1', mockRepository)

    expect(mockRepository.getById).toHaveBeenCalledWith('gym-1')
  })

  it('retorna undefined quando a academia não é encontrada', async () => {
    ;(mockRepository.getById as jest.Mock).mockResolvedValueOnce(undefined)

    const result = await getGymByIdUseCase('gym-inexistente', mockRepository)

    expect(result).toBeUndefined()
  })

  it('propaga erros do repositório', async () => {
    ;(mockRepository.getById as jest.Mock).mockRejectedValueOnce(new Error('network error'))

    await expect(getGymByIdUseCase('gym-1', mockRepository)).rejects.toThrow('network error')
  })
})

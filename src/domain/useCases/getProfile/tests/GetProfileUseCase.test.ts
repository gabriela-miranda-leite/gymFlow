import type { ProfileModel } from '@/domain/models/ProfileModel'
import type { IGetProfileRepository } from '@/domain/useCases/getProfile/GetProfileUseCase'
import { getProfileUseCase } from '@/domain/useCases/getProfile/GetProfileUseCase'

const mockProfile: ProfileModel = {
  name: 'Gabriela',
  phone: '11999999999',
  imageUri: 'https://example.com/avatar.jpg',
}

const mockRepository: IGetProfileRepository = {
  getProfile: jest.fn(),
}

describe('getProfileUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns the profile from the repository', async () => {
    ;(mockRepository.getProfile as jest.Mock).mockResolvedValueOnce(mockProfile)

    const result = await getProfileUseCase(mockRepository)

    expect(result).toEqual(mockProfile)
  })

  it('calls repository.getProfile once', async () => {
    ;(mockRepository.getProfile as jest.Mock).mockResolvedValueOnce(mockProfile)

    await getProfileUseCase(mockRepository)

    expect(mockRepository.getProfile).toHaveBeenCalledTimes(1)
  })

  it('propagates errors from the repository', async () => {
    ;(mockRepository.getProfile as jest.Mock).mockRejectedValueOnce(new Error('unauthorized'))

    await expect(getProfileUseCase(mockRepository)).rejects.toThrow('unauthorized')
  })
})

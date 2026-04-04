import type { ProfileModel } from '@/domain/models/ProfileModel'
import type { IUpdateProfileRepository } from '@/domain/useCases/updateProfile/UpdateProfileUseCase'
import { updateProfileUseCase } from '@/domain/useCases/updateProfile/UpdateProfileUseCase'

const mockProfile: ProfileModel = {
  name: 'Gabriela',
  phone: '11999999999',
  imageUri: 'https://example.com/avatar.jpg',
}

const mockRepository: IUpdateProfileRepository = {
  updateProfile: jest.fn(),
}

describe('updateProfileUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls repository.updateProfile with the correct profile', async () => {
    ;(mockRepository.updateProfile as jest.Mock).mockResolvedValueOnce(undefined)

    await updateProfileUseCase(mockProfile, mockRepository)

    expect(mockRepository.updateProfile).toHaveBeenCalledWith(mockProfile)
  })

  it('calls repository.updateProfile once', async () => {
    ;(mockRepository.updateProfile as jest.Mock).mockResolvedValueOnce(undefined)

    await updateProfileUseCase(mockProfile, mockRepository)

    expect(mockRepository.updateProfile).toHaveBeenCalledTimes(1)
  })

  it('propagates errors from the repository', async () => {
    ;(mockRepository.updateProfile as jest.Mock).mockRejectedValueOnce(new Error('network error'))

    await expect(updateProfileUseCase(mockProfile, mockRepository)).rejects.toThrow('network error')
  })
})

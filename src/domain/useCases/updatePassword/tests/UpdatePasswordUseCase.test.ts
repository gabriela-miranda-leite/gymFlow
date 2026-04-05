import {
  updatePasswordUseCase,
  type IUpdatePasswordRepository,
} from '@/domain/useCases/updatePassword/UpdatePasswordUseCase'

const mockRepository: IUpdatePasswordRepository = {
  updatePassword: jest.fn().mockResolvedValue(undefined),
}

describe('updatePasswordUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls repository with valid credentials', async () => {
    await updatePasswordUseCase(
      { currentPassword: 'oldPass1', newPassword: 'newPass1', confirmPassword: 'newPass1' },
      mockRepository,
    )

    expect(mockRepository.updatePassword).toHaveBeenCalledWith('oldPass1', 'newPass1')
  })

  it('throws when new password is too short', async () => {
    await expect(
      updatePasswordUseCase(
        { currentPassword: 'oldPass1', newPassword: '123', confirmPassword: '123' },
        mockRepository,
      ),
    ).rejects.toThrow()
  })

  it('throws when passwords do not match', async () => {
    await expect(
      updatePasswordUseCase(
        { currentPassword: 'oldPass1', newPassword: 'newPass1', confirmPassword: 'different' },
        mockRepository,
      ),
    ).rejects.toThrow()
  })

  it('throws when current password is empty', async () => {
    await expect(
      updatePasswordUseCase(
        { currentPassword: '', newPassword: 'newPass1', confirmPassword: 'newPass1' },
        mockRepository,
      ),
    ).rejects.toThrow()
  })
})

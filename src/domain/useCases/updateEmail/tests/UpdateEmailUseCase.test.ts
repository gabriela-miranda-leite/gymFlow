import type { IUpdateEmailRepository } from '@/domain/useCases/updateEmail/UpdateEmailUseCase'
import { updateEmailUseCase } from '@/domain/useCases/updateEmail/UpdateEmailUseCase'

const mockRepository: IUpdateEmailRepository = {
  updateEmail: jest.fn(),
}

describe('updateEmailUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('valid email', () => {
    it('calls repository.updateEmail with the correct email', async () => {
      ;(mockRepository.updateEmail as jest.Mock).mockResolvedValueOnce(undefined)

      await updateEmailUseCase({ email: 'novo@email.com' }, mockRepository)

      expect(mockRepository.updateEmail).toHaveBeenCalledWith('novo@email.com')
    })

    it('calls repository.updateEmail once', async () => {
      ;(mockRepository.updateEmail as jest.Mock).mockResolvedValueOnce(undefined)

      await updateEmailUseCase({ email: 'novo@email.com' }, mockRepository)

      expect(mockRepository.updateEmail).toHaveBeenCalledTimes(1)
    })

    it('propagates errors from the repository', async () => {
      ;(mockRepository.updateEmail as jest.Mock).mockRejectedValueOnce(
        new Error('email already in use'),
      )

      await expect(updateEmailUseCase({ email: 'novo@email.com' }, mockRepository)).rejects.toThrow(
        'email already in use',
      )
    })
  })

  describe('invalid email', () => {
    it('throws a validation error when the email is invalid', async () => {
      await expect(updateEmailUseCase({ email: 'invalid-email' }, mockRepository)).rejects.toThrow()

      expect(mockRepository.updateEmail).not.toHaveBeenCalled()
    })

    it('throws a validation error when the email is empty', async () => {
      await expect(updateEmailUseCase({ email: '' }, mockRepository)).rejects.toThrow()

      expect(mockRepository.updateEmail).not.toHaveBeenCalled()
    })
  })
})

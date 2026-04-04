import type { ISignUpRepository } from '@/domain/useCases/signUp/SignUpUseCase'
import { signUpUseCase } from '@/domain/useCases/signUp/SignUpUseCase'

const mockRepository: ISignUpRepository = {
  signUp: jest.fn(),
}

const mockResult = {
  user: { id: 'user-1', name: 'Gabriela', email: 'gabriela@example.com' },
  token: 'token-abc',
}

describe('signUpUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('valid credentials', () => {
    it('calls repository.signUp with the correct credentials', async () => {
      ;(mockRepository.signUp as jest.Mock).mockResolvedValueOnce(mockResult)

      await signUpUseCase(
        { name: 'Gabriela', email: 'gabriela@example.com', password: '123456' },
        mockRepository,
      )

      expect(mockRepository.signUp).toHaveBeenCalledWith({
        name: 'Gabriela',
        email: 'gabriela@example.com',
        password: '123456',
      })
    })

    it('returns user and token from the repository', async () => {
      ;(mockRepository.signUp as jest.Mock).mockResolvedValueOnce(mockResult)

      const result = await signUpUseCase(
        { name: 'Gabriela', email: 'gabriela@example.com', password: '123456' },
        mockRepository,
      )

      expect(result).toEqual(mockResult)
    })

    it('propagates errors from the repository', async () => {
      ;(mockRepository.signUp as jest.Mock).mockRejectedValueOnce(new Error('email already in use'))

      await expect(
        signUpUseCase(
          { name: 'Gabriela', email: 'gabriela@example.com', password: '123456' },
          mockRepository,
        ),
      ).rejects.toThrow('email already in use')
    })
  })

  describe('invalid credentials', () => {
    it('throws a validation error when the name is empty', async () => {
      await expect(
        signUpUseCase(
          { name: '', email: 'gabriela@example.com', password: '123456' },
          mockRepository,
        ),
      ).rejects.toThrow()

      expect(mockRepository.signUp).not.toHaveBeenCalled()
    })

    it('throws a validation error when the email is invalid', async () => {
      await expect(
        signUpUseCase(
          { name: 'Gabriela', email: 'email-invalido', password: '123456' },
          mockRepository,
        ),
      ).rejects.toThrow()

      expect(mockRepository.signUp).not.toHaveBeenCalled()
    })

    it('throws a validation error when the password has fewer than 6 characters', async () => {
      await expect(
        signUpUseCase(
          { name: 'Gabriela', email: 'gabriela@example.com', password: '123' },
          mockRepository,
        ),
      ).rejects.toThrow()

      expect(mockRepository.signUp).not.toHaveBeenCalled()
    })
  })
})

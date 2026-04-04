import type { IAuthRepository } from '@/domain/useCases/login/LoginUseCase'
import { loginUseCase } from '@/domain/useCases/login/LoginUseCase'

const mockRepository: IAuthRepository = {
  login: jest.fn(),
}

const mockResult = {
  user: { id: 'user-1', name: 'Gabriela', email: 'gabriela@example.com' },
  token: 'token-abc',
}

describe('loginUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('valid credentials', () => {
    it('calls repository.login with the correct credentials', async () => {
      ;(mockRepository.login as jest.Mock).mockResolvedValueOnce(mockResult)

      await loginUseCase({ email: 'gabriela@example.com', password: '123456' }, mockRepository)

      expect(mockRepository.login).toHaveBeenCalledWith({
        email: 'gabriela@example.com',
        password: '123456',
      })
    })

    it('returns user and token from the repository', async () => {
      ;(mockRepository.login as jest.Mock).mockResolvedValueOnce(mockResult)

      const result = await loginUseCase(
        { email: 'gabriela@example.com', password: '123456' },
        mockRepository,
      )

      expect(result).toEqual(mockResult)
    })

    it('propagates errors from the repository', async () => {
      ;(mockRepository.login as jest.Mock).mockRejectedValueOnce(new Error('invalid credentials'))

      await expect(
        loginUseCase({ email: 'gabriela@example.com', password: '123456' }, mockRepository),
      ).rejects.toThrow('invalid credentials')
    })
  })

  describe('invalid credentials', () => {
    it('throws a validation error when the email is invalid', async () => {
      await expect(
        loginUseCase({ email: 'email-invalido', password: '123456' }, mockRepository),
      ).rejects.toThrow()

      expect(mockRepository.login).not.toHaveBeenCalled()
    })

    it('throws a validation error when the password has fewer than 6 characters', async () => {
      await expect(
        loginUseCase({ email: 'gabriela@example.com', password: '123' }, mockRepository),
      ).rejects.toThrow()

      expect(mockRepository.login).not.toHaveBeenCalled()
    })
  })
})

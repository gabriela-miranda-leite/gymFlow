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

  describe('credenciais válidas', () => {
    it('chama repository.login com as credenciais corretas', async () => {
      ;(mockRepository.login as jest.Mock).mockResolvedValueOnce(mockResult)

      await loginUseCase({ email: 'gabriela@example.com', password: '123456' }, mockRepository)

      expect(mockRepository.login).toHaveBeenCalledWith({
        email: 'gabriela@example.com',
        password: '123456',
      })
    })

    it('retorna user e token do repositório', async () => {
      ;(mockRepository.login as jest.Mock).mockResolvedValueOnce(mockResult)

      const result = await loginUseCase(
        { email: 'gabriela@example.com', password: '123456' },
        mockRepository,
      )

      expect(result).toEqual(mockResult)
    })

    it('propaga erros do repositório', async () => {
      ;(mockRepository.login as jest.Mock).mockRejectedValueOnce(new Error('invalid credentials'))

      await expect(
        loginUseCase({ email: 'gabriela@example.com', password: '123456' }, mockRepository),
      ).rejects.toThrow('invalid credentials')
    })
  })

  describe('credenciais inválidas', () => {
    it('lança erro de validação quando o email é inválido', async () => {
      await expect(
        loginUseCase({ email: 'email-invalido', password: '123456' }, mockRepository),
      ).rejects.toThrow()

      expect(mockRepository.login).not.toHaveBeenCalled()
    })

    it('lança erro de validação quando a senha tem menos de 6 caracteres', async () => {
      await expect(
        loginUseCase({ email: 'gabriela@example.com', password: '123' }, mockRepository),
      ).rejects.toThrow()

      expect(mockRepository.login).not.toHaveBeenCalled()
    })
  })
})

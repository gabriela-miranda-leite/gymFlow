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

  describe('credenciais válidas', () => {
    it('chama repository.signUp com as credenciais corretas', async () => {
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

    it('retorna user e token do repositório', async () => {
      ;(mockRepository.signUp as jest.Mock).mockResolvedValueOnce(mockResult)

      const result = await signUpUseCase(
        { name: 'Gabriela', email: 'gabriela@example.com', password: '123456' },
        mockRepository,
      )

      expect(result).toEqual(mockResult)
    })

    it('propaga erros do repositório', async () => {
      ;(mockRepository.signUp as jest.Mock).mockRejectedValueOnce(new Error('email already in use'))

      await expect(
        signUpUseCase(
          { name: 'Gabriela', email: 'gabriela@example.com', password: '123456' },
          mockRepository,
        ),
      ).rejects.toThrow('email already in use')
    })
  })

  describe('credenciais inválidas', () => {
    it('lança erro de validação quando o nome está vazio', async () => {
      await expect(
        signUpUseCase(
          { name: '', email: 'gabriela@example.com', password: '123456' },
          mockRepository,
        ),
      ).rejects.toThrow()

      expect(mockRepository.signUp).not.toHaveBeenCalled()
    })

    it('lança erro de validação quando o email é inválido', async () => {
      await expect(
        signUpUseCase(
          { name: 'Gabriela', email: 'email-invalido', password: '123456' },
          mockRepository,
        ),
      ).rejects.toThrow()

      expect(mockRepository.signUp).not.toHaveBeenCalled()
    })

    it('lança erro de validação quando a senha tem menos de 6 caracteres', async () => {
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

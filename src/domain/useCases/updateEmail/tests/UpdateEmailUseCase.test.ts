import type { IUpdateEmailRepository } from '@/domain/useCases/updateEmail/UpdateEmailUseCase'
import { updateEmailUseCase } from '@/domain/useCases/updateEmail/UpdateEmailUseCase'

const mockRepository: IUpdateEmailRepository = {
  updateEmail: jest.fn(),
}

describe('updateEmailUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('email válido', () => {
    it('chama repository.updateEmail com o email correto', async () => {
      ;(mockRepository.updateEmail as jest.Mock).mockResolvedValueOnce(undefined)

      await updateEmailUseCase('novo@email.com', mockRepository)

      expect(mockRepository.updateEmail).toHaveBeenCalledWith('novo@email.com')
    })

    it('chama repository.updateEmail uma vez', async () => {
      ;(mockRepository.updateEmail as jest.Mock).mockResolvedValueOnce(undefined)

      await updateEmailUseCase('novo@email.com', mockRepository)

      expect(mockRepository.updateEmail).toHaveBeenCalledTimes(1)
    })

    it('propaga erros do repositório', async () => {
      ;(mockRepository.updateEmail as jest.Mock).mockRejectedValueOnce(new Error('email já em uso'))

      await expect(updateEmailUseCase('novo@email.com', mockRepository)).rejects.toThrow(
        'email já em uso',
      )
    })
  })

  describe('email inválido', () => {
    it('lança erro de validação quando o email é inválido', async () => {
      await expect(updateEmailUseCase('email-invalido', mockRepository)).rejects.toThrow()

      expect(mockRepository.updateEmail).not.toHaveBeenCalled()
    })

    it('lança erro de validação quando o email está vazio', async () => {
      await expect(updateEmailUseCase('', mockRepository)).rejects.toThrow()

      expect(mockRepository.updateEmail).not.toHaveBeenCalled()
    })
  })
})

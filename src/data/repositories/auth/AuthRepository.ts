import type {
  IAuthRepository,
  LoginCredentials,
  LoginResult,
} from '@/domain/useCases/login/LoginUseCase'
import type { IUpdateEmailRepository } from '@/domain/useCases/updateEmail/UpdateEmailUseCase'

export const authRepository: IAuthRepository & IUpdateEmailRepository = {
  async login(credentials: LoginCredentials): Promise<LoginResult> {
    // todo: mock para substituir quando tiver as
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      user: {
        id: '1',
        name: 'Gabriela',
        email: credentials.email,
      },
      token: 'mock-token-123',
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateEmail(_email: string): Promise<void> {
    // todo: mock para substituir quando tiver a integração real
    await new Promise((resolve) => setTimeout(resolve, 1000))
  },
}

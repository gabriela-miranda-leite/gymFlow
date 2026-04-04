import type {
  IAuthRepository,
  LoginCredentials,
  LoginResult,
} from '@/domain/useCases/login/LoginUseCase'

export const authRepository: IAuthRepository = {
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
}

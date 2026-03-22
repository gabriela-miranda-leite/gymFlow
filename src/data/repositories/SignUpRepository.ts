import { ISignUpRepository, SignUpResult, SignUpCredentials } from '@/domain/useCases/SignUpUseCase'

export const signUpRepository: ISignUpRepository = {
  async signUp(credentials: SignUpCredentials): Promise<SignUpResult> {
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

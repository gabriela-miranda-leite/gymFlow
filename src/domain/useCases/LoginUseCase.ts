import { z } from 'zod'

import type { UserModel } from '@/domain/models/UserModel'

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type LoginCredentials = z.infer<typeof loginSchema>

export interface LoginResult {
  user: UserModel
  token: string
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<LoginResult>
}

export const loginUseCase = async (
  credentials: LoginCredentials,
  authRepository: IAuthRepository,
): Promise<LoginResult> => {
  loginSchema.parse(credentials)
  return authRepository.login(credentials)
}

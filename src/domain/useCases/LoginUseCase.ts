import { z } from 'zod'

import type { UserModel } from '@/domain/models/UserModel'
import { tk } from '@/shared/i18n'
import i18n from '@/shared/i18n'

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .nonempty(i18n.t(tk.validation.passwordRequired))
    .min(6, i18n.t(tk.validation.passwordTooShort)),
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

import { z } from 'zod'

import { UserModel } from '@/domain/models/UserModel'

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
})

export type SignUpCredentials = z.infer<typeof signUpSchema>
export interface SignUpResult {
  user: UserModel
  token: string
}
export interface ISignUpRepository {
  signUp(credentials: SignUpCredentials): Promise<SignUpResult>
}

export const signUpUseCase = async (
  credentials: SignUpCredentials,
  authRepository: ISignUpRepository,
): Promise<SignUpResult> => {
  signUpSchema.parse(credentials)
  return authRepository.signUp(credentials)
}

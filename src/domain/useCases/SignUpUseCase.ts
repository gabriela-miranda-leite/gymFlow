import { z } from 'zod'

// TODO: definir o schema de validação do cadastro (name, email, password)
export const signUpSchema = z.object({})

export type SignUpCredentials = z.infer<typeof signUpSchema>

// TODO: definir o resultado do cadastro (user + token)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignUpResult {}

// TODO: definir a interface do repositório para sign up
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ISignUpRepository {}

// TODO: implementar o use case de cadastro
export const signUpUseCase = async (): Promise<SignUpResult> => {
  throw new Error('Not implemented')
}

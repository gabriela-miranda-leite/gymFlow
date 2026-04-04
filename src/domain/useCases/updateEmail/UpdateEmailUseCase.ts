import { z } from 'zod'

export const emailSchema = z.email()

export type EmailCredentials = z.infer<typeof emailSchema>

export interface IUpdateEmailRepository {
  updateEmail(email: EmailCredentials): Promise<void>
}

export const updateEmailUseCase = async (
  email: EmailCredentials,
  repository: IUpdateEmailRepository,
): Promise<void> => {
  emailSchema.parse(email)
  return repository.updateEmail(email)
}

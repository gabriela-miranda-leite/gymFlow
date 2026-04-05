import { z } from 'zod'

export const emailSchema = z.object({
  email: z.email(),
})

export type EmailCredentials = z.infer<typeof emailSchema>

export interface IUpdateEmailRepository {
  updateEmail(email: string): Promise<void>
}

export const updateEmailUseCase = async (
  credentials: EmailCredentials,
  repository: IUpdateEmailRepository,
): Promise<void> => {
  const { email } = emailSchema.parse(credentials)
  return repository.updateEmail(email)
}

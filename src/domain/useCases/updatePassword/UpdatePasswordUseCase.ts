import { z } from 'zod'

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type UpdatePasswordCredentials = z.infer<typeof updatePasswordSchema>

export interface IUpdatePasswordRepository {
  updatePassword(currentPassword: string, newPassword: string): Promise<void>
}

export const updatePasswordUseCase = async (
  credentials: UpdatePasswordCredentials,
  repository: IUpdatePasswordRepository,
): Promise<void> => {
  const { currentPassword, newPassword } = updatePasswordSchema.parse(credentials)
  return repository.updatePassword(currentPassword, newPassword)
}

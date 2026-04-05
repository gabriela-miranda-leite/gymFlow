import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(1),
  phone: z.string(),
  imageUri: z.string().optional(),
})

export type UpdateProfileCredentials = z.infer<typeof updateProfileSchema>

export interface IUpdateProfileRepository {
  updateProfile(profile: UpdateProfileCredentials): Promise<void>
}

export const updateProfileUseCase = async (
  profile: UpdateProfileCredentials,
  repository: IUpdateProfileRepository,
): Promise<void> => {
  const parsed = updateProfileSchema.parse(profile)
  return repository.updateProfile(parsed)
}

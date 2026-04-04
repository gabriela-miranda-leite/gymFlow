import type { ProfileModel } from '@/domain/models/ProfileModel'

export interface IUpdateProfileRepository {
  updateProfile(profile: ProfileModel): Promise<void>
}

export const updateProfileUseCase = async (
  profile: ProfileModel,
  repository: IUpdateProfileRepository,
): Promise<void> => {
  return repository.updateProfile(profile)
}

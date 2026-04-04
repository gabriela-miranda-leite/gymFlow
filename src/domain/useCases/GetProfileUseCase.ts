import type { ProfileModel } from '@/domain/models/ProfileModel'

export interface IGetProfileRepository {
  getProfile(): Promise<ProfileModel>
}

export const getProfileUseCase = async (
  repository: IGetProfileRepository,
): Promise<ProfileModel> => {
  return repository.getProfile()
}

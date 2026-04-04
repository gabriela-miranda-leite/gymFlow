import type { ProfileModel } from '@/domain/models/ProfileModel'
import type { IGetProfileRepository } from '@/domain/useCases/GetProfileUseCase'
import type { IUpdateProfileRepository } from '@/domain/useCases/UpdateProfileUseCase'

const MOCK_PROFILE: ProfileModel = {
  name: 'Rafael Souza',
  phone: '(11) 98765-4321',
}

let currentProfile: ProfileModel = { ...MOCK_PROFILE }

export const profileRepository: IGetProfileRepository & IUpdateProfileRepository = {
  async getProfile(): Promise<ProfileModel> {
    // todo: substituir por chamada real à API
    return { ...currentProfile }
  },
  async updateProfile(profile: ProfileModel): Promise<void> {
    // todo: substituir por chamada real à API
    currentProfile = { ...profile }
  },
}

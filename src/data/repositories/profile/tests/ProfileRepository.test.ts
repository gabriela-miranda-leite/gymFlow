import { profileRepository } from '@/data/repositories/profile/ProfileRepository'

describe('profileRepository', () => {
  describe('getProfile', () => {
    it('returns a profile with name and phone', async () => {
      const result = await profileRepository.getProfile()

      expect(result.name).toBeTruthy()
      expect(result.phone).toBeTruthy()
    })
  })

  describe('updateProfile', () => {
    it('persists the updated profile', async () => {
      await profileRepository.updateProfile({ name: 'Novo Nome', phone: '(11) 91234-5678' })

      const result = await profileRepository.getProfile()

      expect(result.name).toBe('Novo Nome')
      expect(result.phone).toBe('(11) 91234-5678')
    })
  })
})

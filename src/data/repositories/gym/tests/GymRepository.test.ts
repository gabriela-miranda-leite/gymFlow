import { gymRepository } from '@/data/repositories/gym/GymRepository'

describe('gymRepository', () => {
  describe('getNearby', () => {
    it('returns a non-empty list of gyms', async () => {
      const result = await gymRepository.getNearby({ latitude: -18.9, longitude: -48.2 })

      expect(result.length).toBeGreaterThan(0)
    })

    it('returns gyms with required fields', async () => {
      const result = await gymRepository.getNearby({ latitude: -18.9, longitude: -48.2 })
      const gym = result[0]

      expect(gym.id).toBeTruthy()
      expect(gym.name).toBeTruthy()
      expect(gym.coordinates).toBeDefined()
    })
  })

  describe('getById', () => {
    it('returns the gym with matching id', async () => {
      const result = await gymRepository.getById('1')

      expect(result?.id).toBe('1')
    })

    it('returns undefined for a non-existent id', async () => {
      const result = await gymRepository.getById('non-existent')

      expect(result).toBeUndefined()
    })
  })
})

import { checkInRepository } from '@/data/repositories/checkIn/CheckInRepository'
import type { CheckInModel } from '@/domain/models/CheckInModel'

const mockCheckIn: CheckInModel = {
  gymId: 'gym-1',
  occupancy: 'moderate',
  timestamp: Date.now(),
}

describe('checkInRepository', () => {
  describe('submit', () => {
    it('resolves without errors', async () => {
      await expect(checkInRepository.submit(mockCheckIn)).resolves.toBeUndefined()
    })

    it('calls submit once and completes', async () => {
      const spy = jest.spyOn(checkInRepository, 'submit')

      await checkInRepository.submit(mockCheckIn)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(mockCheckIn)

      spy.mockRestore()
    })
  })
})

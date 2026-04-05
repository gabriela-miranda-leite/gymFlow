import AsyncStorage from '@react-native-async-storage/async-storage'

import { checkInCooldownRepository } from '@/data/repositories/checkInCooldown/CheckInCooldownRepository'

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}))

const mockGetItem = AsyncStorage.getItem as jest.Mock
const mockSetItem = AsyncStorage.setItem as jest.Mock

describe('checkInCooldownRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getLastCheckInTimestamp', () => {
    it('returns null when no value is stored', async () => {
      mockGetItem.mockResolvedValue(null)

      const result = await checkInCooldownRepository.getLastCheckInTimestamp()

      expect(result).toBeNull()
    })

    it('returns parsed number when value is stored', async () => {
      mockGetItem.mockResolvedValue('1710000000000')

      const result = await checkInCooldownRepository.getLastCheckInTimestamp()

      expect(result).toBe(1710000000000)
    })

    it('propagates AsyncStorage errors', async () => {
      mockGetItem.mockRejectedValue(new Error('storage error'))

      await expect(checkInCooldownRepository.getLastCheckInTimestamp()).rejects.toThrow(
        'storage error',
      )
    })
  })

  describe('saveLastCheckInTimestamp', () => {
    it('saves timestamp as string to AsyncStorage', async () => {
      mockSetItem.mockResolvedValue(undefined)

      await checkInCooldownRepository.saveLastCheckInTimestamp(1710000000000)

      expect(mockSetItem).toHaveBeenCalledWith('@gymflow:last_checkin_timestamp', '1710000000000')
    })

    it('propagates AsyncStorage errors', async () => {
      mockSetItem.mockRejectedValue(new Error('storage error'))

      await expect(
        checkInCooldownRepository.saveLastCheckInTimestamp(1710000000000),
      ).rejects.toThrow('storage error')
    })
  })
})

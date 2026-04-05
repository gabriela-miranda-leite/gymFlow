import {
  CHECKIN_COOLDOWN_MINUTES,
  checkCheckInCooldownUseCase,
} from '@/domain/useCases/checkCheckInCooldown/CheckCheckInCooldownUseCase'

const COOLDOWN_MS = CHECKIN_COOLDOWN_MINUTES * 60 * 1000

describe('checkCheckInCooldownUseCase', () => {
  describe('no previous check-in', () => {
    it('returns isCoolingDown false when lastTimestamp is null', () => {
      const result = checkCheckInCooldownUseCase(null)

      expect(result.isCoolingDown).toBe(false)
      expect(result.remainingMinutes).toBe(0)
    })
  })

  describe('recent check-in (< 1h)', () => {
    it('returns isCoolingDown true when check-in was 30 minutes ago', () => {
      const now = Date.now()
      const lastTimestamp = now - 30 * 60 * 1000

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.isCoolingDown).toBe(true)
    })

    it('returns correct remainingMinutes when check-in was 30 minutes ago', () => {
      const now = Date.now()
      const lastTimestamp = now - 30 * 60 * 1000

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.remainingMinutes).toBe(30)
    })

    it('rounds remainingMinutes up', () => {
      const now = Date.now()
      // 30 min and 1 second ago → 29 min and 59 sec remaining → ceil = 30
      const lastTimestamp = now - (30 * 60 * 1000 + 1000)

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.remainingMinutes).toBe(30)
    })

    it('returns isCoolingDown true when check-in was 1 second ago', () => {
      const now = Date.now()
      const lastTimestamp = now - 1000

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.isCoolingDown).toBe(true)
      expect(result.remainingMinutes).toBe(CHECKIN_COOLDOWN_MINUTES)
    })
  })

  describe('old check-in (>= 1h)', () => {
    it('returns isCoolingDown false when check-in was exactly 1h ago', () => {
      const now = Date.now()
      const lastTimestamp = now - COOLDOWN_MS

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.isCoolingDown).toBe(false)
      expect(result.remainingMinutes).toBe(0)
    })

    it('returns isCoolingDown false when check-in was more than 1h ago', () => {
      const now = Date.now()
      const lastTimestamp = now - COOLDOWN_MS - 60 * 1000

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.isCoolingDown).toBe(false)
      expect(result.remainingMinutes).toBe(0)
    })
  })
})

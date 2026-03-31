import {
  CHECKIN_COOLDOWN_MINUTES,
  checkCheckInCooldownUseCase,
} from '@/domain/useCases/CheckCheckInCooldownUseCase'

const COOLDOWN_MS = CHECKIN_COOLDOWN_MINUTES * 60 * 1000

describe('checkCheckInCooldownUseCase', () => {
  describe('sem check-in anterior', () => {
    it('retorna isCoolingDown false quando lastTimestamp é null', () => {
      const result = checkCheckInCooldownUseCase(null)

      expect(result.isCoolingDown).toBe(false)
      expect(result.remainingMinutes).toBe(0)
    })
  })

  describe('último check-in recente (< 1h)', () => {
    it('retorna isCoolingDown true quando check-in foi há 30 minutos', () => {
      const now = Date.now()
      const lastTimestamp = now - 30 * 60 * 1000

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.isCoolingDown).toBe(true)
    })

    it('retorna remainingMinutes correto quando check-in foi há 30 minutos', () => {
      const now = Date.now()
      const lastTimestamp = now - 30 * 60 * 1000

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.remainingMinutes).toBe(30)
    })

    it('arredonda remainingMinutes para cima', () => {
      const now = Date.now()
      // 30 min e 1 segundo atrás → restam 29 min e 59 seg → ceil = 30
      const lastTimestamp = now - (30 * 60 * 1000 + 1000)

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.remainingMinutes).toBe(30)
    })

    it('retorna isCoolingDown true quando check-in foi há 1 segundo', () => {
      const now = Date.now()
      const lastTimestamp = now - 1000

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.isCoolingDown).toBe(true)
      expect(result.remainingMinutes).toBe(CHECKIN_COOLDOWN_MINUTES)
    })
  })

  describe('último check-in antigo (>= 1h)', () => {
    it('retorna isCoolingDown false quando check-in foi há exatamente 1h', () => {
      const now = Date.now()
      const lastTimestamp = now - COOLDOWN_MS

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.isCoolingDown).toBe(false)
      expect(result.remainingMinutes).toBe(0)
    })

    it('retorna isCoolingDown false quando check-in foi há mais de 1h', () => {
      const now = Date.now()
      const lastTimestamp = now - COOLDOWN_MS - 60 * 1000

      const result = checkCheckInCooldownUseCase(lastTimestamp, now)

      expect(result.isCoolingDown).toBe(false)
      expect(result.remainingMinutes).toBe(0)
    })
  })
})

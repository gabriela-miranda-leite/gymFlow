export const CHECKIN_COOLDOWN_MINUTES = 60

export interface CooldownStatus {
  isCoolingDown: boolean
  remainingMinutes: number
}

export const checkCheckInCooldownUseCase = (
  lastTimestamp: number | null,
  now: number = Date.now(),
): CooldownStatus => {
  if (lastTimestamp === null) {
    return { isCoolingDown: false, remainingMinutes: 0 }
  }

  const elapsedMs = now - lastTimestamp
  const cooldownMs = CHECKIN_COOLDOWN_MINUTES * 60 * 1000

  if (elapsedMs >= cooldownMs) {
    return { isCoolingDown: false, remainingMinutes: 0 }
  }

  const remainingMs = cooldownMs - elapsedMs
  const remainingMinutes = Math.ceil(remainingMs / (60 * 1000))

  return { isCoolingDown: true, remainingMinutes }
}

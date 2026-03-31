import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { checkInCooldownRepository } from '@/data/repositories/CheckInCooldownRepository'
import { checkInRepository } from '@/data/repositories/CheckInRepository'
import { gymRepository } from '@/data/repositories/GymRepository'
import type { GymModel } from '@/domain/models/GymModel'
import { checkCheckInCooldownUseCase } from '@/domain/useCases/CheckCheckInCooldownUseCase'
import { submitCheckInUseCase } from '@/domain/useCases/SubmitCheckInUseCase'
import type {
  CheckInGymOption,
  CheckInUiModel,
  OccupancyOption,
} from '@/presentation/uiModels/CheckInUiModel'
import { tk } from '@/shared/i18n'
import { colors } from '@/tokens'
import type { OccupancyLevel } from '@/tokens'

const COOLDOWN_CHECK_INTERVAL_MS = 60 * 1000

function toGymOption(gym: GymModel): CheckInGymOption {
  return {
    value: gym.id,
    label: gym.name,
    sublabel: gym.address,
  }
}

export const useCheckInViewModel = (): CheckInUiModel => {
  const { t } = useTranslation()

  const [gyms, setGyms] = useState<GymModel[]>([])
  const [selectedGymId, setSelectedGymId] = useState<string | undefined>(undefined)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCoolingDown, setIsCoolingDown] = useState(false)
  const [remainingMinutes, setRemainingMinutes] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function updateCooldownState(lastTimestamp: number | null): boolean {
    const status = checkCheckInCooldownUseCase(lastTimestamp)
    setIsCoolingDown(status.isCoolingDown)
    setRemainingMinutes(status.remainingMinutes)
    return status.isCoolingDown
  }

  function startCooldownInterval(lastTimestamp: number) {
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      const stillCooling = updateCooldownState(lastTimestamp)
      if (!stillCooling && intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, COOLDOWN_CHECK_INTERVAL_MS)
  }

  useEffect(() => {
    gymRepository
      .getNearby()
      .then(setGyms)
      .catch(() => {})

    checkInCooldownRepository
      .getLastCheckInTimestamp()
      .then((lastTimestamp) => {
        const coolingDown = updateCooldownState(lastTimestamp)
        if (coolingDown && lastTimestamp !== null) {
          startCooldownInterval(lastTimestamp)
        }
      })
      .catch(() => {})

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const gymOptions: CheckInGymOption[] = gyms.map(toGymOption)

  const occupancyOptions: OccupancyOption[] = [
    {
      value: 'empty',
      label: t(tk.checkIn.buttonGroup.options.empty.label),
      sublabel: t(tk.checkIn.buttonGroup.options.empty.sublabel),
      color: colors.statusEmpty,
    },
    {
      value: 'moderate',
      label: t(tk.checkIn.buttonGroup.options.normal.label),
      sublabel: t(tk.checkIn.buttonGroup.options.normal.sublabel),
      color: colors.statusModerate,
    },
    {
      value: 'busy',
      label: t(tk.checkIn.buttonGroup.options.full.label),
      sublabel: t(tk.checkIn.buttonGroup.options.full.sublabel),
      color: colors.statusBusy,
    },
    {
      value: 'packed',
      label: t(tk.checkIn.buttonGroup.options.packed.label),
      sublabel: t(tk.checkIn.buttonGroup.options.packed.sublabel),
      color: colors.statusFull,
    },
  ]

  const onSelectGym = (gymId: string) => {
    setSelectedGymId(gymId)
  }

  const onSelectOccupancy = async (value: OccupancyLevel) => {
    if (!selectedGymId || isCoolingDown) return
    setLoading(true)
    setError(null)
    try {
      await submitCheckInUseCase(selectedGymId, value, checkInRepository)
      const now = Date.now()
      await checkInCooldownRepository.saveLastCheckInTimestamp(now)
      updateCooldownState(now)
      startCooldownInterval(now)
    } catch {
      setError(t(tk.errors.generic))
    } finally {
      setLoading(false)
    }
  }

  return {
    title: t(tk.checkIn.title),
    selectPlaceholder: t(tk.checkIn.selectPlaceholder),
    gymOptions,
    selectedGymId,
    onSelectGym,
    occupancyOptions,
    isLoading,
    isCoolingDown,
    isButtonGroupDisabled: isLoading || !selectedGymId || isCoolingDown,
    cooldownMessage: isCoolingDown
      ? t(tk.checkIn.cooldownBanner, { minutes: remainingMinutes })
      : null,
    error,
    onSelectOccupancy,
  }
}

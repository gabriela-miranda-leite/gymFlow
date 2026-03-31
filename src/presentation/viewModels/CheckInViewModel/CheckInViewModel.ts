import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { checkInRepository } from '@/data/repositories/CheckInRepository'
import { gymRepository } from '@/data/repositories/GymRepository'
import type { GymModel } from '@/domain/models/GymModel'
import { submitCheckInUseCase } from '@/domain/useCases/SubmitCheckInUseCase'
import type {
  CheckInGymOption,
  CheckInUiModel,
  OccupancyOption,
} from '@/presentation/uiModels/CheckInUiModel'
import { tk } from '@/shared/i18n'
import { colors } from '@/tokens'
import type { OccupancyLevel } from '@/tokens'

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

  useEffect(() => {
    gymRepository
      .getNearby()
      .then(setGyms)
      .catch(() => {})
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
    if (!selectedGymId) return
    setLoading(true)
    setError(null)
    try {
      await submitCheckInUseCase(selectedGymId, value, checkInRepository)
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
    error,
    onSelectOccupancy,
  }
}

import type { OccupancyLevel } from '@/tokens'

export interface CheckInGymOption {
  value: string
  label: string
  sublabel: string
}

export interface OccupancyOption {
  value: OccupancyLevel
  label: string
  sublabel: string
  color: string
}

export interface CheckInUiModel {
  title: string
  selectPlaceholder: string
  gymOptions: CheckInGymOption[]
  selectedGymId: string | undefined
  onSelectGym: (gymId: string) => void
  occupancyOptions: OccupancyOption[]
  isLoading: boolean
  error: string | null
  onSelectOccupancy: (value: OccupancyLevel) => void
}

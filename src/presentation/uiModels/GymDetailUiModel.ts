import type { OccupancyLevel } from '@/tokens'

export interface HourlyFlowBarUiModel {
  hour: number
  occupancyPercent: number
  barColor: string
  isFuture: boolean
  isCurrentHour: boolean
}

export interface GymDetailUiModel {
  gymId: string
  name: string
  address: string
  occupancyPercent: string
  occupancyLabel: string
  occupancyLabelColor: string
  occupancyStatusColor: string
  bestTimeLabel: string
  bestTimeOccupancy: string
  bestTimeTrendIcon: 'up' | 'down'
  selectedDayIndex: number
  days: { label: string; dayIndex: number }[]
  flowChartTitle: string
  hourlyBars: HourlyFlowBarUiModel[]
  currentHour: number
  isFavorite: boolean
  notifyButtonLabel: string
  updatedAtLabel: string
  onSelectDay: (dayIndex: number) => void
  onToggleFavorite: () => void
  onNotify: () => void
  onBack: () => void
  occupancy: OccupancyLevel
}

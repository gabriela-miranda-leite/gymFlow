import type { OccupancyLevel } from '@/tokens'

export interface GymUiModel {
  id: string
  name: string
  address: string
  rating: number
  ratingLabel: string
  reviewCount: string
  distanceLabel: string
  openingHours: string
  isOpen: boolean
  statusLabel: string
  tags: string[]
  coordinates: { latitude: number; longitude: number }
  occupancy: OccupancyLevel
  occupancyPercent: string
  occupancyLabel: string
}

export interface MapUiModel {
  userCoordinates: { latitude: number; longitude: number } | null
  gyms: GymUiModel[]
  selectedGym: GymUiModel | null
  isLoading: boolean
  locationError: string | null
  onSelectGym: (gym: GymUiModel) => void
  onDismissCard: () => void
  onCheckIn: () => void
  onViewGymDetail: (gym: GymUiModel) => void
}

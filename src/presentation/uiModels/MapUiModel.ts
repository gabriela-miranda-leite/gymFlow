export interface GymUiModel {
  id: string
  name: string
  address: string
  rating: number
  ratingLabel: string
  distanceLabel: string
  openingHours: string
  isOpen: boolean
  statusLabel: string
  tags: string[]
  coordinates: { latitude: number; longitude: number }
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
}

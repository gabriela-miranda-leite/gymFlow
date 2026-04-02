export interface FavoriteGymUiModel {
  id: string
  name: string
  address: string
  occupancy: number
  indicatorColor: string
}

export interface ProfileUiModel {
  userName: string
  checkInsThisMonth: number
  email: string
  passwordPlaceholder: string
  favoriteGyms: FavoriteGymUiModel[]
  idealTimeEnabled: boolean
  occupancyLimit: number
  isDarkMode: boolean
  onPressProfile: () => void
  onPressEmail: () => void
  onPressPassword: () => void
  onPressFavoriteGym: (id: string) => void
  onToggleIdealTime: (value: boolean) => void
  onChangeOccupancyLimit: (value: number) => void
  onToggleTheme: () => void
  onPressLogout: () => void
}

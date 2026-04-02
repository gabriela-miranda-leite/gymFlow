import { useState } from 'react'

import { useTheme } from '@/contexts/ThemeContext'
import type { FavoriteGymUiModel, ProfileUiModel } from '@/presentation/uiModels/ProfileUiModel'

const MOCK_FAVORITE_GYMS: FavoriteGymUiModel[] = [
  {
    id: '1',
    name: 'SmartFit Paulista',
    address: 'Av. Paulista, 1000',
    occupancy: 22,
    indicatorColor: '#4CAF50',
  },
  {
    id: '2',
    name: 'BodyTech Jardins',
    address: 'R. Oscar Freire, 450',
    occupancy: 45,
    indicatorColor: '#FFC107',
  },
]

export const useProfileViewModel = (): ProfileUiModel => {
  const { isDark, setMode } = useTheme()

  const [idealTimeEnabled, setIdealTimeEnabled] = useState(true)
  const [occupancyLimit, setOccupancyLimit] = useState(40)

  const onToggleTheme = () => {
    setMode(isDark ? 'light' : 'dark')
  }

  const onPressProfile = () => {}
  const onPressEmail = () => {}
  const onPressPassword = () => {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressFavoriteGym = (gymId: string) => {}
  const onPressLogout = () => {}

  return {
    userName: 'Rafael Souza',
    checkInsThisMonth: 12,
    email: 'rafael@email.com',
    passwordPlaceholder: '••••••••',
    favoriteGyms: MOCK_FAVORITE_GYMS,
    idealTimeEnabled,
    occupancyLimit,
    isDarkMode: isDark,
    onPressProfile,
    onPressEmail,
    onPressPassword,
    onPressFavoriteGym,
    onToggleIdealTime: setIdealTimeEnabled,
    onChangeOccupancyLimit: setOccupancyLimit,
    onToggleTheme,
    onPressLogout,
  }
}

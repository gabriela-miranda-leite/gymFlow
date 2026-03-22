import { useNavigation } from '@react-navigation/native'
import type { NavigationProp } from '@react-navigation/native'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { gymRepository } from '@/data/repositories/GymRepository'
import type { GymModel } from '@/domain/models/GymModel'
import { getNearbyGymsUseCase } from '@/domain/useCases/GetNearbyGymsUseCase'
import type { GymUiModel, MapUiModel } from '@/presentation/uiModels/MapUiModel'
import { tk } from '@/shared/i18n'
import { TabRoutes } from '@/shared/navigation/routes'
import type { AppTabParamList } from '@/shared/navigation/types'

function toGymUiModel(gym: GymModel, t: (key: string) => string): GymUiModel {
  const distanceLabel =
    gym.distanceMeters < 1000
      ? `${gym.distanceMeters} m`
      : `${(gym.distanceMeters / 1000).toFixed(1)} ${t(tk.map.km)}`

  return {
    id: gym.id,
    name: gym.name,
    address: gym.address,
    rating: gym.rating,
    ratingLabel: gym.rating.toFixed(1),
    distanceLabel,
    openingHours: gym.openingHours,
    isOpen: gym.isOpen,
    statusLabel: gym.isOpen ? t(tk.map.open) : t(tk.map.closed),
    tags: gym.tags,
    coordinates: gym.coordinates,
  }
}

export const useMapViewModel = (): MapUiModel => {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProp<AppTabParamList>>()

  const [userCoordinates, setUserCoordinates] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [gyms, setGyms] = useState<GymModel[]>([])
  const [selectedGym, setSelectedGym] = useState<GymModel | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    async function init() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== Location.PermissionStatus.GRANTED) {
          setLocationError(t(tk.map.locationPermissionDenied))
          setLoading(false)
          return
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        })

        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }

        setUserCoordinates(coords)

        const nearbyGyms = await getNearbyGymsUseCase(coords, gymRepository)
        setGyms(nearbyGyms)
      } catch {
        setLocationError(t(tk.map.locationError))
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [t])

  return {
    userCoordinates,
    gyms: gyms.map((g) => toGymUiModel(g, t)),
    selectedGym: selectedGym ? toGymUiModel(selectedGym, t) : null,
    isLoading,
    locationError,
    onSelectGym: (gym) => setSelectedGym(gyms.find((g) => g.id === gym.id) ?? null),
    onDismissCard: () => setSelectedGym(null),
    onCheckIn: () => navigation.navigate(TabRoutes.CheckIn),
  }
}

import { useNavigation } from '@react-navigation/native'
import type { NavigationProp } from '@react-navigation/native'
import * as Location from 'expo-location'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { gymRepository } from '@/data/repositories/gym/GymRepository'
import type { GymCoordinates, GymModel } from '@/domain/models/GymModel'
import { getNearbyGymsUseCase } from '@/domain/useCases/getNearbyGyms/GetNearbyGymsUseCase'
import type { GymUiModel, MapUiModel } from '@/presentation/uiModels/MapUiModel'
import { tk } from '@/shared/i18n'
import { RootRoutes, TabRoutes } from '@/shared/navigation/routes'
import type { RootStackParamList } from '@/shared/navigation/types'

const DEFAULT_COORDINATES: GymCoordinates = { latitude: -18.9186, longitude: -48.2772 }

function toGymUiModel(gym: GymModel, t: (key: string) => string): GymUiModel {
  const distanceLabel =
    gym.distanceMeters < 1000
      ? `${gym.distanceMeters} m`
      : `${(gym.distanceMeters / 1000).toFixed(1)} ${t(tk.map.km)}`

  const occupancyLabelMap: Record<string, string> = {
    empty: t(tk.map.occupancy.empty),
    moderate: t(tk.map.occupancy.moderate),
    busy: t(tk.map.occupancy.busy),
    packed: t(tk.map.occupancy.packed),
  }

  return {
    id: gym.id,
    name: gym.name,
    address: gym.address,
    rating: gym.rating,
    ratingLabel: gym.rating.toFixed(1),
    reviewCount: `(${gym.reviewCount})`,
    distanceLabel,
    openingHours: gym.openingHours,
    isOpen: gym.isOpen,
    statusLabel: gym.isOpen ? t(tk.map.open) : t(tk.map.closed),
    tags: gym.tags,
    coordinates: gym.coordinates,
    occupancy: gym.occupancy,
    occupancyPercent: `${gym.occupancyPercent}%`,
    occupancyLabel: occupancyLabelMap[gym.occupancy] ?? gym.occupancy,
  }
}

export const useMapViewModel = (): MapUiModel => {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const [userCoordinates, setUserCoordinates] = useState<GymCoordinates | null>(null)
  const [gyms, setGyms] = useState<GymModel[]>([])
  const [selectedGym, setSelectedGym] = useState<GymModel | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [locationError, setLocationError] = useState<string | null>(null)
  const gymsLoaded = useRef(false)

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null

    async function loadGyms(coords: GymCoordinates) {
      if (gymsLoaded.current) return
      gymsLoaded.current = true
      try {
        const nearbyGyms = await getNearbyGymsUseCase(coords, gymRepository)
        setGyms(nearbyGyms)
      } catch {
        // mapa ainda funciona sem marcadores
      }
    }

    async function init() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== Location.PermissionStatus.GRANTED) {
          setLocationError(t(tk.map.locationPermissionDenied))
          setLoading(false)
          return
        }

        setLoading(false)
        loadGyms(DEFAULT_COORDINATES)

        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Balanced, distanceInterval: 10 },
          (location) => {
            setUserCoordinates({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            })
          },
        )
      } catch {
        setLocationError(t(tk.map.locationError))
        setLoading(false)
      }
    }

    init()

    return () => {
      subscription?.remove()
    }
  }, [t])

  return {
    userCoordinates,
    gyms: gyms.map((g) => toGymUiModel(g, t)),
    selectedGym: selectedGym ? toGymUiModel(selectedGym, t) : null,
    isLoading,
    locationError,
    onSelectGym: (gym) => setSelectedGym(gyms.find((g) => g.id === gym.id) ?? null),
    onDismissCard: () => setSelectedGym(null),
    onCheckIn: () => navigation.navigate(RootRoutes.App, { screen: TabRoutes.CheckIn }),
    onViewGymDetail: (gym) => navigation.navigate(RootRoutes.GymDetail, { gymId: gym.id }),
  }
}

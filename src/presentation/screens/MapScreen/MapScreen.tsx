import BottomSheet from '@gorhom/bottom-sheet'
import MapLibreGL from '@maplibre/maplibre-react-native'
import { useEffect, useMemo, useRef } from 'react'
import { ActivityIndicator } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
import { GymDetailCard } from '@/presentation/components/GymDetailCard'
import { GymMarker } from '@/presentation/components/GymMarker'
import {
  Container,
  ErrorContainer,
  ErrorText,
  MapWrapper,
} from '@/presentation/screens/MapScreen/MapScreen.styles'
import { useMapViewModel } from '@/presentation/viewModels/MapViewModel'

MapLibreGL.setAccessToken('')
MapLibreGL.setConnected(true)

const LIGHT_STYLE = 'https://tiles.openfreemap.org/styles/liberty'
const DARK_STYLE = 'https://tiles.openfreemap.org/styles/liberty'

const DEFAULT_CENTER: [number, number] = [-48.2772, -18.9186] // Uberlândia

export function MapScreen() {
  const { theme, isDark } = useTheme()
  const {
    userCoordinates,
    gyms,
    selectedGym,
    isLoading,
    locationError,
    onSelectGym,
    onDismissCard,
    onCheckIn,
  } = useMapViewModel()

  const bottomSheetRef = useRef<BottomSheet>(null)

  const center = useMemo<[number, number]>(
    () =>
      userCoordinates ? [userCoordinates.longitude, userCoordinates.latitude] : DEFAULT_CENTER,
    [userCoordinates],
  )

  useEffect(() => {
    if (selectedGym) {
      bottomSheetRef.current?.expand()
    } else {
      bottomSheetRef.current?.close()
    }
  }, [selectedGym])

  if (locationError) {
    return (
      <ErrorContainer bg={theme.background}>
        <ErrorText color={theme.mutedForeground}>{locationError}</ErrorText>
      </ErrorContainer>
    )
  }

  return (
    <Container>
      <MapWrapper>
        <MapLibreGL.MapView
          style={{ flex: 1 }}
          mapStyle={isDark ? DARK_STYLE : LIGHT_STYLE}
          logoEnabled={false}
          attributionEnabled={false}
        >
          <MapLibreGL.Camera
            centerCoordinate={center}
            zoomLevel={13}
            animationMode="flyTo"
            animationDuration={800}
          />

          {gyms.map((gym) => (
            <MapLibreGL.MarkerView
              key={gym.id}
              coordinate={[gym.coordinates.longitude, gym.coordinates.latitude]}
            >
              <GymMarker gym={gym} isActive={selectedGym?.id === gym.id} onPress={onSelectGym} />
            </MapLibreGL.MarkerView>
          ))}
        </MapLibreGL.MapView>

        {isLoading && (
          <ActivityIndicator
            testID="loading-indicator"
            style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
            color={theme.brand.primary}
            size="large"
          />
        )}
      </MapWrapper>

      <GymDetailCard
        ref={bottomSheetRef}
        gym={selectedGym}
        onDismiss={onDismissCard}
        onCheckIn={onCheckIn}
      />
    </Container>
  )
}

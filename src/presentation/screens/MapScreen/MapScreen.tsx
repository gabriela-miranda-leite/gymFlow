import BottomSheet from '@gorhom/bottom-sheet'
import MapLibreGL from '@maplibre/maplibre-react-native'
import { useEffect, useRef } from 'react'
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

MapLibreGL.setAccessToken(null)

const LIGHT_STYLE = 'https://tiles.openfreemap.org/styles/liberty'
const DARK_STYLE = 'https://tiles.openfreemap.org/styles/positron'

const DEFAULT_CENTER: [number, number] = [-46.6525, -23.565] // São Paulo

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

  const center: [number, number] = userCoordinates
    ? [userCoordinates.longitude, userCoordinates.latitude]
    : DEFAULT_CENTER

  return (
    <Container>
      <MapWrapper>
        <MapLibreGL.MapView
          style={{ flex: 1 }}
          styleURL={isDark ? DARK_STYLE : LIGHT_STYLE}
          logoEnabled={false}
          attributionEnabled={false}
        >
          <MapLibreGL.Camera
            defaultSettings={{ centerCoordinate: center, zoomLevel: 14 }}
            centerCoordinate={center}
            zoomLevel={14}
            animationMode="flyTo"
            animationDuration={800}
          />

          <MapLibreGL.UserLocation visible androidRenderMode="normal" />

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

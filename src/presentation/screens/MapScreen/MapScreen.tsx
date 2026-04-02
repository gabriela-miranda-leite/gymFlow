import BottomSheet from '@gorhom/bottom-sheet'
import { Camera, MapView, MarkerView } from '@maplibre/maplibre-react-native'
import { useFocusEffect } from '@react-navigation/native'
import { MotiView } from 'moti'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
import { GymDetailCard } from '@/presentation/components/GymDetailCard'
import { GymMarker } from '@/presentation/components/GymMarker'
import {
  Container,
  ErrorContainer,
  ErrorText,
  MapWrapper,
  UserLocationDot,
} from '@/presentation/screens/MapScreen/MapScreen.styles'
import { darkMapStyle, lightMapStyle } from '@/presentation/screens/MapScreen/mapStyles'
import { useMapViewModel } from '@/presentation/viewModels/MapViewModel'
import { Transition } from '@/theme/motion'

const DEFAULT_CENTER: [number, number] = [-48.2772, -18.9186] // Uberlândia

export function MapScreen() {
  const { theme, isDark } = useTheme()
  const [animKey, setAnimKey] = useState(0)

  useFocusEffect(
    useCallback(() => {
      setAnimKey((k) => k + 1)
    }, []),
  )

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
    <MotiView
      key={animKey}
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={Transition.screenEnter}
      style={{ flex: 1 }}
    >
      <Container>
        <MapWrapper>
          <MapView
            style={{ flex: 1 }}
            mapStyle={isDark ? darkMapStyle : lightMapStyle}
            logoEnabled={false}
            attributionEnabled={false}
          >
            <Camera
              centerCoordinate={center}
              zoomLevel={13}
              animationMode="flyTo"
              animationDuration={800}
            />

            {userCoordinates && (
              <MarkerView coordinate={[userCoordinates.longitude, userCoordinates.latitude]}>
                <UserLocationDot
                  color={theme.brand.primary}
                  borderColor={theme.brand.primaryForeground}
                />
              </MarkerView>
            )}

            {gyms.map((gym) => (
              <MarkerView
                key={gym.id}
                coordinate={[gym.coordinates.longitude, gym.coordinates.latitude]}
              >
                <GymMarker gym={gym} isActive={selectedGym?.id === gym.id} onPress={onSelectGym} />
              </MarkerView>
            ))}
          </MapView>

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
    </MotiView>
  )
}

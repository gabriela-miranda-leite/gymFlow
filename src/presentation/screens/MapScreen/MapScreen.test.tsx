import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'

import { MapScreen } from '@/presentation/screens/MapScreen/MapScreen'
import type { MapUiModel } from '@/presentation/uiModels/MapUiModel'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#FFFFFF',
      mutedForeground: '#71717A',
      foreground: '#18181B',
      card: '#FFFFFF',
      muted: '#F4F4F5',
      brand: { primary: '#F97316', primaryForeground: '#FFFFFF' },
      status: { empty: '#22C55E', packed: '#EF4444' },
    },
    isDark: false,
  }),
}))

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react')
  const { View } = require('react-native')
  const BottomSheet = React.forwardRef(
    (
      { children }: { children?: React.ReactNode; onClose?: () => void },
      ref: React.Ref<{ expand: () => void; close: () => void }>,
    ) => {
      React.useImperativeHandle(ref, () => ({ expand: jest.fn(), close: jest.fn() }))
      return React.createElement(View, { testID: 'bottom-sheet' }, children)
    },
  )
  BottomSheet.displayName = 'BottomSheet'
  const BottomSheetView = ({ children }: { children?: React.ReactNode }) =>
    React.createElement(View, {}, children)
  return { __esModule: true, default: BottomSheet, BottomSheetView }
})

const mockViewModel: MapUiModel = {
  userCoordinates: { latitude: -23.565, longitude: -46.6525 },
  gyms: [
    {
      id: '1',
      name: 'Smart Fit – Paulista',
      address: 'Av. Paulista, 1374',
      rating: 4.2,
      ratingLabel: '4.2',
      distanceLabel: '350 m',
      openingHours: '06:00 – 22:00',
      isOpen: true,
      statusLabel: 'map.open',
      tags: ['Musculação'],
      coordinates: { latitude: -23.565, longitude: -46.6525 },
    },
    {
      id: '2',
      name: 'Bodytech – Itaim Bibi',
      address: 'R. Leopoldo Couto de Magalhães Jr., 758',
      rating: 4.7,
      ratingLabel: '4.7',
      distanceLabel: '820 m',
      openingHours: '06:00 – 23:00',
      isOpen: true,
      statusLabel: 'map.open',
      tags: ['Pilates'],
      coordinates: { latitude: -23.5832, longitude: -46.6765 },
    },
  ],
  selectedGym: null,
  isLoading: false,
  locationError: null,
  onSelectGym: jest.fn(),
  onDismissCard: jest.fn(),
  onCheckIn: jest.fn(),
}

const mockUseMapViewModel = jest.fn(() => mockViewModel)

jest.mock('@/presentation/viewModels/MapViewModel', () => ({
  useMapViewModel: () => mockUseMapViewModel(),
}))

describe('MapScreen', () => {
  beforeEach(() => {
    mockUseMapViewModel.mockReturnValue(mockViewModel)
  })

  it('renders the map view', () => {
    const { getByTestId } = render(<MapScreen />)
    expect(getByTestId('map-view')).toBeTruthy()
  })

  it('renders a marker for each gym', () => {
    const { getAllByTestId } = render(<MapScreen />)
    expect(getAllByTestId('gym-marker')).toHaveLength(2)
  })

  it('shows activity indicator while loading', () => {
    mockUseMapViewModel.mockReturnValue({ ...mockViewModel, isLoading: true })
    const { getByTestId } = render(<MapScreen />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('shows error message when location is denied', () => {
    mockUseMapViewModel.mockReturnValue({
      ...mockViewModel,
      locationError: 'map.locationPermissionDenied',
    })
    const { getByText } = render(<MapScreen />)
    expect(getByText('map.locationPermissionDenied')).toBeTruthy()
  })

  it('calls onSelectGym when a gym marker is pressed', () => {
    const onSelectGym = jest.fn()
    mockUseMapViewModel.mockReturnValue({ ...mockViewModel, onSelectGym })
    const { getAllByTestId } = render(<MapScreen />)
    fireEvent.press(getAllByTestId('gym-marker')[0])
    expect(onSelectGym).toHaveBeenCalledWith(mockViewModel.gyms[0])
  })

  it('shows gym detail card content when a gym is selected', () => {
    mockUseMapViewModel.mockReturnValue({
      ...mockViewModel,
      selectedGym: mockViewModel.gyms[0],
    })
    const { getByText } = render(<MapScreen />)
    expect(getByText('Smart Fit – Paulista')).toBeTruthy()
  })
})

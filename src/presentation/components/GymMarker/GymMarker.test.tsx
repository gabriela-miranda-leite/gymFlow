import { render, fireEvent } from '@testing-library/react-native'

import { GymMarker } from '@/presentation/components/GymMarker/GymMarker'
import type { GymUiModel } from '@/presentation/uiModels/MapUiModel'

const mockGym: GymUiModel = {
  id: '1',
  name: 'Smart Fit – Paulista',
  address: 'Av. Paulista, 1374',
  rating: 4.2,
  ratingLabel: '4.2',
  distanceLabel: '350 m',
  openingHours: '06:00 – 22:00',
  isOpen: true,
  statusLabel: 'Aberto',
  tags: ['Musculação'],
  coordinates: { latitude: -23.565, longitude: -46.6525 },
}

const defaultColors = {
  primaryColor: '#F97316',
  primaryForeground: '#FFFFFF',
  cardColor: '#FFFFFF',
}

describe('GymMarker', () => {
  it('renders with gym-marker testID', () => {
    const { getByTestId } = render(
      <GymMarker gym={mockGym} isActive={false} onPress={jest.fn()} {...defaultColors} />,
    )
    expect(getByTestId('gym-marker')).toBeTruthy()
  })

  it('calls onPress with the gym when pressed', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <GymMarker gym={mockGym} isActive={false} onPress={onPress} {...defaultColors} />,
    )
    fireEvent.press(getByTestId('gym-marker'))
    expect(onPress).toHaveBeenCalledWith(mockGym)
  })

  it('does not call onPress for a different gym when pressing a specific marker', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <GymMarker gym={mockGym} isActive={false} onPress={onPress} {...defaultColors} />,
    )
    fireEvent.press(getByTestId('gym-marker'))
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }))
  })

  it('renders in active state without crashing', () => {
    const { getByTestId } = render(
      <GymMarker gym={mockGym} isActive={true} onPress={jest.fn()} {...defaultColors} />,
    )
    expect(getByTestId('gym-marker')).toBeTruthy()
  })
})

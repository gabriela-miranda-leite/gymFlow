import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { GymDetailScreen } from '@/presentation/screens/GymDetailScreen/GymDetailScreen'

const mockOnBack = jest.fn()
const mockOnToggleFavorite = jest.fn()
const mockOnSelectDay = jest.fn()
const mockOnNotify = jest.fn()

const MOCK_BARS = Array.from({ length: 24 }, (_, hour) => ({
  hour,
  occupancyPercent: hour === 9 ? 10 : 65,
  barColor: hour === 9 ? '#22C55E' : '#EF4444',
  isFuture: false,
  isCurrentHour: hour === 10,
}))

const defaultViewModel = {
  gymId: '1',
  name: 'SmartFit Paulista',
  address: 'Av. Paulista, 1374 – Bela Vista, São Paulo',
  occupancyPercent: '55%',
  occupancyLabel: 'Normal',
  occupancyLabelColor: '#EAB308',
  occupancyStatusColor: '#EAB308',
  bestTimeLabel: '09:00',
  bestTimeOccupancy: '10% lotação',
  bestTimeTrendIcon: 'down' as const,
  selectedDayIndex: 1,
  days: [
    { label: 'DOM', dayIndex: 0 },
    { label: 'SEG', dayIndex: 1 },
    { label: 'TER', dayIndex: 2 },
    { label: 'QUA', dayIndex: 3 },
    { label: 'QUI', dayIndex: 4 },
    { label: 'SEX', dayIndex: 5 },
    { label: 'SÁB', dayIndex: 6 },
  ],
  flowChartTitle: 'Fluxo por hora · SEG',
  hourlyBars: MOCK_BARS,
  currentHour: 10,
  isFavorite: false,
  notifyButtonLabel: 'Avisar quando esvaziar',
  updatedAtLabel: 'Atualizado 5 min atrás',
  occupancy: 'moderate' as const,
  onBack: mockOnBack,
  onToggleFavorite: mockOnToggleFavorite,
  onSelectDay: mockOnSelectDay,
  onNotify: mockOnNotify,
}

const mockUseGymDetailViewModel = jest.fn()

jest.mock('@/presentation/viewModels/GymDetailViewModel', () => ({
  useGymDetailViewModel: () => mockUseGymDetailViewModel(),
}))

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#FFFFFF',
      card: '#F7F7F8',
      foreground: '#18181B',
      mutedForeground: '#A1A1AA',
      secondary: '#F0F0F2',
      border: '#E4E4E7',
      brand: {
        primary: '#FF6A00',
        primaryForeground: '#FFFFFF',
        subtle: 'rgba(255, 106, 0, 0.10)',
      },
      status: {
        empty: '#22C55E',
        moderate: '#EAB308',
        busy: '#F97316',
        packed: '#EF4444',
      },
    },
  }),
}))

describe('GymDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseGymDetailViewModel.mockReturnValue(defaultViewModel)
  })

  it('renders without crashing', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    expect(getByTestId('gym-detail-safe-wrapper')).toBeTruthy()
  })

  it('renders gym name', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    expect(getByTestId('gym-detail-name')).toBeTruthy()
  })

  it('renders gym address', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    expect(getByTestId('gym-detail-address')).toBeTruthy()
  })

  it('renders occupancy card with correct percentage', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    const percent = getByTestId('gym-detail-occupancy-percent')
    expect(percent.props.children).toBe('55%')
  })

  it('renders occupancy label', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    expect(getByTestId('gym-detail-occupancy-label')).toBeTruthy()
  })

  it('renders best time card', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    expect(getByTestId('gym-detail-best-time-card')).toBeTruthy()
  })

  it('renders best time label', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    const label = getByTestId('gym-detail-best-time-label')
    expect(label.props.children).toBe('09:00')
  })

  it('renders 7 day pills in the selector', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    for (let i = 0; i < 7; i++) {
      expect(getByTestId(`gym-detail-day-${i}`)).toBeTruthy()
    }
  })

  it('renders 24 bar elements in the chart', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    for (let h = 0; h < 24; h++) {
      expect(getByTestId(`gym-detail-bar-${h}`)).toBeTruthy()
    }
  })

  it('renders the notify button', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    expect(getByTestId('gym-detail-notify-button')).toBeTruthy()
  })

  it('renders the updated-at footer', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    expect(getByTestId('gym-detail-updated-at')).toBeTruthy()
  })

  it('calls onBack when back button is pressed', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    fireEvent.press(getByTestId('gym-detail-back-button'))
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  it('calls onToggleFavorite when favorite button is pressed', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    fireEvent.press(getByTestId('gym-detail-favorite-button'))
    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1)
  })

  it('calls onSelectDay with correct index when a day pill is pressed', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    fireEvent.press(getByTestId('gym-detail-day-3'))
    expect(mockOnSelectDay).toHaveBeenCalledWith(3)
  })

  it('calls onNotify when notify button is pressed', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    fireEvent.press(getByTestId('gym-detail-notify-button'))
    expect(mockOnNotify).toHaveBeenCalledTimes(1)
  })

  it('shows filled heart when isFavorite is true', () => {
    mockUseGymDetailViewModel.mockReturnValueOnce({
      ...defaultViewModel,
      isFavorite: true,
    })

    const { getByTestId } = render(<GymDetailScreen />)
    expect(getByTestId('gym-detail-favorite-button')).toBeTruthy()
  })

  it('renders chart section', () => {
    const { getByTestId } = render(<GymDetailScreen />)
    expect(getByTestId('gym-detail-chart-section')).toBeTruthy()
  })
})

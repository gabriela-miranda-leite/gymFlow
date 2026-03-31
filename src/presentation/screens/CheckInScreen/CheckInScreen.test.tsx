import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'

import { CheckInScreen } from '@/presentation/screens/CheckInScreen/CheckInScreen'
import { colors } from '@/tokens'

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const mockOnSelectOccupancy = jest.fn()
const mockOnSelectGym = jest.fn()

const defaultViewModel = {
  title: 'checkIn.title',
  selectPlaceholder: 'checkIn.selectPlaceholder',
  gymOptions: [
    { value: '1', label: 'Smart Fit', sublabel: 'Av. Paulista' },
    { value: '2', label: 'Bodytech', sublabel: 'R. Augusta' },
  ],
  selectedGymId: '1',
  onSelectGym: mockOnSelectGym,
  occupancyOptions: [
    {
      value: 'empty',
      label: 'checkIn.buttonGroup.options.empty.label',
      sublabel: 'checkIn.buttonGroup.options.empty.sublabel',
      color: colors.statusEmpty,
    },
    {
      value: 'moderate',
      label: 'checkIn.buttonGroup.options.normal.label',
      sublabel: 'checkIn.buttonGroup.options.normal.sublabel',
      color: colors.statusModerate,
    },
    {
      value: 'busy',
      label: 'checkIn.buttonGroup.options.full.label',
      sublabel: 'checkIn.buttonGroup.options.full.sublabel',
      color: colors.statusBusy,
    },
    {
      value: 'packed',
      label: 'checkIn.buttonGroup.options.packed.label',
      sublabel: 'checkIn.buttonGroup.options.packed.sublabel',
      color: colors.statusFull,
    },
  ],
  isLoading: false,
  error: null,
  onSelectOccupancy: mockOnSelectOccupancy,
}

const mockUseCheckInViewModel = jest.fn()

jest.mock('@/presentation/viewModels/CheckInViewModel', () => ({
  useCheckInViewModel: () => mockUseCheckInViewModel(),
}))

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#FFFFFF',
      foreground: '#18181B',
      mutedForeground: '#A1A1AA',
      card: '#F7F7F8',
      border: '#E4E4E7',
      brand: { primary: '#FF6A00', primaryForeground: '#FFFFFF' },
    },
  }),
}))

describe('CheckInScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseCheckInViewModel.mockReturnValue(defaultViewModel)
  })

  it('renders the title correctly', () => {
    const { getByTestId } = render(<CheckInScreen />)

    expect(getByTestId('checkin-title')).toBeTruthy()
  })

  it('renders Select with placeholder when no gym is selected', () => {
    mockUseCheckInViewModel.mockReturnValueOnce({
      ...defaultViewModel,
      selectedGymId: undefined,
    })

    const { getByText } = render(<CheckInScreen />)

    expect(getByText('checkIn.selectPlaceholder')).toBeTruthy()
  })

  it('renders ButtonGroup with 4 occupancy options', () => {
    const { getByText } = render(<CheckInScreen />)

    expect(getByText('checkIn.buttonGroup.options.empty.label')).toBeTruthy()
    expect(getByText('checkIn.buttonGroup.options.normal.label')).toBeTruthy()
    expect(getByText('checkIn.buttonGroup.options.full.label')).toBeTruthy()
    expect(getByText('checkIn.buttonGroup.options.packed.label')).toBeTruthy()
  })

  it('calls onSelectOccupancy when a ButtonGroup option is pressed', async () => {
    const { getByText } = render(<CheckInScreen />)

    fireEvent.press(getByText('checkIn.buttonGroup.options.empty.label'))

    await waitFor(() => {
      expect(mockOnSelectOccupancy).toHaveBeenCalledWith('empty')
    })
  })

  it('renders Select with selected gym name when gym is selected', () => {
    mockUseCheckInViewModel.mockReturnValueOnce({
      ...defaultViewModel,
      gymOptions: [{ value: '1', label: 'Smart Fit', sublabel: 'Av. Paulista' }],
      selectedGymId: '1',
    })

    const { getByText } = render(<CheckInScreen />)

    expect(getByText('Smart Fit')).toBeTruthy()
  })

  it('disables ButtonGroup items when isLoading is true', () => {
    mockUseCheckInViewModel.mockReturnValueOnce({
      ...defaultViewModel,
      isLoading: true,
    })

    const { getAllByRole } = render(<CheckInScreen />)

    const buttons = getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn.props.accessibilityState?.disabled).toBe(true)
    })
  })

  it('disables ButtonGroup items when no gym is selected', () => {
    mockUseCheckInViewModel.mockReturnValueOnce({
      ...defaultViewModel,
      selectedGymId: undefined,
    })

    const { getAllByRole } = render(<CheckInScreen />)

    const buttons = getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn.props.accessibilityState?.disabled).toBe(true)
    })
  })
})

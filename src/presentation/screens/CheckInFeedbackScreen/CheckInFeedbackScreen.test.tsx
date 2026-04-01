import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { CheckInFeedbackScreen } from '@/presentation/screens/CheckInFeedbackScreen/CheckInFeedbackScreen'
import { colors } from '@/tokens'

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const mockOnBack = jest.fn()

const defaultViewModel = {
  title: 'checkInFeedback.title',
  subtitle: 'checkInFeedback.subtitle',
  successIconLabel: 'checkInFeedback.successIconLabel',
  gymName: 'Smart Fit',
  occupancyLabel: 'Cheio',
  occupancyColor: colors.statusBusy,
  buttonLabel: 'checkInFeedback.button',
  onBack: mockOnBack,
}

const mockUseCheckInFeedbackViewModel = jest.fn()

jest.mock('@/presentation/viewModels/CheckInFeedbackViewModel', () => ({
  useCheckInFeedbackViewModel: () => mockUseCheckInFeedbackViewModel(),
}))

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#FFFFFF',
      foreground: '#18181B',
      mutedForeground: '#A1A1AA',
      card: '#F7F7F8',
      secondary: '#F0F0F2',
      secondaryForeground: '#52525B',
      border: '#E4E4E7',
      brand: {
        primary: '#FF6A00',
        primaryForeground: '#FFFFFF',
        subtle: 'rgba(255, 106, 0, 0.10)',
      },
    },
  }),
}))

describe('CheckInFeedbackScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseCheckInFeedbackViewModel.mockReturnValue(defaultViewModel)
  })

  it('renders the success icon', () => {
    const { getByTestId } = render(<CheckInFeedbackScreen />)

    expect(getByTestId('feedback-success-icon')).toBeTruthy()
  })

  it('renders the title correctly', () => {
    const { getByTestId } = render(<CheckInFeedbackScreen />)

    expect(getByTestId('feedback-title')).toBeTruthy()
  })

  it('renders the subtitle correctly', () => {
    const { getByTestId } = render(<CheckInFeedbackScreen />)

    expect(getByTestId('feedback-subtitle')).toBeTruthy()
  })

  it('renders the occupancy label', () => {
    const { getByText } = render(<CheckInFeedbackScreen />)

    expect(getByText(defaultViewModel.occupancyLabel)).toBeTruthy()
  })

  it('renders the gym name', () => {
    const { getByTestId, getByText } = render(<CheckInFeedbackScreen />)

    expect(getByTestId('feedback-gym-name')).toBeTruthy()
    expect(getByText(defaultViewModel.gymName)).toBeTruthy()
  })

  it('renders the back button', () => {
    const { getByTestId } = render(<CheckInFeedbackScreen />)

    expect(getByTestId('feedback-back-button')).toBeTruthy()
  })

  it('calls onBack when back button is pressed', () => {
    const { getByTestId } = render(<CheckInFeedbackScreen />)

    fireEvent.press(getByTestId('feedback-back-button'))

    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })
})

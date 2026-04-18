import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { ChangeEmailScreen } from '@/presentation/screens/ChangeEmailScreen/ChangeEmailScreen'

const mockOnChangeEmail = jest.fn()
const mockOnPressSave = jest.fn()
const mockOnPressBack = jest.fn()

const defaultViewModel = {
  currentEmail: 'rafael@email.com',
  email: '',
  emailError: null,
  submitError: null,
  isLoading: false,
  onChangeEmail: mockOnChangeEmail,
  onPressSave: mockOnPressSave,
  onPressBack: mockOnPressBack,
}

const mockUseChangeEmailViewModel = jest.fn()

jest.mock('@/presentation/viewModels/ChangeEmailViewModel', () => ({
  useChangeEmailViewModel: () => mockUseChangeEmailViewModel(),
}))

const mockTheme = {
  theme: {
    background: '#FFFFFF',
    card: '#F7F7F8',
    foreground: '#18181B',
    mutedForeground: '#A1A1AA',
    border: '#E4E4E7',
    input: '#F2F2F7',
    destructive: '#EF4444',
    brand: {
      primary: '#FF6A00',
      primaryForeground: '#FFFFFF',
      subtle: 'rgba(255, 106, 0, 0.10)',
    },
  },
}

jest.mock('@/contexts', () => ({
  useTheme: () => mockTheme,
}))

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => mockTheme,
}))

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: 'SafeAreaView',
}))

describe('ChangeEmailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseChangeEmailViewModel.mockReturnValue(defaultViewModel)
  })

  it('renders without crashing', () => {
    const { getByTestId } = render(<ChangeEmailScreen />)

    expect(getByTestId('change-email-screen')).toBeTruthy()
  })

  it('renders the screen title', () => {
    const { getByTestId } = render(<ChangeEmailScreen />)

    expect(getByTestId('change-email-title')).toBeTruthy()
  })

  it('renders the back button', () => {
    const { getByTestId } = render(<ChangeEmailScreen />)

    expect(getByTestId('change-email-back-button')).toBeTruthy()
  })

  it('renders the new email input', () => {
    const { getByTestId } = render(<ChangeEmailScreen />)

    expect(getByTestId('change-email-new-email-input')).toBeTruthy()
  })

  it('renders the save button', () => {
    const { getByTestId } = render(<ChangeEmailScreen />)

    expect(getByTestId('change-email-save-button')).toBeTruthy()
  })

  it('renders the current email', () => {
    const { getByText } = render(<ChangeEmailScreen />)

    expect(getByText('rafael@email.com')).toBeTruthy()
  })

  it('save button is disabled when email is empty', () => {
    const { getByTestId } = render(<ChangeEmailScreen />)

    expect(getByTestId('change-email-save-button')).toBeDisabled()
  })

  it('save button is enabled when email is filled', () => {
    mockUseChangeEmailViewModel.mockReturnValue({ ...defaultViewModel, email: 'novo@email.com' })
    const { getByTestId } = render(<ChangeEmailScreen />)

    expect(getByTestId('change-email-save-button')).not.toBeDisabled()
  })

  it('calls onPressBack when back button is pressed', () => {
    const { getByTestId } = render(<ChangeEmailScreen />)

    fireEvent.press(getByTestId('change-email-back-button'))

    expect(mockOnPressBack).toHaveBeenCalledTimes(1)
  })

  it('calls onPressSave when save button is pressed with a filled email', () => {
    mockUseChangeEmailViewModel.mockReturnValue({ ...defaultViewModel, email: 'novo@email.com' })
    const { getByTestId } = render(<ChangeEmailScreen />)

    fireEvent.press(getByTestId('change-email-save-button'))

    expect(mockOnPressSave).toHaveBeenCalledTimes(1)
  })

  it('calls onChangeEmail when input changes', () => {
    const { getByTestId } = render(<ChangeEmailScreen />)

    fireEvent.changeText(getByTestId('change-email-new-email-input'), 'novo@email.com')

    expect(mockOnChangeEmail).toHaveBeenCalledWith('novo@email.com')
  })

  it('displays inline email validation error', () => {
    mockUseChangeEmailViewModel.mockReturnValue({
      ...defaultViewModel,
      emailError: 'Insira um email válido.',
    })
    const { getByText } = render(<ChangeEmailScreen />)

    expect(getByText('Insira um email válido.')).toBeTruthy()
  })

  it('displays submit error message', () => {
    mockUseChangeEmailViewModel.mockReturnValue({
      ...defaultViewModel,
      submitError: 'Algo deu errado. Tente novamente.',
    })
    const { getByTestId } = render(<ChangeEmailScreen />)

    expect(getByTestId('change-email-submit-error')).toBeTruthy()
  })
})

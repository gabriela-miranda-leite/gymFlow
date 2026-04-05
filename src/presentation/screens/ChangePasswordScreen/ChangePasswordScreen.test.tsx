import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { ChangePasswordScreen } from '@/presentation/screens/ChangePasswordScreen/ChangePasswordScreen'

const mockOnChangeCurrentPassword = jest.fn()
const mockOnChangeNewPassword = jest.fn()
const mockOnChangeConfirmPassword = jest.fn()
const mockOnPressSave = jest.fn()
const mockOnPressBack = jest.fn()

const defaultViewModel = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  currentPasswordError: null,
  newPasswordError: null,
  confirmPasswordError: null,
  submitError: null,
  isLoading: false,
  onChangeCurrentPassword: mockOnChangeCurrentPassword,
  onChangeNewPassword: mockOnChangeNewPassword,
  onChangeConfirmPassword: mockOnChangeConfirmPassword,
  onPressSave: mockOnPressSave,
  onPressBack: mockOnPressBack,
}

const mockUseChangePasswordViewModel = jest.fn()

jest.mock('@/presentation/viewModels/ChangePasswordViewModel', () => ({
  useChangePasswordViewModel: () => mockUseChangePasswordViewModel(),
}))

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
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
  }),
}))

jest.mock('@/contexts', () => ({
  useTheme: () => ({
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
  }),
}))

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: 'SafeAreaView',
}))

describe('ChangePasswordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseChangePasswordViewModel.mockReturnValue(defaultViewModel)
  })

  it('renders the screen', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    expect(getByTestId('change-password-screen')).toBeTruthy()
  })

  it('renders all fields', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    expect(getByTestId('change-password-current-password-input')).toBeTruthy()
    expect(getByTestId('change-password-new-password-input')).toBeTruthy()
    expect(getByTestId('change-password-confirm-password-input')).toBeTruthy()
  })

  it('renders the title', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    expect(getByTestId('change-password-title')).toBeTruthy()
  })

  it('renders the back button', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    expect(getByTestId('change-password-back-button')).toBeTruthy()
  })

  it('renders the save button', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    expect(getByTestId('change-password-save-button')).toBeTruthy()
  })

  it('save button is disabled when fields are empty', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    const saveButton = getByTestId('change-password-save-button')

    expect(saveButton.props.accessibilityState?.disabled).toBe(true)
  })

  it('save button is enabled when all fields are filled', () => {
    mockUseChangePasswordViewModel.mockReturnValue({
      ...defaultViewModel,
      currentPassword: 'oldPass1',
      newPassword: 'newPass1',
      confirmPassword: 'newPass1',
    })

    const { getByTestId } = render(<ChangePasswordScreen />)

    const saveButton = getByTestId('change-password-save-button')

    expect(saveButton.props.accessibilityState?.disabled).toBeFalsy()
  })

  it('calls onPressSave when save button is pressed with all fields filled', () => {
    mockUseChangePasswordViewModel.mockReturnValue({
      ...defaultViewModel,
      currentPassword: 'oldPass1',
      newPassword: 'newPass1',
      confirmPassword: 'newPass1',
    })

    const { getByTestId } = render(<ChangePasswordScreen />)

    fireEvent.press(getByTestId('change-password-save-button'))

    expect(mockOnPressSave).toHaveBeenCalledTimes(1)
  })

  it('calls onPressBack when back button is pressed', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    fireEvent.press(getByTestId('change-password-back-button'))

    expect(mockOnPressBack).toHaveBeenCalledTimes(1)
  })

  it('calls onChangeCurrentPassword when current password input changes', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    fireEvent.changeText(getByTestId('change-password-current-password-input'), 'oldPass')

    expect(mockOnChangeCurrentPassword).toHaveBeenCalledWith('oldPass')
  })

  it('calls onChangeNewPassword when new password input changes', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    fireEvent.changeText(getByTestId('change-password-new-password-input'), 'newPass')

    expect(mockOnChangeNewPassword).toHaveBeenCalledWith('newPass')
  })

  it('calls onChangeConfirmPassword when confirm password input changes', () => {
    const { getByTestId } = render(<ChangePasswordScreen />)

    fireEvent.changeText(getByTestId('change-password-confirm-password-input'), 'newPass')

    expect(mockOnChangeConfirmPassword).toHaveBeenCalledWith('newPass')
  })

  it('renders submit error when present', () => {
    mockUseChangePasswordViewModel.mockReturnValue({
      ...defaultViewModel,
      submitError: 'Algo deu errado. Tente novamente.',
    })

    const { getByTestId } = render(<ChangePasswordScreen />)

    expect(getByTestId('change-password-submit-error')).toBeTruthy()
  })
})

import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { EditProfileScreen } from '@/presentation/screens/EditProfileScreen/EditProfileScreen'

const mockOnChangeName = jest.fn()
const mockOnChangePhone = jest.fn()
const mockOnPressSave = jest.fn()
const mockOnPressBack = jest.fn()
const mockOnPressCameraBadge = jest.fn()

const defaultViewModel = {
  name: 'Rafael Souza',
  phone: '(11) 98765-4321',
  onChangeName: mockOnChangeName,
  onChangePhone: mockOnChangePhone,
  onPressSave: mockOnPressSave,
  onPressBack: mockOnPressBack,
  onPressCameraBadge: mockOnPressCameraBadge,
}

const mockUseEditProfileViewModel = jest.fn()

jest.mock('@/presentation/viewModels/EditProfileViewModel', () => ({
  useEditProfileViewModel: () => mockUseEditProfileViewModel(),
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

describe('EditProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseEditProfileViewModel.mockReturnValue(defaultViewModel)
  })

  it('renders without crashing', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    expect(getByTestId('edit-profile-screen')).toBeTruthy()
  })

  it('renders the screen title', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    expect(getByTestId('edit-profile-title')).toBeTruthy()
  })

  it('renders the avatar with camera badge', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    expect(getByTestId('edit-profile-avatar')).toBeTruthy()
    expect(getByTestId('edit-profile-avatar-camera-badge')).toBeTruthy()
  })

  it('renders the name input with current value', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    const nameInput = getByTestId('edit-profile-name-input')
    expect(nameInput).toBeTruthy()
    expect(nameInput.props.value).toBe('Rafael Souza')
  })

  it('renders the phone input with current value', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    const phoneInput = getByTestId('edit-profile-phone-input')
    expect(phoneInput).toBeTruthy()
    expect(phoneInput.props.value).toBe('(11) 98765-4321')
  })

  it('renders the save button', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    expect(getByTestId('edit-profile-save-button')).toBeTruthy()
  })

  it('renders the back button', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    expect(getByTestId('edit-profile-back-button')).toBeTruthy()
  })

  it('calls onPressBack when back button is pressed', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    fireEvent.press(getByTestId('edit-profile-back-button'))

    expect(mockOnPressBack).toHaveBeenCalledTimes(1)
  })

  it('calls onPressSave when save button is pressed', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    fireEvent.press(getByTestId('edit-profile-save-button'))

    expect(mockOnPressSave).toHaveBeenCalledTimes(1)
  })

  it('calls onChangeName when name input changes', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    fireEvent.changeText(getByTestId('edit-profile-name-input'), 'João Silva')

    expect(mockOnChangeName).toHaveBeenCalledWith('João Silva')
  })

  it('calls onChangePhone when phone input changes', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    fireEvent.changeText(getByTestId('edit-profile-phone-input'), '11987654321')

    expect(mockOnChangePhone).toHaveBeenCalledWith('11987654321')
  })

  it('calls onPressCameraBadge when camera badge is pressed', () => {
    const { getByTestId } = render(<EditProfileScreen />)

    fireEvent.press(getByTestId('edit-profile-avatar-camera-badge'))

    expect(mockOnPressCameraBadge).toHaveBeenCalledTimes(1)
  })
})

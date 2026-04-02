import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { ProfileScreen } from '@/presentation/screens/ProfileScreen/ProfileScreen'

const mockOnPressProfile = jest.fn()
const mockOnPressEmail = jest.fn()
const mockOnPressPassword = jest.fn()
const mockOnPressFavoriteGym = jest.fn()
const mockOnToggleIdealTime = jest.fn()
const mockOnChangeOccupancyLimit = jest.fn()
const mockOnToggleTheme = jest.fn()
const mockOnPressLogout = jest.fn()

const defaultViewModel = {
  userName: 'Rafael Souza',
  checkInsThisMonth: 12,
  email: 'rafael@email.com',
  passwordPlaceholder: '••••••••',
  favoriteGyms: [
    {
      id: '1',
      name: 'SmartFit Paulista',
      address: 'Av. Paulista, 1000',
      occupancy: 22,
      indicatorColor: '#4CAF50',
    },
    {
      id: '2',
      name: 'BodyTech Jardins',
      address: 'R. Oscar Freire, 450',
      occupancy: 45,
      indicatorColor: '#FFC107',
    },
  ],
  idealTimeEnabled: true,
  occupancyLimit: 40,
  isDarkMode: false,
  onPressProfile: mockOnPressProfile,
  onPressEmail: mockOnPressEmail,
  onPressPassword: mockOnPressPassword,
  onPressFavoriteGym: mockOnPressFavoriteGym,
  onToggleIdealTime: mockOnToggleIdealTime,
  onChangeOccupancyLimit: mockOnChangeOccupancyLimit,
  onToggleTheme: mockOnToggleTheme,
  onPressLogout: mockOnPressLogout,
}

const mockUseProfileViewModel = jest.fn()

jest.mock('@/presentation/viewModels/ProfileViewModel', () => ({
  useProfileViewModel: () => mockUseProfileViewModel(),
}))

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#FFFFFF',
      card: '#F7F7F8',
      foreground: '#18181B',
      mutedForeground: '#A1A1AA',
      border: '#E4E4E7',
      destructive: '#EF4444',
      brand: {
        primary: '#FF6A00',
        primaryForeground: '#FFFFFF',
        subtle: 'rgba(255, 106, 0, 0.10)',
      },
    },
  }),
}))

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseProfileViewModel.mockReturnValue(defaultViewModel)
  })

  it('renders without crashing', () => {
    const { getByTestId } = render(<ProfileScreen />)

    expect(getByTestId('profile-scroll-view')).toBeTruthy()
  })

  it('renders the user name', () => {
    const { getByText } = render(<ProfileScreen />)

    expect(getByText('Rafael Souza')).toBeTruthy()
  })

  it('renders the check-ins count', () => {
    const { getByText } = render(<ProfileScreen />)

    expect(getByText('profile.checkIns')).toBeTruthy()
  })

  it('renders the email row', () => {
    const { getByTestId } = render(<ProfileScreen />)

    expect(getByTestId('profile-email-row')).toBeTruthy()
  })

  it('renders the password row', () => {
    const { getByTestId } = render(<ProfileScreen />)

    expect(getByTestId('profile-password-row')).toBeTruthy()
  })

  it('renders both favorite gyms', () => {
    const { getByTestId } = render(<ProfileScreen />)

    expect(getByTestId('profile-favorite-gym-1')).toBeTruthy()
    expect(getByTestId('profile-favorite-gym-2')).toBeTruthy()
  })

  it('renders the ideal time toggle row', () => {
    const { getByTestId } = render(<ProfileScreen />)

    expect(getByTestId('profile-ideal-time-toggle')).toBeTruthy()
  })

  it('renders the occupancy slider row', () => {
    const { getByTestId } = render(<ProfileScreen />)

    expect(getByTestId('profile-occupancy-slider')).toBeTruthy()
  })

  it('renders the theme button', () => {
    const { getByTestId } = render(<ProfileScreen />)

    expect(getByTestId('profile-theme-button')).toBeTruthy()
  })

  it('renders the logout button', () => {
    const { getByTestId } = render(<ProfileScreen />)

    expect(getByTestId('profile-logout-button')).toBeTruthy()
  })

  it('calls onPressEmail when email row is pressed', () => {
    const { getByTestId } = render(<ProfileScreen />)

    fireEvent.press(getByTestId('profile-email-row'))

    expect(mockOnPressEmail).toHaveBeenCalledTimes(1)
  })

  it('calls onPressPassword when password row is pressed', () => {
    const { getByTestId } = render(<ProfileScreen />)

    fireEvent.press(getByTestId('profile-password-row'))

    expect(mockOnPressPassword).toHaveBeenCalledTimes(1)
  })

  it('calls onPressFavoriteGym with correct id when gym row is pressed', () => {
    const { getByTestId } = render(<ProfileScreen />)

    fireEvent.press(getByTestId('profile-favorite-gym-1'))

    expect(mockOnPressFavoriteGym).toHaveBeenCalledWith('1')
  })

  it('calls onToggleTheme when theme button is pressed', () => {
    const { getByTestId } = render(<ProfileScreen />)

    fireEvent.press(getByTestId('profile-theme-button'))

    expect(mockOnToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('calls onPressLogout when logout button is pressed', () => {
    const { getByTestId } = render(<ProfileScreen />)

    fireEvent.press(getByTestId('profile-logout-button'))

    expect(mockOnPressLogout).toHaveBeenCalledTimes(1)
  })

  it('shows dark mode label when isDarkMode is true', () => {
    mockUseProfileViewModel.mockReturnValueOnce({
      ...defaultViewModel,
      isDarkMode: true,
    })

    const { getByText } = render(<ProfileScreen />)

    expect(getByText('profile.lightMode')).toBeTruthy()
  })

  it('shows light mode label when isDarkMode is false', () => {
    const { getByText } = render(<ProfileScreen />)

    expect(getByText('profile.darkMode')).toBeTruthy()
  })

  it('renders gym occupancy as percentage', () => {
    const { getByText } = render(<ProfileScreen />)

    expect(getByText('22%')).toBeTruthy()
    expect(getByText('45%')).toBeTruthy()
  })
})

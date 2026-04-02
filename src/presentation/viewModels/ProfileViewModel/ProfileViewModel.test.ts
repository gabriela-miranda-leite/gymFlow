import { act, renderHook } from '@testing-library/react-native'

import { useProfileViewModel } from '@/presentation/viewModels/ProfileViewModel/ProfileViewModel'

const mockSetMode = jest.fn()

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    isDark: false,
    setMode: mockSetMode,
  }),
}))

describe('useProfileViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('returns the mocked user name', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.userName).toBe('Rafael Souza')
    })

    it('returns the mocked check-ins count', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.checkInsThisMonth).toBe(12)
    })

    it('returns the mocked email', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.email).toBe('rafael@email.com')
    })

    it('returns the password placeholder', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.passwordPlaceholder).toBe('••••••••')
    })

    it('returns two favorite gyms', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.favoriteGyms).toHaveLength(2)
    })

    it('starts with idealTimeEnabled true', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.idealTimeEnabled).toBe(true)
    })

    it('starts with occupancyLimit 40', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.occupancyLimit).toBe(40)
    })

    it('exposes isDarkMode from theme context', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.isDarkMode).toBe(false)
    })
  })

  describe('onToggleIdealTime', () => {
    it('updates idealTimeEnabled when toggled', () => {
      const { result } = renderHook(() => useProfileViewModel())

      act(() => {
        result.current.onToggleIdealTime(false)
      })

      expect(result.current.idealTimeEnabled).toBe(false)
    })
  })

  describe('onChangeOccupancyLimit', () => {
    it('updates occupancyLimit when changed', () => {
      const { result } = renderHook(() => useProfileViewModel())

      act(() => {
        result.current.onChangeOccupancyLimit(60)
      })

      expect(result.current.occupancyLimit).toBe(60)
    })
  })

  describe('onToggleTheme', () => {
    it('calls setMode with "dark" when current mode is light', () => {
      const { result } = renderHook(() => useProfileViewModel())

      act(() => {
        result.current.onToggleTheme()
      })

      expect(mockSetMode).toHaveBeenCalledWith('dark')
    })

    it('calls setMode with "light" when current mode is dark', () => {
      jest.spyOn(require('@/contexts/ThemeContext'), 'useTheme').mockReturnValueOnce({
        isDark: true,
        setMode: mockSetMode,
      })

      const { result } = renderHook(() => useProfileViewModel())

      act(() => {
        result.current.onToggleTheme()
      })

      expect(mockSetMode).toHaveBeenCalledWith('light')
    })
  })

  describe('favorite gyms data', () => {
    it('returns correct data for first gym', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.favoriteGyms[0]).toMatchObject({
        id: '1',
        name: 'SmartFit Paulista',
        address: 'Av. Paulista, 1000',
        occupancy: 22,
        indicatorColor: '#4CAF50',
      })
    })

    it('returns correct data for second gym', () => {
      const { result } = renderHook(() => useProfileViewModel())

      expect(result.current.favoriteGyms[1]).toMatchObject({
        id: '2',
        name: 'BodyTech Jardins',
        address: 'R. Oscar Freire, 450',
        occupancy: 45,
        indicatorColor: '#FFC107',
      })
    })
  })
})

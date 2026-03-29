import { act, renderHook, waitFor } from '@testing-library/react-native'
import * as Location from 'expo-location'

import { gymRepository } from '@/data/repositories/GymRepository'
import { useMapViewModel } from '@/presentation/viewModels/MapViewModel'
import { TabRoutes } from '@/shared/navigation/routes'

const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(() => ({ navigate: mockNavigate })),
}))

const mockGymModels = [
  {
    id: '1',
    name: 'Smart Fit – Paulista',
    address: 'Av. Paulista, 1374',
    rating: 4.2,
    distanceMeters: 350,
    openingHours: '06:00 – 22:00',
    isOpen: true,
    tags: ['Musculação'],
    coordinates: { latitude: -23.565, longitude: -46.6525 },
    occupancy: 'LOW' as const,
  },
  {
    id: '2',
    name: 'Bodytech',
    address: 'R. Leopoldo Couto, 758',
    rating: 4.7,
    distanceMeters: 1500,
    openingHours: '06:00 – 23:00',
    isOpen: false,
    tags: ['Pilates'],
    coordinates: { latitude: -23.583, longitude: -46.676 },
    occupancy: 'HIGH' as const,
  },
]

jest.mock('@/data/repositories/GymRepository', () => ({
  gymRepository: {
    getNearby: jest.fn(),
  },
}))

const mockGetNearby = gymRepository.getNearby as jest.Mock

describe('useMapViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetNearby.mockResolvedValue(mockGymModels)
  })

  describe('initial state', () => {
    it('starts with isLoading true', () => {
      const { result } = renderHook(() => useMapViewModel())
      expect(result.current.isLoading).toBe(true)
    })

    it('starts with no selected gym', () => {
      const { result } = renderHook(() => useMapViewModel())
      expect(result.current.selectedGym).toBeNull()
    })
  })

  describe('location init', () => {
    it('sets userCoordinates and loads gyms after successful init', async () => {
      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.userCoordinates).toEqual({
        latitude: -23.565,
        longitude: -46.6525,
      })
      expect(result.current.gyms).toHaveLength(2)
      expect(result.current.locationError).toBeNull()
    })

    it('sets locationError and stops loading when permission is denied', async () => {
      jest.spyOn(Location, 'requestForegroundPermissionsAsync').mockResolvedValueOnce({
        status: Location.PermissionStatus.DENIED,
        granted: false,
        canAskAgain: false,
        expires: 'never',
      })

      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.locationError).toBe('map.locationPermissionDenied')
    })

    it('sets locationError when location fetch throws', async () => {
      jest.spyOn(Location, 'watchPositionAsync').mockRejectedValueOnce(new Error('GPS failure'))

      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.locationError).toBe('map.locationError')
    })
  })

  describe('toGymUiModel — distance formatting', () => {
    it('formats distance below 1000m as "X m"', async () => {
      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      const gym = result.current.gyms.find((g) => g.id === '1')
      expect(gym?.distanceLabel).toBe('350 m')
    })

    it('formats distance of 1500m as "1.5 map.km"', async () => {
      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      const gym = result.current.gyms.find((g) => g.id === '2')
      expect(gym?.distanceLabel).toBe('1.5 map.km')
    })
  })

  describe('toGymUiModel — status label', () => {
    it('shows open label for open gym', async () => {
      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      const gym = result.current.gyms.find((g) => g.id === '1')
      expect(gym?.statusLabel).toBe('map.open')
    })

    it('shows closed label for closed gym', async () => {
      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      const gym = result.current.gyms.find((g) => g.id === '2')
      expect(gym?.statusLabel).toBe('map.closed')
    })
  })

  describe('onSelectGym', () => {
    it('sets selectedGym when a gym is selected', async () => {
      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      act(() => {
        result.current.onSelectGym(result.current.gyms[0])
      })

      expect(result.current.selectedGym?.id).toBe('1')
    })
  })

  describe('onDismissCard', () => {
    it('clears selectedGym', async () => {
      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      act(() => {
        result.current.onSelectGym(result.current.gyms[0])
      })
      act(() => {
        result.current.onDismissCard()
      })

      expect(result.current.selectedGym).toBeNull()
    })
  })

  describe('onCheckIn', () => {
    it('navigates to CheckIn tab', async () => {
      const { result } = renderHook(() => useMapViewModel())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      act(() => {
        result.current.onCheckIn()
      })

      expect(mockNavigate).toHaveBeenCalledWith(TabRoutes.CheckIn)
    })
  })
})

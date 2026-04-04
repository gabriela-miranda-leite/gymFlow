import { act, renderHook, waitFor } from '@testing-library/react-native'

import { checkInCooldownRepository } from '@/data/repositories/CheckInCooldownRepository'
import { checkInRepository } from '@/data/repositories/CheckInRepository'
import { gymRepository } from '@/data/repositories/GymRepository'
import { CHECKIN_COOLDOWN_MINUTES } from '@/domain/useCases/checkCheckInCooldown/CheckCheckInCooldownUseCase'
import { useCheckInViewModel } from '@/presentation/viewModels/CheckInViewModel'
import { RootRoutes } from '@/shared/navigation/routes'
import type { OccupancyLevel } from '@/tokens'

const mockNavigate = jest.fn()
const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}))

const mockGymModels = [
  {
    id: '1',
    name: 'Smart Fit',
    address: 'Av. Paulista, 1374',
    rating: 4.2,
    distanceMeters: 350,
    openingHours: '06:00 – 22:00',
    isOpen: true,
    tags: ['Musculação'],
    coordinates: { latitude: -23.565, longitude: -46.6525 },
    occupancy: 'moderate' as OccupancyLevel,
  },
]

jest.mock('@/data/repositories/GymRepository', () => ({
  gymRepository: { getNearby: jest.fn() },
}))

jest.mock('@/data/repositories/CheckInRepository', () => ({
  checkInRepository: { submit: jest.fn() },
}))

jest.mock('@/data/repositories/CheckInCooldownRepository', () => ({
  checkInCooldownRepository: {
    getLastCheckInTimestamp: jest.fn(),
    saveLastCheckInTimestamp: jest.fn(),
  },
}))

const mockGetNearby = gymRepository.getNearby as jest.Mock
const mockSubmit = checkInRepository.submit as jest.Mock
const mockGetTimestamp = checkInCooldownRepository.getLastCheckInTimestamp as jest.Mock
const mockSaveTimestamp = checkInCooldownRepository.saveLastCheckInTimestamp as jest.Mock

describe('useCheckInViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    mockGetNearby.mockResolvedValue(mockGymModels)
    mockSubmit.mockResolvedValue(undefined)
    mockGetTimestamp.mockResolvedValue(null)
    mockSaveTimestamp.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('initial state', () => {
    it('starts with no gym selected', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))
      expect(result.current.selectedGymId).toBeUndefined()
    })

    it('starts with isLoading false', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))
      expect(result.current.isLoading).toBe(false)
    })

    it('starts with no error', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))
      expect(result.current.error).toBeNull()
    })

    it('starts with isCoolingDown false when no previous check-in', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))
      expect(result.current.isCoolingDown).toBe(false)
      expect(result.current.cooldownMessage).toBeNull()
    })

    it('exposes 4 occupancy options', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))
      expect(result.current.occupancyOptions).toHaveLength(4)
    })
  })

  describe('cooldown on mount', () => {
    it('starts isCoolingDown true when last check-in was less than 1h ago', async () => {
      const recentTimestamp = Date.now() - 30 * 60 * 1000
      mockGetTimestamp.mockResolvedValue(recentTimestamp)

      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.isCoolingDown).toBe(true))

      expect(result.current.cooldownMessage).not.toBeNull()
    })

    it('starts isCoolingDown false when last check-in was more than 1h ago', async () => {
      const oldTimestamp = Date.now() - (CHECKIN_COOLDOWN_MINUTES + 5) * 60 * 1000
      mockGetTimestamp.mockResolvedValue(oldTimestamp)

      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))

      expect(result.current.isCoolingDown).toBe(false)
    })
  })

  describe('gym loading', () => {
    it('loads gym options from repository', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))
      expect(result.current.gymOptions[0].value).toBe('1')
      expect(result.current.gymOptions[0].label).toBe('Smart Fit')
    })
  })

  describe('onSelectGym', () => {
    it('updates selectedGymId', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))

      act(() => {
        result.current.onSelectGym('1')
      })

      expect(result.current.selectedGymId).toBe('1')
    })
  })

  describe('onSelectOccupancy', () => {
    it('does nothing when no gym is selected', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))

      await act(async () => {
        await result.current.onSelectOccupancy('empty')
      })

      expect(mockSubmit).not.toHaveBeenCalled()
    })

    it('does nothing when cooling down', async () => {
      const recentTimestamp = Date.now() - 30 * 60 * 1000
      mockGetTimestamp.mockResolvedValue(recentTimestamp)

      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.isCoolingDown).toBe(true))

      act(() => {
        result.current.onSelectGym('1')
      })
      await act(async () => {
        await result.current.onSelectOccupancy('empty')
      })

      expect(mockSubmit).not.toHaveBeenCalled()
    })

    it('calls submitCheckInUseCase and saves timestamp on success', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))

      act(() => {
        result.current.onSelectGym('1')
      })
      await act(async () => {
        await result.current.onSelectOccupancy('empty')
      })

      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ gymId: '1', occupancy: 'empty' }),
      )
      expect(mockSaveTimestamp).toHaveBeenCalled()
    })

    it('activates cooldown after successful check-in', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))

      act(() => {
        result.current.onSelectGym('1')
      })
      await act(async () => {
        await result.current.onSelectOccupancy('empty')
      })

      expect(result.current.isCoolingDown).toBe(true)
      expect(result.current.cooldownMessage).not.toBeNull()
    })

    it('navigates to CheckInFeedback after successful check-in', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))

      act(() => {
        result.current.onSelectGym('1')
      })
      await act(async () => {
        await result.current.onSelectOccupancy('empty')
      })

      expect(mockNavigate).toHaveBeenCalledWith(
        RootRoutes.CheckInFeedback,
        expect.objectContaining({ gymName: 'Smart Fit', occupancy: 'empty' }),
      )
    })

    it('does not navigate when submission fails', async () => {
      mockSubmit.mockRejectedValueOnce(new Error('network error'))
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))

      act(() => {
        result.current.onSelectGym('1')
      })
      await act(async () => {
        await result.current.onSelectOccupancy('busy')
      })

      expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('sets error when submission fails', async () => {
      mockSubmit.mockRejectedValueOnce(new Error('network error'))
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(1))

      act(() => {
        result.current.onSelectGym('1')
      })
      await act(async () => {
        await result.current.onSelectOccupancy('busy')
      })

      expect(result.current.error).not.toBeNull()
      expect(result.current.isCoolingDown).toBe(false)
    })
  })
})

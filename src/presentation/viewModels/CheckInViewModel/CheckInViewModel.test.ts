import { act, renderHook, waitFor } from '@testing-library/react-native'

import { checkInRepository } from '@/data/repositories/CheckInRepository'
import { gymRepository } from '@/data/repositories/GymRepository'
import { useCheckInViewModel } from '@/presentation/viewModels/CheckInViewModel'
import type { OccupancyLevel } from '@/tokens'

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
    occupancy: 'busy' as OccupancyLevel,
  },
]

jest.mock('@/data/repositories/GymRepository', () => ({
  gymRepository: {
    getNearby: jest.fn(),
  },
}))

jest.mock('@/data/repositories/CheckInRepository', () => ({
  checkInRepository: {
    submit: jest.fn(),
  },
}))

const mockGetNearby = gymRepository.getNearby as jest.Mock
const mockSubmit = checkInRepository.submit as jest.Mock

describe('useCheckInViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetNearby.mockResolvedValue(mockGymModels)
    mockSubmit.mockResolvedValue(undefined)
  })

  describe('initial state', () => {
    it('starts with no gym selected', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(2))
      expect(result.current.selectedGymId).toBeUndefined()
    })

    it('starts with isLoading false', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(2))
      expect(result.current.isLoading).toBe(false)
    })

    it('starts with no error', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(2))
      expect(result.current.error).toBeNull()
    })

    it('exposes 4 occupancy options', async () => {
      const { result } = renderHook(() => useCheckInViewModel())
      await waitFor(() => expect(result.current.gymOptions).toHaveLength(2))
      expect(result.current.occupancyOptions).toHaveLength(4)
    })
  })

  describe('gym loading', () => {
    it('loads gym options from repository', async () => {
      const { result } = renderHook(() => useCheckInViewModel())

      await waitFor(() => expect(result.current.gymOptions).toHaveLength(2))

      expect(result.current.gymOptions[0].value).toBe('1')
      expect(result.current.gymOptions[0].label).toBe('Smart Fit')
    })
  })

  describe('onSelectGym', () => {
    it('updates selectedGymId', () => {
      const { result } = renderHook(() => useCheckInViewModel())

      act(() => {
        result.current.onSelectGym('1')
      })

      expect(result.current.selectedGymId).toBe('1')
    })
  })

  describe('onSelectOccupancy', () => {
    it('does nothing when no gym is selected', async () => {
      const { result } = renderHook(() => useCheckInViewModel())

      await act(async () => {
        await result.current.onSelectOccupancy('empty')
      })

      expect(mockSubmit).not.toHaveBeenCalled()
    })

    it('calls submitCheckInUseCase when gym is selected', async () => {
      const { result } = renderHook(() => useCheckInViewModel())

      act(() => {
        result.current.onSelectGym('1')
      })

      await act(async () => {
        await result.current.onSelectOccupancy('empty')
      })

      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ gymId: '1', occupancy: 'empty' }),
      )
    })

    it('sets isLoading to true during submission', async () => {
      let resolveSubmit!: () => void
      mockSubmit.mockReturnValueOnce(
        new Promise<void>((resolve) => {
          resolveSubmit = resolve
        }),
      )

      const { result } = renderHook(() => useCheckInViewModel())

      act(() => {
        result.current.onSelectGym('1')
      })

      act(() => {
        result.current.onSelectOccupancy('empty')
      })

      expect(result.current.isLoading).toBe(true)

      await act(async () => {
        resolveSubmit()
      })

      expect(result.current.isLoading).toBe(false)
    })

    it('sets error when submission fails', async () => {
      mockSubmit.mockRejectedValueOnce(new Error('network error'))
      const { result } = renderHook(() => useCheckInViewModel())

      act(() => {
        result.current.onSelectGym('1')
      })

      await act(async () => {
        await result.current.onSelectOccupancy('busy')
      })

      expect(result.current.error).not.toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    it('clears error on subsequent successful submission', async () => {
      mockSubmit.mockRejectedValueOnce(new Error('fail'))
      const { result } = renderHook(() => useCheckInViewModel())

      act(() => {
        result.current.onSelectGym('1')
      })

      await act(async () => {
        await result.current.onSelectOccupancy('busy')
      })

      expect(result.current.error).not.toBeNull()

      await act(async () => {
        await result.current.onSelectOccupancy('empty')
      })

      expect(result.current.error).toBeNull()
    })
  })
})

import { act, renderHook, waitFor } from '@testing-library/react-native'

import { gymRepository } from '@/data/repositories/GymRepository'
import { useGymDetailViewModel } from '@/presentation/viewModels/GymDetailViewModel'

const mockGoBack = jest.fn()
const mockGymId = '1'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(() => ({ goBack: mockGoBack })),
  useRoute: jest.fn(() => ({ params: { gymId: mockGymId } })),
}))

const MOCK_WEEKLY_FLOW: Record<number, { hour: number; occupancyPercent: number }[]> =
  Object.fromEntries(
    Array.from({ length: 7 }, (_, day) => [
      day,
      Array.from({ length: 24 }, (__, hour) => ({ hour, occupancyPercent: hour === 9 ? 10 : 70 })),
    ]),
  )

const mockGym = {
  id: '1',
  name: 'SmartFit Paulista',
  address: 'Av. Paulista, 1374',
  rating: 4.2,
  reviewCount: 214,
  distanceMeters: 350,
  openingHours: '06:00 – 22:00',
  isOpen: true,
  tags: ['Musculação'],
  coordinates: { latitude: -23.565, longitude: -46.6525 },
  occupancy: 'moderate' as const,
  occupancyPercent: 55,
  isFavorite: false,
  lastUpdatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  weeklyFlow: MOCK_WEEKLY_FLOW,
}

jest.mock('@/data/repositories/GymRepository', () => ({
  gymRepository: {
    getById: jest.fn(),
  },
}))

const mockGetById = gymRepository.getById as jest.Mock

describe('useGymDetailViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetById.mockResolvedValue(mockGym)
  })

  it('loads gym data and exposes name and address', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBe('SmartFit Paulista'))

    expect(result.current.address).toBe('Av. Paulista, 1374')
  })

  it('starts with empty name while loading', () => {
    const { result } = renderHook(() => useGymDetailViewModel())
    expect(result.current.name).toBe('')
  })

  it('formats occupancyPercent as percentage string', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBe('SmartFit Paulista'))

    expect(result.current.occupancyPercent).toBe('55%')
  })

  it('initializes selectedDayIndex to today', () => {
    const today = new Date().getDay()
    const { result } = renderHook(() => useGymDetailViewModel())

    expect(result.current.selectedDayIndex).toBe(today)
  })

  it('updates selectedDayIndex when onSelectDay is called', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    act(() => {
      result.current.onSelectDay(3)
    })

    expect(result.current.selectedDayIndex).toBe(3)
  })

  it('toggles isFavorite when onToggleFavorite is called', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    const initial = result.current.isFavorite

    act(() => {
      result.current.onToggleFavorite()
    })

    expect(result.current.isFavorite).toBe(!initial)
  })

  it('uses gym isFavorite as initial value', async () => {
    mockGetById.mockResolvedValueOnce({ ...mockGym, isFavorite: true })
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    expect(result.current.isFavorite).toBe(true)
  })

  it('builds 24 hourly bars for selected day', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    expect(result.current.hourlyBars).toHaveLength(24)
  })

  it('marks future hours with isFuture=true on current day', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    const today = new Date().getDay()
    act(() => {
      result.current.onSelectDay(today)
    })

    const currentHour = new Date().getHours()
    const futureBars = result.current.hourlyBars.filter((b) => b.isFuture)
    futureBars.forEach((bar) => {
      expect(bar.hour).toBeGreaterThan(currentHour)
    })
  })

  it('marks no bars as future for past days', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    const pastDay = (new Date().getDay() + 6) % 7
    act(() => {
      result.current.onSelectDay(pastDay)
    })

    const futureBars = result.current.hourlyBars.filter((b) => b.isFuture)
    expect(futureBars).toHaveLength(0)
  })

  it('assigns green bar color for occupancy <= 30%', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    // hour 9 has 10% occupancy in mock data
    const bar = result.current.hourlyBars.find((b) => b.hour === 9)
    expect(bar?.barColor).toBe('#22C55E')
  })

  it('assigns red bar color for occupancy > 60%', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    // all other hours have 70% in mock data
    const bar = result.current.hourlyBars.find((b) => b.hour === 10)
    expect(bar?.barColor).toBe('#EF4444')
  })

  it('chooses hour 9 as best time (lowest occupancy)', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    expect(result.current.bestTimeLabel).toBe('09:00')
  })

  it('calls navigation.goBack on onBack', async () => {
    const { result } = renderHook(() => useGymDetailViewModel())

    await waitFor(() => expect(result.current.name).toBeTruthy())

    act(() => {
      result.current.onBack()
    })

    expect(mockGoBack).toHaveBeenCalledTimes(1)
  })

  it('exposes 7 days', () => {
    const { result } = renderHook(() => useGymDetailViewModel())
    expect(result.current.days).toHaveLength(7)
  })
})

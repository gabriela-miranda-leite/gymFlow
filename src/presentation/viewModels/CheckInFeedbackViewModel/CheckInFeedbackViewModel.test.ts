import { renderHook } from '@testing-library/react-native'

import { useCheckInFeedbackViewModel } from '@/presentation/viewModels/CheckInFeedbackViewModel'
import { colors } from '@/tokens'

const mockGoBack = jest.fn()
const mockNavigate = jest.fn()
const mockOccupancyColor = '#F97316' // colors.statusBusy

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
  useRoute: () => ({
    key: 'CheckInFeedback',
    name: 'CheckInFeedback',
    params: {
      gymName: 'Smart Fit',
      occupancyLabel: 'Cheio',
      occupancyColor: mockOccupancyColor,
    },
  }),
}))

describe('useCheckInFeedbackViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns the title from i18n', () => {
    const { result } = renderHook(() => useCheckInFeedbackViewModel())

    expect(result.current.title).toBe('checkInFeedback.title')
  })

  it('returns the subtitle from i18n', () => {
    const { result } = renderHook(() => useCheckInFeedbackViewModel())

    expect(result.current.subtitle).toBe('checkInFeedback.subtitle')
  })

  it('returns gymName from route params', () => {
    const { result } = renderHook(() => useCheckInFeedbackViewModel())

    expect(result.current.gymName).toBe('Smart Fit')
  })

  it('returns occupancyLabel from route params', () => {
    const { result } = renderHook(() => useCheckInFeedbackViewModel())

    expect(result.current.occupancyLabel).toBe('Cheio')
  })

  it('returns occupancyColor from route params', () => {
    const { result } = renderHook(() => useCheckInFeedbackViewModel())

    expect(result.current.occupancyColor).toBe(colors.statusBusy) // same value as mockOccupancyColor
  })

  it('returns buttonLabel from i18n', () => {
    const { result } = renderHook(() => useCheckInFeedbackViewModel())

    expect(result.current.buttonLabel).toBe('checkInFeedback.button')
  })

  it('calls navigation.goBack when onBack is invoked', () => {
    const { result } = renderHook(() => useCheckInFeedbackViewModel())

    result.current.onBack()

    expect(mockGoBack).toHaveBeenCalledTimes(1)
  })
})

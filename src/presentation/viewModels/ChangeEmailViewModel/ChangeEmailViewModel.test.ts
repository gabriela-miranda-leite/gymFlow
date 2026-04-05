import { act, renderHook } from '@testing-library/react-native'

import { useChangeEmailViewModel } from '@/presentation/viewModels/ChangeEmailViewModel'

const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}))

jest.mock('@/store', () => ({
  useAuthStore: (selector: (state: { user: { email: string } | null }) => unknown) =>
    selector({ user: { email: 'atual@email.com' } }),
}))

jest.mock('@/data/repositories/auth/AuthRepository', () => ({
  authRepository: { updateEmail: jest.fn().mockResolvedValue(undefined) },
}))

describe('useChangeEmailViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('starts with empty email and no errors', () => {
      const { result } = renderHook(() => useChangeEmailViewModel())

      expect(result.current.email).toBe('')
      expect(result.current.emailError).toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    it('exposes the current email from the store', () => {
      const { result } = renderHook(() => useChangeEmailViewModel())

      expect(result.current.currentEmail).toBe('atual@email.com')
    })
  })

  describe('onChangeEmail', () => {
    it('updates email value', () => {
      const { result } = renderHook(() => useChangeEmailViewModel())

      act(() => {
        result.current.onChangeEmail('novo@email.com')
      })

      expect(result.current.email).toBe('novo@email.com')
    })
  })

  describe('onPressBack', () => {
    it('calls navigation.goBack', () => {
      const { result } = renderHook(() => useChangeEmailViewModel())

      act(() => {
        result.current.onPressBack()
      })

      expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
  })

  describe('onPressSave — validation', () => {
    it('sets emailError when email is empty', async () => {
      const { result } = renderHook(() => useChangeEmailViewModel())

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(result.current.emailError).not.toBeNull()
      expect(mockGoBack).not.toHaveBeenCalled()
    })

    it('sets emailError when email is invalid', async () => {
      const { result } = renderHook(() => useChangeEmailViewModel())

      act(() => {
        result.current.onChangeEmail('email-invalido')
      })

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(result.current.emailError).not.toBeNull()
      expect(mockGoBack).not.toHaveBeenCalled()
    })
  })

  describe('onPressSave — success', () => {
    it('navigates back with a valid email', async () => {
      const { result } = renderHook(() => useChangeEmailViewModel())

      act(() => {
        result.current.onChangeEmail('novo@email.com')
      })

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
  })
})

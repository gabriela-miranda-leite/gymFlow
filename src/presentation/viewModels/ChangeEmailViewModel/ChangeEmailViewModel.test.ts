import { act, renderHook } from '@testing-library/react-native'

import { authRepository } from '@/data/repositories/auth/AuthRepository'
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
    jest.mocked(authRepository.updateEmail).mockResolvedValue(undefined)
  })

  describe('initial state', () => {
    it('starts with empty email and no errors', () => {
      const { result } = renderHook(() => useChangeEmailViewModel())

      expect(result.current.email).toBe('')
      expect(result.current.emailError).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.submitError).toBeNull()
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
      expect(result.current.submitError).toBeNull()
    })

    it('sets isLoading to false after success', async () => {
      const { result } = renderHook(() => useChangeEmailViewModel())

      act(() => {
        result.current.onChangeEmail('novo@email.com')
      })

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('onPressSave — error', () => {
    it('sets submitError when repository throws', async () => {
      jest.mocked(authRepository.updateEmail).mockRejectedValueOnce(new Error('server error'))
      const { result } = renderHook(() => useChangeEmailViewModel())

      act(() => {
        result.current.onChangeEmail('novo@email.com')
      })

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(result.current.submitError).not.toBeNull()
      expect(mockGoBack).not.toHaveBeenCalled()
    })

    it('sets isLoading to false after error', async () => {
      jest.mocked(authRepository.updateEmail).mockRejectedValueOnce(new Error('server error'))
      const { result } = renderHook(() => useChangeEmailViewModel())

      act(() => {
        result.current.onChangeEmail('novo@email.com')
      })

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(result.current.isLoading).toBe(false)
    })

    it('clears submitError when email changes after a failed submit', async () => {
      jest.mocked(authRepository.updateEmail).mockRejectedValueOnce(new Error('server error'))
      const { result } = renderHook(() => useChangeEmailViewModel())

      act(() => {
        result.current.onChangeEmail('novo@email.com')
      })

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(result.current.submitError).not.toBeNull()

      act(() => {
        result.current.onChangeEmail('outro@email.com')
      })

      expect(result.current.submitError).toBeNull()
    })
  })
})

import { act, renderHook } from '@testing-library/react-native'

import { useChangePasswordViewModel } from '@/presentation/viewModels/ChangePasswordViewModel'

const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}))

jest.mock('@/data/repositories/password/PasswordRepository', () => ({
  passwordRepository: { updatePassword: jest.fn().mockResolvedValue(undefined) },
}))

describe('useChangePasswordViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('starts with empty fields and no errors', () => {
      const { result } = renderHook(() => useChangePasswordViewModel())

      expect(result.current.currentPassword).toBe('')
      expect(result.current.newPassword).toBe('')
      expect(result.current.confirmPassword).toBe('')
      expect(result.current.currentPasswordError).toBeNull()
      expect(result.current.newPasswordError).toBeNull()
      expect(result.current.confirmPasswordError).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.submitError).toBeNull()
    })
  })

  describe('onChangeCurrentPassword', () => {
    it('updates currentPassword value', () => {
      const { result } = renderHook(() => useChangePasswordViewModel())

      act(() => {
        result.current.onChangeCurrentPassword('myOldPass')
      })

      expect(result.current.currentPassword).toBe('myOldPass')
    })
  })

  describe('onChangeNewPassword', () => {
    it('updates newPassword value', () => {
      const { result } = renderHook(() => useChangePasswordViewModel())

      act(() => {
        result.current.onChangeNewPassword('myNewPass')
      })

      expect(result.current.newPassword).toBe('myNewPass')
    })
  })

  describe('onChangeConfirmPassword', () => {
    it('updates confirmPassword value', () => {
      const { result } = renderHook(() => useChangePasswordViewModel())

      act(() => {
        result.current.onChangeConfirmPassword('myNewPass')
      })

      expect(result.current.confirmPassword).toBe('myNewPass')
    })
  })

  describe('onPressBack', () => {
    it('calls navigation.goBack', () => {
      const { result } = renderHook(() => useChangePasswordViewModel())

      act(() => {
        result.current.onPressBack()
      })

      expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
  })

  describe('onPressSave — validation', () => {
    it('sets errors when all fields are empty', async () => {
      const { result } = renderHook(() => useChangePasswordViewModel())

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(result.current.newPasswordError).not.toBeNull()
      expect(mockGoBack).not.toHaveBeenCalled()
    })

    it('sets newPasswordError when new password is too short', async () => {
      const { result } = renderHook(() => useChangePasswordViewModel())

      act(() => {
        result.current.onChangeCurrentPassword('oldPass')
        result.current.onChangeNewPassword('123')
        result.current.onChangeConfirmPassword('123')
      })

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(result.current.newPasswordError).not.toBeNull()
      expect(mockGoBack).not.toHaveBeenCalled()
    })

    it('sets confirmPasswordError when passwords do not match', async () => {
      const { result } = renderHook(() => useChangePasswordViewModel())

      act(() => {
        result.current.onChangeCurrentPassword('oldPass')
        result.current.onChangeNewPassword('newPass1')
        result.current.onChangeConfirmPassword('different')
      })

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(result.current.confirmPasswordError).not.toBeNull()
      expect(mockGoBack).not.toHaveBeenCalled()
    })
  })

  describe('onPressSave — success', () => {
    it('navigates back with valid credentials', async () => {
      const { result } = renderHook(() => useChangePasswordViewModel())

      act(() => {
        result.current.onChangeCurrentPassword('oldPass1')
        result.current.onChangeNewPassword('newPass1')
        result.current.onChangeConfirmPassword('newPass1')
      })

      await act(async () => {
        await result.current.onPressSave()
      })

      expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
  })
})

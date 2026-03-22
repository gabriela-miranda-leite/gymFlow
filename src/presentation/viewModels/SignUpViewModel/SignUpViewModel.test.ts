import { act, renderHook } from '@testing-library/react-native'

import { useSignUpViewModel } from '@/presentation/viewModels/SignUpViewModel'

const mockToApp = jest.fn()

jest.mock('@/shared/navigation/useAppNavigation', () => ({
  useAppNavigation: () => ({
    toApp: mockToApp,
    toSignUp: jest.fn(),
    toLogin: jest.fn(),
    goBack: jest.fn(),
  }),
}))

jest.mock('@/domain/useCases/SignUpUseCase', () => ({
  ...jest.requireActual('@/domain/useCases/SignUpUseCase'),
}))

describe('useSignUpViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('starts with empty fields and no errors', () => {
      const { result } = renderHook(() => useSignUpViewModel())

      expect(result.current.name).toBe('')
      expect(result.current.email).toBe('')
      expect(result.current.password).toBe('')
      expect(result.current.nameError).toBeNull()
      expect(result.current.emailError).toBeNull()
      expect(result.current.passwordError).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isPasswordVisible).toBe(false)
    })
  })

  describe('onNameChange', () => {
    it('updates name value', () => {
      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onNameChange('Gabriela')
      })

      expect(result.current.name).toBe('Gabriela')
    })
  })

  describe('onEmailChange', () => {
    it('updates email value', () => {
      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onEmailChange('test@email.com')
      })

      expect(result.current.email).toBe('test@email.com')
    })
  })

  describe('onPasswordChange', () => {
    it('updates password value', () => {
      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onPasswordChange('123456')
      })

      expect(result.current.password).toBe('123456')
    })
  })

  describe('onTogglePasswordVisibility', () => {
    it('toggles isPasswordVisible', () => {
      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onTogglePasswordVisibility()
      })
      expect(result.current.isPasswordVisible).toBe(true)

      act(() => {
        result.current.onTogglePasswordVisibility()
      })
      expect(result.current.isPasswordVisible).toBe(false)
    })
  })

  describe('onSubmit — validação', () => {
    it('com campos vazios seta nameError e não navega', async () => {
      const { result } = renderHook(() => useSignUpViewModel())

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.nameError).not.toBeNull()
      expect(mockToApp).not.toHaveBeenCalled()
    })

    it('com email inválido seta emailError e não navega', async () => {
      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onNameChange('Gabriela')
        result.current.onEmailChange('email-invalido')
        result.current.onPasswordChange('123456')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.emailError).not.toBeNull()
      expect(mockToApp).not.toHaveBeenCalled()
    })

    it('com senha curta seta passwordError e não navega', async () => {
      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onNameChange('Gabriela')
        result.current.onEmailChange('test@email.com')
        result.current.onPasswordChange('123')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.nameError).toBeNull()
      expect(result.current.emailError).toBeNull()
      expect(result.current.passwordError).not.toBeNull()
      expect(mockToApp).not.toHaveBeenCalled()
    })
  })

  describe('onSubmit — navegação', () => {
    it('com dados válidos navega para o app', async () => {
      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onNameChange('Gabriela')
        result.current.onEmailChange('test@email.com')
        result.current.onPasswordChange('123456')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(mockToApp).toHaveBeenCalled()
      expect(result.current.nameError).toBeNull()
      expect(result.current.emailError).toBeNull()
      expect(result.current.passwordError).toBeNull()
    })
  })
})

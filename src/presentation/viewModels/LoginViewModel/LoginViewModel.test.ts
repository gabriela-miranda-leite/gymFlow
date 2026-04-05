import { act, renderHook } from '@testing-library/react-native'

import { useLoginViewModel } from '@/presentation/viewModels/LoginViewModel'

const mockToApp = jest.fn()
const mockToSignUp = jest.fn()

jest.mock('@/shared/navigation/useAppNavigation', () => ({
  useAppNavigation: () => ({
    toSignUp: mockToSignUp,
    toApp: mockToApp,
    toLogin: jest.fn(),
    goBack: jest.fn(),
  }),
}))

jest.mock('@/domain/useCases/login/LoginUseCase', () => ({
  ...jest.requireActual('@/domain/useCases/login/LoginUseCase'),
}))

describe('useLoginViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('starts with empty fields and no errors', () => {
      const { result } = renderHook(() => useLoginViewModel())

      expect(result.current.email).toBe('')
      expect(result.current.password).toBe('')
      expect(result.current.emailError).toBeNull()
      expect(result.current.passwordError).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isPasswordVisible).toBe(false)
    })
  })

  describe('onEmailChange', () => {
    it('updates email value', () => {
      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onEmailChange('test@email.com')
      })

      expect(result.current.email).toBe('test@email.com')
    })
  })

  describe('onPasswordChange', () => {
    it('updates password value', () => {
      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onPasswordChange('123456')
      })

      expect(result.current.password).toBe('123456')
    })
  })

  describe('onTogglePasswordVisibility', () => {
    it('toggles isPasswordVisible', () => {
      const { result } = renderHook(() => useLoginViewModel())

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

  describe('onSignup', () => {
    it('navega para a tela de SignUp', () => {
      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onSignup()
      })

      expect(mockToSignUp).toHaveBeenCalled()
    })
  })

  describe('onSubmit — validação', () => {
    it('com campos vazios seta emailError e não navega', async () => {
      const { result } = renderHook(() => useLoginViewModel())

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.emailError).not.toBeNull()
      expect(mockToApp).not.toHaveBeenCalled()
    })

    it('com email inválido seta emailError e não navega', async () => {
      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onEmailChange('email-invalido')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.emailError).not.toBeNull()
      expect(mockToApp).not.toHaveBeenCalled()
    })

    it('com email válido e senha curta seta passwordError e não navega', async () => {
      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onEmailChange('test@email.com')
        result.current.onPasswordChange('123')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.emailError).toBeNull()
      expect(result.current.passwordError).not.toBeNull()
      expect(mockToApp).not.toHaveBeenCalled()
    })
  })

  describe('onSubmit — navegação', () => {
    it('com credenciais válidas navega para o app', async () => {
      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onEmailChange('test@email.com')
        result.current.onPasswordChange('123456')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(mockToApp).toHaveBeenCalled()
      expect(result.current.emailError).toBeNull()
      expect(result.current.passwordError).toBeNull()
    })
  })
})

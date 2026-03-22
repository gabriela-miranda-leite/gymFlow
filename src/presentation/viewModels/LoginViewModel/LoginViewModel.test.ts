import { act, renderHook } from '@testing-library/react-native'

import { useLoginViewModel } from '@/presentation/viewModels/LoginViewModel'

const mockNavigate = jest.fn()

jest.mock('@/shared/navigation/useAppNavigation', () => ({
  useAppNavigation: () => ({ toSignUp: mockNavigate, toLogin: jest.fn(), goBack: jest.fn() }),
}))

jest.mock('@/data/repositories/AuthRepository', () => ({
  authRepository: { login: jest.fn() },
}))

jest.mock('@/domain/useCases/LoginUseCase', () => ({
  ...jest.requireActual('@/domain/useCases/LoginUseCase'),
  loginUseCase: jest.fn(),
}))

const { loginUseCase } = require('@/domain/useCases/LoginUseCase')

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

      expect(mockNavigate).toHaveBeenCalled()
    })
  })

  describe('onSubmit — validação', () => {
    it('com campos vazios seta emailError e não chama loginUseCase', async () => {
      const { result } = renderHook(() => useLoginViewModel())

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.emailError).not.toBeNull()
      expect(loginUseCase).not.toHaveBeenCalled()
    })

    it('com email inválido seta emailError e não chama loginUseCase', async () => {
      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onEmailChange('email-invalido')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.emailError).not.toBeNull()
      expect(loginUseCase).not.toHaveBeenCalled()
    })

    it('com email válido e senha curta seta passwordError e não chama loginUseCase', async () => {
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
      expect(loginUseCase).not.toHaveBeenCalled()
    })
  })

  describe('onSubmit — chamada à API', () => {
    it('com credenciais válidas chama loginUseCase com os dados corretos', async () => {
      loginUseCase.mockResolvedValueOnce({
        user: { id: '1', name: 'Test', email: 'test@email.com' },
        token: 'mock-token',
      })

      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onEmailChange('test@email.com')
        result.current.onPasswordChange('123456')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(loginUseCase).toHaveBeenCalledWith(
        { email: 'test@email.com', password: '123456' },
        expect.anything(),
      )
      expect(result.current.emailError).toBeNull()
      expect(result.current.passwordError).toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    it('quando a API falha seta passwordError com mensagem de login inválido', async () => {
      loginUseCase.mockRejectedValueOnce(new Error('Invalid credentials'))

      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onEmailChange('test@email.com')
        result.current.onPasswordChange('123456')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.passwordError).not.toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    it('isLoading é false após a chamada bem-sucedida', async () => {
      loginUseCase.mockResolvedValueOnce({
        user: { id: '1', name: 'Test', email: 'test@email.com' },
        token: 'mock-token',
      })

      const { result } = renderHook(() => useLoginViewModel())

      act(() => {
        result.current.onEmailChange('test@email.com')
        result.current.onPasswordChange('123456')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.isLoading).toBe(false)
    })
  })
})

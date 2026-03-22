import { act, renderHook } from '@testing-library/react-native'

import { useSignUpViewModel } from '@/presentation/viewModels/SignUpViewModel'

jest.mock('@/data/repositories/SignUpRepository', () => ({
  signUpRepository: { signUp: jest.fn() },
}))

jest.mock('@/domain/useCases/SignUpUseCase', () => ({
  ...jest.requireActual('@/domain/useCases/SignUpUseCase'),
  signUpUseCase: jest.fn(),
}))

const { signUpUseCase } = require('@/domain/useCases/SignUpUseCase')

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
    it('com campos vazios seta nameError e não chama signUpUseCase', async () => {
      const { result } = renderHook(() => useSignUpViewModel())

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.nameError).not.toBeNull()
      expect(signUpUseCase).not.toHaveBeenCalled()
    })

    it('com email inválido seta emailError e não chama signUpUseCase', async () => {
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
      expect(signUpUseCase).not.toHaveBeenCalled()
    })

    it('com senha curta seta passwordError e não chama signUpUseCase', async () => {
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
      expect(signUpUseCase).not.toHaveBeenCalled()
    })
  })

  describe('onSubmit — chamada à API', () => {
    it('com dados válidos chama signUpUseCase com os dados corretos', async () => {
      signUpUseCase.mockResolvedValueOnce({
        user: { id: '1', name: 'Gabriela', email: 'test@email.com' },
        token: 'mock-token',
      })

      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onNameChange('Gabriela')
        result.current.onEmailChange('test@email.com')
        result.current.onPasswordChange('123456')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(signUpUseCase).toHaveBeenCalledWith(
        { name: 'Gabriela', email: 'test@email.com', password: '123456' },
        expect.anything(),
      )
      expect(result.current.nameError).toBeNull()
      expect(result.current.emailError).toBeNull()
      expect(result.current.passwordError).toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    it('quando a API falha seta passwordError com mensagem adequada', async () => {
      signUpUseCase.mockRejectedValueOnce(new Error('Sign up failed'))

      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onNameChange('Gabriela')
        result.current.onEmailChange('test@email.com')
        result.current.onPasswordChange('123456')
      })

      await act(async () => {
        await result.current.onSubmit()
      })

      expect(result.current.passwordError).not.toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    it('isLoading é false após a chamada', async () => {
      signUpUseCase.mockResolvedValueOnce({
        user: { id: '1', name: 'Gabriela', email: 'test@email.com' },
        token: 'mock-token',
      })

      const { result } = renderHook(() => useSignUpViewModel())

      act(() => {
        result.current.onNameChange('Gabriela')
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

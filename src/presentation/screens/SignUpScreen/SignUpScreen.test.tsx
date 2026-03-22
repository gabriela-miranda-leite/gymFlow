import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'

import { SignUpScreen } from '@/presentation/screens/SignUpScreen/SignUpScreen'

const mockGoBack = jest.fn()

jest.mock('@/shared/navigation/useAppNavigation', () => ({
  useAppNavigation: () => ({ toSignUp: jest.fn(), toLogin: jest.fn(), goBack: mockGoBack }),
}))

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#FFFFFF',
      foreground: '#18181B',
      mutedForeground: '#71717A',
      border: '#E4E4E7',
      input: '#F4F4F5',
      destructive: '#EF4444',
      brand: { primary: '#FF6A00', primaryForeground: '#FFFFFF' },
    },
  }),
}))

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/data/repositories/AuthRepository', () => ({
  authRepository: { signUp: jest.fn() },
}))

jest.mock('@/domain/useCases/SignUpUseCase', () => ({
  ...jest.requireActual('@/domain/useCases/SignUpUseCase'),
  signUpUseCase: jest.fn(),
}))

const { signUpUseCase } = require('@/domain/useCases/SignUpUseCase')

describe('SignUpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all fields and the submit button', () => {
    const { getByTestId } = render(<SignUpScreen />)
    expect(getByTestId('signUp-name-input')).toBeTruthy()
    expect(getByTestId('signUp-email-input')).toBeTruthy()
    expect(getByTestId('signUp-password-input')).toBeTruthy()
    expect(getByTestId('signUp-submit-btn')).toBeTruthy()
    expect(getByTestId('signUp-google-btn')).toBeTruthy()
    expect(getByTestId('signUp-apple-btn')).toBeTruthy()
    expect(getByTestId('signUp-login-link')).toBeTruthy()
  })

  it('navigates back when "Entrar" is pressed', () => {
    const { getByTestId } = render(<SignUpScreen />)

    fireEvent.press(getByTestId('signUp-login-link'))

    expect(mockGoBack).toHaveBeenCalled()
  })

  it('shows nameError when name is empty on submit', async () => {
    const { getByTestId, findByText } = render(<SignUpScreen />)
    fireEvent.press(getByTestId('signUp-submit-btn'))
    expect(await findByText('validation.nameInvalid')).toBeTruthy()
  })

  it('shows emailError when email is invalid on submit', async () => {
    const { getByTestId, findByText } = render(<SignUpScreen />)
    fireEvent.changeText(getByTestId('signUp-name-input'), 'Usuário')
    fireEvent.changeText(getByTestId('signUp-email-input'), 'email-invalido')
    fireEvent.changeText(getByTestId('signUp-password-input'), '12345678')
    fireEvent.press(getByTestId('signUp-submit-btn'))
    expect(await findByText('validation.emailInvalid')).toBeTruthy()
  })

  it('shows passwordError when password is too short', async () => {
    const { getByTestId, findByText } = render(<SignUpScreen />)
    fireEvent.changeText(getByTestId('signUp-name-input'), 'Usuário')
    fireEvent.changeText(getByTestId('signUp-email-input'), 'user@email.com')
    fireEvent.changeText(getByTestId('signUp-password-input'), '123')
    fireEvent.press(getByTestId('signUp-submit-btn'))
    expect(await findByText('validation.passwordTooShort')).toBeTruthy()
  })

  it('calls signUpUseCase with valid credentials', async () => {
    signUpUseCase.mockResolvedValueOnce({ success: true })
    const { getByTestId } = render(<SignUpScreen />)
    fireEvent.changeText(getByTestId('signUp-name-input'), 'Usuário')
    fireEvent.changeText(getByTestId('signUp-email-input'), 'user@email.com')
    fireEvent.changeText(getByTestId('signUp-password-input'), '12345678')
    fireEvent.press(getByTestId('signUp-submit-btn'))
    await waitFor(() => {
      expect(signUpUseCase).toHaveBeenCalledWith(
        {
          name: 'Usuário',
          email: 'user@email.com',
          password: '12345678',
        },
        expect.anything(),
      )
    })
  })

  it('shows error message when sign up fails', async () => {
    signUpUseCase.mockRejectedValueOnce(new Error('fail'))
    const { getByTestId, findByText } = render(<SignUpScreen />)
    fireEvent.changeText(getByTestId('signUp-name-input'), 'Usuário')
    fireEvent.changeText(getByTestId('signUp-email-input'), 'user@email.com')
    fireEvent.changeText(getByTestId('signUp-password-input'), '12345678')
    fireEvent.press(getByTestId('signUp-submit-btn'))
    expect(await findByText('errors.signFailed')).toBeTruthy()
  })
})

void fireEvent
void render
void waitFor
void signUpUseCase

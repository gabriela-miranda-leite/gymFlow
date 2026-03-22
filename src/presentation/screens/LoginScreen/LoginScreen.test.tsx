import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'

import { LoginScreen } from '@/presentation/screens/LoginScreen/LoginScreen'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#FFFFFF',
      foreground: '#18181B',
      mutedForeground: '#71717A',
      border: '#E4E4E7',
      input: '#F4F4F5',
      destructive: '#EF4444',
      brand: { primary: '#FF6B00', primaryForeground: '#FFFFFF' },
    },
  }),
}))

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/data/repositories/AuthRepository', () => ({
  authRepository: {
    login: jest.fn(),
  },
}))

jest.mock('@/domain/useCases/LoginUseCase', () => ({
  ...jest.requireActual('@/domain/useCases/LoginUseCase'),
  loginUseCase: jest.fn(),
}))

describe('LoginScreen', () => {
  it('renders email and password fields', () => {
    const { getByText } = render(<LoginScreen />)

    expect(getByText('login.email')).toBeTruthy()
    expect(getByText('login.password')).toBeTruthy()
  })

  it('renders login button', () => {
    const { getByText } = render(<LoginScreen />)

    expect(getByText('login.loginButton')).toBeTruthy()
  })

  it('renders forgot password and sign up links', () => {
    const { getByText } = render(<LoginScreen />)

    expect(getByText('login.forgotPassword')).toBeTruthy()
    expect(getByText('login.signUpLink')).toBeTruthy()
  })

  it('renders social login buttons', () => {
    const { getByText } = render(<LoginScreen />)

    expect(getByText('login.googleLogin')).toBeTruthy()
    expect(getByText('login.appleLogin')).toBeTruthy()
  })

  it('updates email field on change', () => {
    const { getByDisplayValue, getAllByLabelText } = render(<LoginScreen />)

    const emailInput = getAllByLabelText('login.email')[0]
    fireEvent.changeText(emailInput, 'test@email.com')

    expect(getByDisplayValue('test@email.com')).toBeTruthy()
  })

  it('shows error message when login fails', async () => {
    const { loginUseCase } = require('@/domain/useCases/LoginUseCase')
    loginUseCase.mockRejectedValueOnce(new Error('Invalid credentials'))

    const { getByText, getAllByLabelText, getAllByRole } = render(<LoginScreen />)

    fireEvent.changeText(getAllByLabelText('login.email')[0], 'test@email.com')
    fireEvent.changeText(getAllByLabelText('login.password')[0], '123456')

    fireEvent.press(
      getAllByRole('button').find((el) => el.props.accessibilityLabel === 'login.loginButton')!,
    )

    await waitFor(() => {
      expect(getByText('errors.loginFailed')).toBeTruthy()
    })
  })
})

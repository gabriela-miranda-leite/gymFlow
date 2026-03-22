export interface LoginUiModel {
  email: string
  password: string
  isPasswordVisible: boolean
  isLoading: boolean
  emailError: string | null
  passwordError: string | null
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onTogglePasswordVisibility: () => void
  onSubmit: () => void
  onForgotPassword: () => void
  onSignup: () => void
  onGoogleLogin: () => void
  onAppleLogin: () => void
}

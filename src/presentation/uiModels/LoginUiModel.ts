export interface LoginUiModel {
  email: string
  password: string
  isPasswordVisible: boolean
  isLoading: boolean
  error: string | null
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onTogglePasswordVisibility: () => void
  onSubmit: () => void
  onForgotPassword: () => void
  onSignup: () => void
}

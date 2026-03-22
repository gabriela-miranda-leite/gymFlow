export interface SignUpUiModel {
  name: string
  email: string
  password: string
  isLoading: boolean
  isPasswordVisible: boolean
  nameError: string | null
  emailError: string | null
  passwordError: string | null
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onTogglePasswordVisibility: () => void
  onSubmit: () => void
  onGoogleSignUp: () => void
  onAppleSignUp: () => void
}

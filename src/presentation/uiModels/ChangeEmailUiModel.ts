export interface ChangeEmailUiModel {
  currentEmail: string
  email: string
  onChangeEmail: (value: string) => void
  isLoading: boolean
  emailError: string | null
  submitError: string | null
  onPressSave: () => void
  onPressBack: () => void
}

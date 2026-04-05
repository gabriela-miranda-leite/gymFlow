export type ChangePasswordUiModel = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  currentPasswordError: string | null
  newPasswordError: string | null
  confirmPasswordError: string | null
  submitError: string | null
  isLoading: boolean
  showCurrentPassword: boolean
  showNewPassword: boolean
  showConfirmPassword: boolean
  onChangeCurrentPassword: (value: string) => void
  onChangeNewPassword: (value: string) => void
  onChangeConfirmPassword: (value: string) => void
  onToggleCurrentPassword: () => void
  onToggleNewPassword: () => void
  onToggleConfirmPassword: () => void
  onPressSave: () => void
  onPressBack: () => void
}

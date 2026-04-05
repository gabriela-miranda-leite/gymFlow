export interface EditProfileUiModel {
  name: string
  phone: string
  imageUri?: string
  nameError: string | null
  onChangeName: (value: string) => void
  onChangePhone: (value: string) => void
  onPressSave: () => void
  onPressBack: () => void
  onPressCameraBadge: () => void
}

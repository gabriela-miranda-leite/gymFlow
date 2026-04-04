export interface EditProfileUiModel {
  name: string
  phone: string
  imageUri?: string
  onChangeName: (value: string) => void
  onChangePhone: (value: string) => void
  onPressSave: () => void
  onPressBack: () => void
  onPressCameraBadge: () => void
}

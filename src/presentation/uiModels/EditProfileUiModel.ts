export interface EditProfileUiModel {
  name: string
  phone: string
  onChangeName: (value: string) => void
  onChangePhone: (value: string) => void
  onPressSave: () => void
  onPressBack: () => void
  onPressCameraBadge: () => void
}

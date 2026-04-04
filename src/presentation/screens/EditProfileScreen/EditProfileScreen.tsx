import { useTheme } from '@/contexts/ThemeContext'
import { Avatar } from '@/presentation/components/Avatar'
import { Button } from '@/presentation/components/Button'
import { TextInput } from '@/presentation/components/TextInput'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import {
  AvatarWrapper,
  BackButton,
  BackLabel,
  ButtonWrapper,
  Container,
  ContentWrapper,
  FieldsWrapper,
  PageTitle,
  SafeAreaWrapper,
} from '@/presentation/screens/EditProfileScreen/EditProfileScreen.styles'
import { useEditProfileViewModel } from '@/presentation/viewModels/EditProfileViewModel'
import { tk, useTranslation } from '@/shared/i18n'

export function EditProfileScreen() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const vm = useEditProfileViewModel()

  const ChevronIcon = AppIcons.navBack

  return (
    <SafeAreaWrapper bg={theme.background} testID="edit-profile-screen">
      <Container bg={theme.background} keyboardShouldPersistTaps="handled">
        <ContentWrapper bg={theme.background}>
          <BackButton
            onPress={vm.onPressBack}
            activeOpacity={0.6}
            accessibilityRole="button"
            accessibilityLabel={t(tk.editProfile.back)}
            testID="edit-profile-back-button"
          >
            <ChevronIcon size={16} color={theme.mutedForeground} />
            <BackLabel color={theme.mutedForeground}>{t(tk.editProfile.back)}</BackLabel>
          </BackButton>

          <PageTitle color={theme.foreground} testID="edit-profile-title">
            {t(tk.editProfile.title)}
          </PageTitle>

          <AvatarWrapper>
            <Avatar
              name={vm.name}
              size="lg"
              showCameraBadge
              onCameraPress={vm.onPressCameraBadge}
              testID="edit-profile-avatar"
            />
          </AvatarWrapper>

          <FieldsWrapper>
            <TextInput
              label={t(tk.editProfile.labelName)}
              value={vm.name}
              onChangeText={vm.onChangeName}
              placeholder={t(tk.editProfile.placeholderName)}
              autoCapitalize="words"
              testID="edit-profile-name-input"
            />
            <TextInput
              label={t(tk.editProfile.labelPhone)}
              value={vm.phone}
              onChangeText={vm.onChangePhone}
              placeholder={t(tk.editProfile.placeholderPhone)}
              keyboardType="phone-pad"
              testID="edit-profile-phone-input"
            />
          </FieldsWrapper>

          <ButtonWrapper>
            <Button
              label={t(tk.editProfile.saveButton)}
              onPress={vm.onPressSave}
              testID="edit-profile-save-button"
            />
          </ButtonWrapper>
        </ContentWrapper>
      </Container>
    </SafeAreaWrapper>
  )
}

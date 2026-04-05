import { useTheme } from '@/contexts'
import { AppIcons } from '@/presentation/components'
import { Button } from '@/presentation/components/Button'
import { Text } from '@/presentation/components/Text'
import { TextInput } from '@/presentation/components/TextInput'
import {
  SafeAreaWrapper,
  Container,
  ContentWrapper,
  BackButton,
  BackLabel,
  PageTitle,
  FieldsWrapper,
  ButtonWrapper,
} from '@/presentation/screens/ChangePasswordScreen/ChangePasswordScreen.styles'
import { useChangePasswordViewModel } from '@/presentation/viewModels/ChangePasswordViewModel'
import { tk, useTranslation } from '@/shared/i18n'

const label = 'change-password'

export function ChangePasswordScreen() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const vm = useChangePasswordViewModel()

  const ChevronIcon = AppIcons.navBack

  return (
    <SafeAreaWrapper bg={theme.background} testID={`${label}-screen`}>
      <Container bg={theme.background} keyboardShouldPersistTaps="handled">
        <ContentWrapper bg={theme.background}>
          <BackButton
            onPress={vm.onPressBack}
            activeOpacity={0.6}
            accessibilityRole="button"
            accessibilityLabel={t(tk.changePassword.back)}
            testID={`${label}-back-button`}
          >
            <ChevronIcon size={16} color={theme.mutedForeground} />
            <BackLabel color={theme.mutedForeground}>{t(tk.changePassword.back)}</BackLabel>
          </BackButton>

          <PageTitle color={theme.foreground} testID={`${label}-title`}>
            {t(tk.changePassword.title)}
          </PageTitle>

          <FieldsWrapper>
            <TextInput
              label={t(tk.changePassword.labelCurrentPassword)}
              value={vm.currentPassword}
              placeholder={t(tk.changePassword.placeholderPassword)}
              onChangeText={vm.onChangeCurrentPassword}
              secureTextEntry={!vm.showCurrentPassword}
              rightIcon={vm.showCurrentPassword ? 'hidePassword' : 'showPassword'}
              onPressRightIcon={vm.onToggleCurrentPassword}
              errorMessage={vm.currentPasswordError ?? undefined}
              labelMuted
              testID={`${label}-current-password-input`}
            />
            <TextInput
              label={t(tk.changePassword.labelNewPassword)}
              value={vm.newPassword}
              placeholder={t(tk.changePassword.placeholderNewPassword)}
              onChangeText={vm.onChangeNewPassword}
              secureTextEntry={!vm.showNewPassword}
              rightIcon={vm.showNewPassword ? 'hidePassword' : 'showPassword'}
              onPressRightIcon={vm.onToggleNewPassword}
              errorMessage={vm.newPasswordError ?? undefined}
              labelMuted
              testID={`${label}-new-password-input`}
            />
            <TextInput
              label={t(tk.changePassword.labelConfirmPassword)}
              value={vm.confirmPassword}
              placeholder={t(tk.changePassword.placeholderPassword)}
              onChangeText={vm.onChangeConfirmPassword}
              secureTextEntry={!vm.showConfirmPassword}
              rightIcon={vm.showConfirmPassword ? 'hidePassword' : 'showPassword'}
              onPressRightIcon={vm.onToggleConfirmPassword}
              errorMessage={vm.confirmPasswordError ?? undefined}
              labelMuted
              testID={`${label}-confirm-password-input`}
            />
          </FieldsWrapper>

          {vm.submitError && (
            <Text variant="caption" color={(t) => t.destructive} testID={`${label}-submit-error`}>
              {vm.submitError}
            </Text>
          )}

          <ButtonWrapper>
            <Button
              label={t(tk.changePassword.saveButton)}
              onPress={vm.onPressSave}
              disabled={!vm.currentPassword || !vm.newPassword || !vm.confirmPassword}
              isLoading={vm.isLoading}
              testID={`${label}-save-button`}
            />
          </ButtonWrapper>
        </ContentWrapper>
      </Container>
    </SafeAreaWrapper>
  )
}

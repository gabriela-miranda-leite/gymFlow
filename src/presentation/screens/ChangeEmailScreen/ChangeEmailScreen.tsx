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
  CurrentEmailRow,
  CurrentEmailBold,
  FieldsWrapper,
  ButtonWrapper,
} from '@/presentation/screens/ChangeEmailScreen/ChangeEmailScreen.styles'
import { useChangeEmailViewModel } from '@/presentation/viewModels/ChangeEmailViewModel'
import { tk, useTranslation } from '@/shared/i18n'

const label = 'change-email'

export function ChangeEmailScreen() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const vm = useChangeEmailViewModel()

  const ChevronIcon = AppIcons.navBack

  return (
    <SafeAreaWrapper bg={theme.background} testID={`${label}-screen`}>
      <Container bg={theme.background} keyboardShouldPersistTaps="handled">
        <ContentWrapper bg={theme.background}>
          <BackButton
            onPress={vm.onPressBack}
            activeOpacity={0.6}
            accessibilityRole="button"
            accessibilityLabel={t(tk.editEmail.back)}
            testID={`${label}-back-button`}
          >
            <ChevronIcon size={16} color={theme.mutedForeground} />
            <BackLabel color={theme.mutedForeground}>{t(tk.editEmail.back)}</BackLabel>
          </BackButton>

          <PageTitle color={theme.foreground} testID={`${label}-title`}>
            {t(tk.editEmail.title)}
          </PageTitle>

          <CurrentEmailRow color={theme.mutedForeground}>
            {t(tk.editEmail.emailActual)}{' '}
            <CurrentEmailBold color={theme.foreground}>{vm.currentEmail}</CurrentEmailBold>
          </CurrentEmailRow>
          <FieldsWrapper>
            <TextInput
              label={t(tk.editEmail.labelEmail)}
              value={vm.email}
              placeholder={t(tk.editEmail.placeholderEmail)}
              onChangeText={vm.onChangeEmail}
              keyboardType="email-address"
              errorMessage={vm.emailError ?? undefined}
              labelMuted
              testID={`${label}-new-email-input`}
            />
          </FieldsWrapper>

          {vm.submitError && (
            <Text variant="caption" color={(t) => t.destructive} testID={`${label}-submit-error`}>
              {vm.submitError}
            </Text>
          )}

          <ButtonWrapper>
            <Button
              label={t(tk.editEmail.confirmButton)}
              onPress={vm.onPressSave}
              disabled={!vm.email}
              isLoading={vm.isLoading}
              testID={`${label}-save-button`}
            />
          </ButtonWrapper>
        </ContentWrapper>
      </Container>
    </SafeAreaWrapper>
  )
}

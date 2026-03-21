import { Button, ButtonVariant } from '@/presentation/components/Button/Button'
import { ButtonLink } from '@/presentation/components/ButtonLink/ButtonLink'
import { Divider } from '@/presentation/components/Divider/Divider'
import { Logo, LogoSize, LogoVariant } from '@/presentation/components/Logo'
import { ScreenContainer } from '@/presentation/components/ScreenContainer/ScreenContainer'
import { Stack } from '@/presentation/components/Stack/Stack'
import { Text } from '@/presentation/components/Text/Text'
import { TextInput } from '@/presentation/components/TextInput/TextInput'
import {
  Footer,
  ForgotPasswordRow,
  FormFields,
  Header,
  SocialButtons,
} from '@/presentation/screens/LoginScreen/LoginScreen.styles'
import { useLoginViewModel } from '@/presentation/viewModels/LoginViewModel'
import { tk, useTranslation } from '@/shared/i18n'
import { Spacing } from '@/tokens'

export function LoginScreen() {
  const { t } = useTranslation()
  const {
    email,
    onEmailChange,
    password,
    onPasswordChange,
    isPasswordVisible,
    onTogglePasswordVisibility,
    isLoading,
    emailError,
    passwordError,
    onSubmit,
    onForgotPassword,
    onSignup,
    onGoogleLogin,
    onAppleLogin,
  } = useLoginViewModel()

  return (
    <ScreenContainer>
      <Header>
        <Stack paddingVertical={Spacing.s6}>
          <Logo variant={LogoVariant.Flat} size={LogoSize.Lg} />
        </Stack>

        <Text variant="heading">{t(tk.login.title)}</Text>
        <Text variant="body" color={(theme) => theme.mutedForeground}>
          {t(tk.login.subtitle)}
        </Text>
      </Header>

      <SocialButtons>
        <Button
          label={t(tk.login.googleLogin)}
          onPress={onGoogleLogin}
          variant={ButtonVariant.Outlined}
          leftIcon="google-logo"
        />
        <Button
          label={t(tk.login.appleLogin)}
          onPress={onAppleLogin}
          variant={ButtonVariant.Outlined}
          leftIcon="apple-logo"
        />
      </SocialButtons>

      <Stack paddingVertical={Spacing.s4}>
        <Divider label={t(tk.login.orLogin)} />
      </Stack>

      <FormFields>
        <TextInput
          label={t(tk.login.email)}
          value={email}
          onChangeText={onEmailChange}
          placeholder={t(tk.login.placeholderEmail)}
          keyboardType="email-address"
          autoCapitalize="none"
          errorMessage={emailError ?? undefined}
        />
        <TextInput
          label={t(tk.login.password)}
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry={!isPasswordVisible}
          rightIcon={isPasswordVisible ? 'hidePassword' : 'showPassword'}
          onPressRightIcon={onTogglePasswordVisibility}
          errorMessage={passwordError ?? undefined}
        />
        <ForgotPasswordRow>
          <ButtonLink label={t(tk.login.forgotPassword)} onPress={onForgotPassword} />
        </ForgotPasswordRow>
      </FormFields>

      <Button label={t(tk.login.loginButton)} onPress={onSubmit} isLoading={isLoading} />

      <Footer>
        <Text variant="caption" color={(theme) => theme.mutedForeground}>
          {t(tk.login.signUpPrompt)}
        </Text>
        <ButtonLink label={t(tk.login.signUpLink)} onPress={onSignup} />
      </Footer>
    </ScreenContainer>
  )
}

import { useFocusEffect } from '@react-navigation/native'
import { MotiView } from 'moti'
import { useCallback, useState } from 'react'

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

const fadeUp = (delay: number) =>
  ({
    from: { opacity: 0, translateY: 16 },
    animate: { opacity: 1, translateY: 0 },
    transition: { type: 'timing', duration: 350, delay },
  }) as const

export function LoginScreen() {
  const { t } = useTranslation()
  const [animKey, setAnimKey] = useState(0)

  useFocusEffect(
    useCallback(() => {
      setAnimKey((k) => k + 1)
    }, []),
  )

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
      <MotiView key={`header-${animKey}`} {...fadeUp(0)}>
        <Header>
          <Stack paddingVertical={Spacing.s4}>
            <Logo variant={LogoVariant.Flat} size={LogoSize.Lg} />
          </Stack>

          <Text variant="heading">{t(tk.login.title)}</Text>
          <Text variant="body" color={(theme) => theme.mutedForeground}>
            {t(tk.login.subtitle)}
          </Text>
        </Header>
      </MotiView>

      <MotiView key={`social-${animKey}`} {...fadeUp(100)}>
        <SocialButtons>
          <Button
            label={t(tk.login.googleLogin)}
            onPress={onGoogleLogin}
            variant={ButtonVariant.Outlined}
            leftIcon="google-logo"
            testID="login-google-button"
          />
          <Button
            label={t(tk.login.appleLogin)}
            onPress={onAppleLogin}
            variant={ButtonVariant.Outlined}
            leftIcon="apple-logo"
            testID="login-apple-button"
          />
        </SocialButtons>
      </MotiView>

      <MotiView key={`divider-${animKey}`} {...fadeUp(200)}>
        <Stack paddingVertical={Spacing.s4}>
          <Divider label={t(tk.login.orLogin)} />
        </Stack>
      </MotiView>

      <MotiView key={`fields-${animKey}`} {...fadeUp(300)}>
        <FormFields>
          <TextInput
            label={t(tk.login.email)}
            value={email}
            onChangeText={onEmailChange}
            placeholder={t(tk.login.placeholderEmail)}
            keyboardType="email-address"
            autoCapitalize="none"
            errorMessage={emailError ?? undefined}
            testID="login-email-input"
          />
          <TextInput
            label={t(tk.login.password)}
            value={password}
            onChangeText={onPasswordChange}
            placeholder={t(tk.login.placeholderPassword)}
            secureTextEntry={!isPasswordVisible}
            rightIcon={isPasswordVisible ? 'hidePassword' : 'showPassword'}
            onPressRightIcon={onTogglePasswordVisibility}
            errorMessage={passwordError ?? undefined}
            testID="login-password-input"
          />
          <ForgotPasswordRow>
            <ButtonLink label={t(tk.login.forgotPassword)} onPress={onForgotPassword} />
          </ForgotPasswordRow>
        </FormFields>
      </MotiView>

      <MotiView key={`submit-${animKey}`} {...fadeUp(400)}>
        <Button
          label={t(tk.login.loginButton)}
          onPress={onSubmit}
          isLoading={isLoading}
          testID="login-submit-button"
        />
      </MotiView>

      <MotiView key={`footer-${animKey}`} {...fadeUp(500)}>
        <Footer>
          <Text variant="caption" color={(theme) => theme.mutedForeground}>
            {t(tk.login.signUpPrompt)}
          </Text>
          <ButtonLink
            label={t(tk.login.signUpLink)}
            onPress={onSignup}
            testID="login-signup-link"
          />
        </Footer>
      </MotiView>
    </ScreenContainer>
  )
}

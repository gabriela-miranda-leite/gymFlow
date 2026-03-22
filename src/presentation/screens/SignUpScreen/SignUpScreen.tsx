import { MotiView } from 'moti'

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
  FormFields,
  Header,
  SocialButtons,
} from '@/presentation/screens/SignUpScreen/SignUpScreen.styles'
import { useSignUpViewModel } from '@/presentation/viewModels/SignUpViewModel'
import { tk, useTranslation } from '@/shared/i18n'
import { useAppNavigation } from '@/shared/navigation/useAppNavigation'
import { Spacing } from '@/tokens'

const fadeUp = (delay: number) =>
  ({
    from: { opacity: 0, translateY: 16 },
    animate: { opacity: 1, translateY: 0 },
    transition: { type: 'timing', duration: 350, delay },
  }) as const

export function SignUpScreen() {
  const { t } = useTranslation()
  const { goBack } = useAppNavigation()
  const {
    name,
    onNameChange,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    isPasswordVisible,
    onTogglePasswordVisibility,
    isLoading,
    nameError,
    emailError,
    passwordError,
    onSubmit,
    onGoogleSignUp,
    onAppleSignUp,
  } = useSignUpViewModel()

  return (
    <ScreenContainer>
      <MotiView {...fadeUp(0)}>
        <Header>
          <Stack paddingVertical={Spacing.s4}>
            <Logo variant={LogoVariant.Flat} size={LogoSize.Lg} />
          </Stack>

          <Text variant="heading">{t(tk.signUp.title)}</Text>
          <Text variant="body" color={(theme) => theme.mutedForeground}>
            {t(tk.signUp.subtitle)}
          </Text>
        </Header>
      </MotiView>

      <MotiView {...fadeUp(100)}>
        <SocialButtons>
          <Button
            label={t(tk.signUp.googleLogin)}
            onPress={onGoogleSignUp}
            variant={ButtonVariant.Outlined}
            leftIcon="google-logo"
            testID="signUp-google-btn"
          />
          <Button
            label={t(tk.signUp.appleLogin)}
            onPress={onAppleSignUp}
            variant={ButtonVariant.Outlined}
            leftIcon="apple-logo"
            testID="signUp-apple-btn"
          />
        </SocialButtons>
      </MotiView>

      <MotiView {...fadeUp(200)}>
        <Stack paddingVertical={Spacing.s4}>
          <Divider label={t(tk.signUp.orSignUp)} />
        </Stack>
      </MotiView>

      <MotiView {...fadeUp(300)}>
        <FormFields>
          <TextInput
            label={t(tk.signUp.name)}
            value={name}
            onChangeText={onNameChange}
            placeholder={t(tk.signUp.placeholderName)}
            autoCapitalize="words"
            errorMessage={nameError ?? undefined}
            testID="signUp-name-input"
          />
          <TextInput
            label={t(tk.signUp.email)}
            value={email}
            onChangeText={onEmailChange}
            placeholder={t(tk.signUp.placeholderEmail)}
            keyboardType="email-address"
            autoCapitalize="none"
            errorMessage={emailError ?? undefined}
            testID="signUp-email-input"
          />
          <TextInput
            label={t(tk.signUp.password)}
            value={password}
            onChangeText={onPasswordChange}
            placeholder={t(tk.signUp.placeholderPassword)}
            secureTextEntry={!isPasswordVisible}
            rightIcon={isPasswordVisible ? 'hidePassword' : 'showPassword'}
            onPressRightIcon={onTogglePasswordVisibility}
            errorMessage={passwordError ?? undefined}
            testID="signUp-password-input"
          />
        </FormFields>
      </MotiView>

      <MotiView {...fadeUp(400)}>
        <Button
          label={t(tk.signUp.signUpButton)}
          onPress={onSubmit}
          isLoading={isLoading}
          testID="signUp-submit-btn"
        />
      </MotiView>

      <MotiView {...fadeUp(500)}>
        <Footer>
          <Text variant="caption" color={(theme) => theme.mutedForeground}>
            {t(tk.signUp.loginPrompt)}
          </Text>
          <ButtonLink label={t(tk.signUp.loginLink)} onPress={goBack} testID="signUp-login-link" />
        </Footer>
      </MotiView>
    </ScreenContainer>
  )
}

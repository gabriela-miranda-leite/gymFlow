import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { loginSchema } from '@/domain/useCases/LoginUseCase'
import type { LoginCredentials } from '@/domain/useCases/LoginUseCase'
import type { LoginUiModel } from '@/presentation/uiModels/LoginUiModel'
import { tk } from '@/shared/i18n'
import { useAppNavigation } from '@/shared/navigation/useAppNavigation'

export const useLoginViewModel = (): LoginUiModel => {
  const { t } = useTranslation()

  const [isLoading] = useState<boolean>(false)
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const emailError = errors.email?.message ? t(tk.validation.emailInvalid) : null

  let passwordError: string | null = null
  if (errors.password) {
    if (errors.password.type === 'too_small') {
      passwordError = t(tk.validation.passwordTooShort)
    } else if (errors.password.message) {
      passwordError = errors.password.message
    }
  }

  const email = watch('email')
  const password = watch('password')

  const onSubmit = handleSubmit(async () => {
    toApp()
  })

  const onForgotPassword = () => {
    //todo implementar função
  }

  const { toSignUp, toApp } = useAppNavigation()

  const onSignup = () => {
    toSignUp()
  }

  const onGoogleLogin = () => {
    //todo implementar função
  }

  const onAppleLogin = () => {
    //todo implementar função
  }

  const onTogglePasswordVisibility = () => setPasswordVisible((prev) => !prev)

  const onEmailChange = (value: string) => {
    setValue('email', value, { shouldValidate: Boolean(errors.email) })
  }

  const onPasswordChange = (value: string) =>
    setValue('password', value, { shouldValidate: Boolean(errors.password) })

  return {
    email,
    onEmailChange,
    password,
    onPasswordChange,
    isLoading,
    isPasswordVisible,
    onTogglePasswordVisibility,
    emailError,
    passwordError,
    onSubmit,
    onForgotPassword,
    onSignup,
    onGoogleLogin,
    onAppleLogin,
  }
}

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { authRepository } from '@/data/repositories/auth/AuthRepository'
import type { LoginCredentials } from '@/domain/useCases/login/LoginUseCase'
import { loginSchema, loginUseCase } from '@/domain/useCases/login/LoginUseCase'
import type { LoginUiModel } from '@/presentation/uiModels/LoginUiModel'
import { tk } from '@/shared/i18n'
import { useAppNavigation } from '@/shared/navigation/useAppNavigation'

export const useLoginViewModel = (): LoginUiModel => {
  const { t } = useTranslation()
  const { toSignUp, toApp } = useAppNavigation()

  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const email = watch('email')
  const password = watch('password')

  const emailError = errors.email?.message ? t(tk.validation.emailInvalid) : null

  let passwordError: string | null = null
  if (errors.password) {
    if (errors.password.type === 'too_small') {
      passwordError = t(tk.validation.passwordTooShort)
    } else if (errors.password.message) {
      passwordError = errors.password.message
    }
  }

  const onEmailChange = (value: string) => {
    setValue('email', value, { shouldValidate: Boolean(errors.email) })
  }

  const onPasswordChange = (value: string) => {
    setValue('password', value, { shouldValidate: Boolean(errors.password) })
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      await loginUseCase(data, authRepository)
      toApp()
    } finally {
      setIsLoading(false)
    }
  })

  const onTogglePasswordVisibility = () => setPasswordVisible((prev) => !prev)

  const onForgotPassword = () => {
    // todo: implementar
  }

  const onSignup = () => toSignUp()

  const onGoogleLogin = () => {
    // todo: implementar
  }

  const onAppleLogin = () => {
    // todo: implementar
  }

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

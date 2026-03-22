import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { authRepository } from '@/data/repositories/AuthRepository'
import { loginSchema, loginUseCase } from '@/domain/useCases/LoginUseCase'
import type { LoginCredentials } from '@/domain/useCases/LoginUseCase'
import type { LoginUiModel } from '@/presentation/uiModels/LoginUiModel'
import { tk } from '@/shared/i18n'

export const useLoginViewModel = (): LoginUiModel => {
  const { t } = useTranslation()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)

  const {
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const email = watch('email')
  const password = watch('password')

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      await loginUseCase(data, authRepository)
    } catch {
      setError('password', { message: t(tk.errors.loginFailed) })
    } finally {
      setLoading(false)
    }
  })

  const onForgotPassword = () => {
    //todo implementar função
  }

  const onSignup = () => {
    //todo implementar função
  }

  const onGoogleLogin = () => {
    //todo implementar função
  }

  const onAppleLogin = () => {
    //todo implementar função
  }

  const onTogglePasswordVisibility = () => setPasswordVisible((prev) => !prev)

  return {
    email,
    onEmailChange: (value) => setValue('email', value, { shouldValidate: !!errors.email }),
    password,
    onPasswordChange: (value) => setValue('password', value, { shouldValidate: !!errors.password }),
    isLoading,
    isPasswordVisible,
    onTogglePasswordVisibility,
    emailError: errors.email?.message ? t(tk.validation.emailInvalid) : null,
    passwordError: errors.password
      ? errors.password.type
        ? t(tk.validation.passwordTooShort)
        : (errors.password.message ?? null)
      : null,
    onSubmit,
    onForgotPassword,
    onSignup,
    onGoogleLogin,
    onAppleLogin,
  }
}

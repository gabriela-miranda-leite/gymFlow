import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SignUpCredentials, signUpSchema } from '@/domain/useCases/signUp/SignUpUseCase'
import type { SignUpUiModel } from '@/presentation/uiModels/SignUpUiModel'
import { tk } from '@/shared/i18n'
import { useAppNavigation } from '@/shared/navigation/useAppNavigation'

export const useSignUpViewModel = (): SignUpUiModel => {
  const { t } = useTranslation()

  const [isLoading] = useState<boolean>(false)
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpCredentials>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  const name = watch('name')
  const email = watch('email')
  const password = watch('password')

  const { toApp } = useAppNavigation()

  const onSubmit = handleSubmit(async () => {
    toApp()
  })

  const emailError = errors.email?.message ? t(tk.validation.emailInvalid) : null

  const nameError = errors.name?.message ? t(tk.validation.nameInvalid) : null

  let passwordError: string | null = null
  if (errors.password) {
    if (errors.password.type === 'too_small') {
      passwordError = t(tk.validation.passwordTooShort)
    } else if (errors.password.message) {
      passwordError = errors.password.message
    }
  }

  const onGoogleSignUp = () => {
    //todo implementar função
  }

  const onAppleSignUp = () => {
    //todo implementar função
  }

  const onTogglePasswordVisibility = () => setPasswordVisible((prev) => !prev)

  const onNameChange = (value: string) =>
    setValue('name', value, {
      shouldValidate: Boolean(errors.name),
    })

  const onEmailChange = (value: string) =>
    setValue('email', value, {
      shouldValidate: Boolean(errors.email),
    })

  const onPasswordChange = (value: string) =>
    setValue('password', value, { shouldValidate: Boolean(errors.password) })

  return {
    name,
    onNameChange,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    isLoading,
    isPasswordVisible,
    onTogglePasswordVisibility,
    nameError,
    passwordError,
    emailError,
    onSubmit,
    onGoogleSignUp,
    onAppleSignUp,
  }
}

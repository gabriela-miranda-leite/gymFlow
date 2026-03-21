import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { authRepository } from '@/data/repositories/AuthRepository'
import { loginUseCase } from '@/domain/useCases/LoginUseCase'
import type { LoginUiModel } from '@/presentation/uiModels/LoginUiModel'
import { tk } from '@/shared/i18n'

export const useLoginViewModel = (): LoginUiModel => {
  const { t } = useTranslation()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      await loginUseCase({ email, password }, authRepository)
    } catch {
      setError(t(tk.errors.loginFailed))
    } finally {
      setLoading(false)
    }
  }

  const onForgotPassword = () => {
    //todo implementar função
  }

  const onSignup = () => {
    //todo implementar função
  }

  const onTogglePasswordVisibility = () => setPasswordVisible((prev) => !prev)

  return {
    email,
    onEmailChange: setEmail,
    password,
    onPasswordChange: setPassword,
    isLoading,
    isPasswordVisible,
    onTogglePasswordVisibility: onTogglePasswordVisibility,
    error,
    onSubmit,
    onForgotPassword,
    onSignup,
  }
}

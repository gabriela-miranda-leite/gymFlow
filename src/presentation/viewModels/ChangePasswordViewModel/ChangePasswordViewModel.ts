import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { passwordRepository } from '@/data/repositories/password/PasswordRepository'
import {
  updatePasswordSchema,
  updatePasswordUseCase,
  type UpdatePasswordCredentials,
} from '@/domain/useCases/updatePassword/UpdatePasswordUseCase'
import type { ChangePasswordUiModel } from '@/presentation/uiModels/ChangePasswordUiModel'
import { tk, useTranslation } from '@/shared/i18n'
import type { RootStackParamList } from '@/shared/navigation/types'

export function useChangePasswordViewModel(): ChangePasswordUiModel {
  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordCredentials>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const currentPassword = watch('currentPassword')
  const newPassword = watch('newPassword')
  const confirmPassword = watch('confirmPassword')

  const onPressSave = handleSubmit(async (data) => {
    setIsLoading(true)
    setSubmitError(null)
    try {
      await updatePasswordUseCase(data, passwordRepository)
      navigation.goBack()
    } catch {
      setSubmitError(t(tk.errors.generic))
    } finally {
      setIsLoading(false)
    }
  })

  const newPasswordError = errors.newPassword?.message
    ? t(tk.changePassword.errorPasswordTooShort)
    : null

  const confirmPasswordError = errors.confirmPassword?.message
    ? t(tk.changePassword.errorPasswordsNotMatch)
    : null

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    currentPasswordError: null,
    newPasswordError,
    confirmPasswordError,
    submitError,
    isLoading,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    onChangeCurrentPassword: (v) => setValue('currentPassword', v),
    onChangeNewPassword: (v) => setValue('newPassword', v),
    onChangeConfirmPassword: (v) => setValue('confirmPassword', v),
    onToggleCurrentPassword: () => setShowCurrentPassword((v) => !v),
    onToggleNewPassword: () => setShowNewPassword((v) => !v),
    onToggleConfirmPassword: () => setShowConfirmPassword((v) => !v),
    onPressSave,
    onPressBack: () => navigation.goBack(),
  }
}

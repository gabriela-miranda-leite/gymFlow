import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { EmailCredentials } from '@/domain/useCases/updateEmail/UpdateEmailUseCase'
import { emailSchema, updateEmailUseCase } from '@/domain/useCases/updateEmail/UpdateEmailUseCase'
import type { ChangeEmailUiModel } from '@/presentation/uiModels/ChangeEmailUiModel'
import { tk, useTranslation } from '@/shared/i18n'
import type { RootStackParamList } from '@/shared/navigation/types'
import { useAuthStore } from '@/store'

const mockEmailRepository = {
  updateEmail: async () => {},
}

export const useChangeEmailViewModel = (): ChangeEmailUiModel => {
  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const currentEmail = useAuthStore((state) => state.user?.email ?? '')

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailCredentials>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  })

  const email = watch('email')
  const emailError = errors.email?.message ? t(tk.validation.emailInvalid) : null

  const onChangeEmail = (value: string) => {
    setSubmitError(null)
    setValue('email', value, { shouldValidate: Boolean(errors.email) })
  }

  const onPressSave = handleSubmit(async (data) => {
    setIsLoading(true)
    setSubmitError(null)
    try {
      await updateEmailUseCase(data, mockEmailRepository)
      navigation.goBack()
    } catch {
      setSubmitError(t(tk.errors.generic))
    } finally {
      setIsLoading(false)
    }
  })

  const onPressBack = () => {
    navigation.goBack()
  }

  return {
    currentEmail,
    email,
    emailError,
    submitError,
    isLoading,
    onChangeEmail,
    onPressSave,
    onPressBack,
  }
}

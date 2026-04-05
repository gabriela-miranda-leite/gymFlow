import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { profileRepository } from '@/data/repositories/profile/ProfileRepository'
import { getProfileUseCase } from '@/domain/useCases/getProfile/GetProfileUseCase'
import type { UpdateProfileCredentials } from '@/domain/useCases/updateProfile/UpdateProfileUseCase'
import {
  updateProfileSchema,
  updateProfileUseCase,
} from '@/domain/useCases/updateProfile/UpdateProfileUseCase'
import type { EditProfileUiModel } from '@/presentation/uiModels/EditProfileUiModel'
import { tk } from '@/shared/i18n'
import type { RootStackParamList } from '@/shared/navigation/types'
import { formatPhone } from '@/shared/utils/formatPhone'

type NavProps = NativeStackNavigationProp<RootStackParamList>

export const useEditProfileViewModel = (): EditProfileUiModel => {
  const navigation = useNavigation<NavProps>()
  const { t } = useTranslation()
  const [imageUri, setImageUri] = useState<string | undefined>(undefined)

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileCredentials>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: '', phone: '', imageUri: undefined },
  })

  const name = watch('name')
  const phone = watch('phone')

  const nameError = errors.name?.message ? t(tk.validation.nameInvalid) : null

  useEffect(() => {
    getProfileUseCase(profileRepository).then((profile) => {
      reset({ name: profile.name, phone: profile.phone, imageUri: profile.imageUri })
      setImageUri(profile.imageUri)
    })
  }, [reset])

  const onChangeName = (value: string) => {
    setValue('name', value, { shouldValidate: Boolean(errors.name) })
  }

  const onChangePhone = (value: string) => {
    setValue('phone', formatPhone(value))
  }

  const onPressSave = handleSubmit(async (data) => {
    await updateProfileUseCase({ ...data, imageUri }, profileRepository)
    navigation.goBack()
  })

  const onPressBack = () => {
    navigation.goBack()
  }

  const onPressCameraBadge = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri)
    }
  }

  return {
    name,
    phone,
    imageUri,
    nameError,
    onChangeName,
    onChangePhone,
    onPressSave,
    onPressBack,
    onPressCameraBadge,
  }
}

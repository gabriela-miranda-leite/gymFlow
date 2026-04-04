import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'

import { profileRepository } from '@/data/repositories/profile/ProfileRepository'
import { getProfileUseCase } from '@/domain/useCases/getProfile/GetProfileUseCase'
import { updateProfileUseCase } from '@/domain/useCases/updateProfile/UpdateProfileUseCase'
import type { EditProfileUiModel } from '@/presentation/uiModels/EditProfileUiModel'
import type { RootStackParamList } from '@/shared/navigation/types'

type NavProps = NativeStackNavigationProp<RootStackParamList>

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export const useEditProfileViewModel = (): EditProfileUiModel => {
  const navigation = useNavigation<NavProps>()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [imageUri, setImageUri] = useState<string | undefined>(undefined)

  useEffect(() => {
    getProfileUseCase(profileRepository).then((profile) => {
      setName(profile.name)
      setPhone(profile.phone)
      setImageUri(profile.imageUri)
    })
  }, [])

  const onChangeName = (value: string) => {
    setName(value)
  }

  const onChangePhone = (value: string) => {
    setPhone(formatPhone(value))
  }

  const onPressSave = () => {
    if (!name.trim()) return
    updateProfileUseCase({ name, phone, imageUri }, profileRepository).then(() => {
      navigation.goBack()
    })
  }

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
    onChangeName,
    onChangePhone,
    onPressSave,
    onPressBack,
    onPressCameraBadge,
  }
}

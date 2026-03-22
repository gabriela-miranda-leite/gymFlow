import { useNavigation } from '@react-navigation/native'
import type { NavigationProp } from '@react-navigation/native'

import type { RootStackParamList } from '@/shared/navigation/types'

export function useAppNavigation() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return {
    toSignUp: () => navigation.navigate('SignUp'),
    toLogin: () => navigation.navigate('Login'),
    goBack: () => navigation.goBack(),
  }
}

import { useNavigation } from '@react-navigation/native'
import type { NavigationProp } from '@react-navigation/native'

import { RootRoutes, TabRoutes } from '@/shared/navigation/routes'
import type { RootStackParamList } from '@/shared/navigation/types'

export function useAppNavigation() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return {
    toSignUp: () => navigation.navigate(RootRoutes.SignUp),
    toLogin: () => navigation.navigate(RootRoutes.Login),
    toApp: () => navigation.navigate(RootRoutes.App, { screen: TabRoutes.Map }),
    goBack: () => navigation.goBack(),
  }
}

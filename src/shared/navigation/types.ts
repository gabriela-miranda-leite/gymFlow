import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

// Root stack: Auth ou App (tabs)
export type RootStackParamList = {
  Login: undefined
  App: NavigatorScreenParams<AppTabParamList>
}

// Tab navigator do app autenticado
export type AppTabParamList = {
  Home: undefined
  Profile: undefined
}

// Helpers de tipagem para screens
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>

export type AppTabScreenProps<T extends keyof AppTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}

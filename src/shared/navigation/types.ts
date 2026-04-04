import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import type { OccupancyLevel } from '@/tokens'

export type RootStackParamList = {
  Login: undefined
  SignUp: undefined
  App: NavigatorScreenParams<AppTabParamList>
  CheckInFeedback: {
    gymName: string
    occupancy: OccupancyLevel
    occupancyLabel: string
    occupancyColor: string
  }
  GymDetail: {
    gymId: string
  }
  EditProfile: undefined
}

export type AppTabParamList = {
  Map: undefined
  CheckIn: undefined
  Profile: undefined
}

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

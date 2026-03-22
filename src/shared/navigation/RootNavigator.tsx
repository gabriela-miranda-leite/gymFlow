import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from '@/contexts/ThemeContext'
import { LoginScreen } from '@/presentation/screens/LoginScreen'
import { SignUpScreen } from '@/presentation/screens/SignUpScreen'
import { AppNavigator } from '@/shared/navigation/AppNavigator'
import { RootRoutes } from '@/shared/navigation/routes'
import type { RootStackParamList } from '@/shared/navigation/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  const { theme } = useTheme()

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RootRoutes.Login}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name={RootRoutes.Login} component={LoginScreen} />
        <Stack.Screen name={RootRoutes.SignUp} component={SignUpScreen} />
        <Stack.Screen name={RootRoutes.App} component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

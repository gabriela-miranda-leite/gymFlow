import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from '@/contexts/ThemeContext'
import { LoginScreen } from '@/presentation/screens/LoginScreen'
import { SignUpScreen } from '@/presentation/screens/SignUpScreen'
import type { RootStackParamList } from '@/shared/navigation/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  const { theme } = useTheme()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

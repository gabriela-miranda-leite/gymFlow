import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
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
        {/* TODO: add Login and App screens */}
        <Stack.Screen name="Login" component={View} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

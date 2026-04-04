import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { Meta, StoryObj } from '@storybook/react-native'

import { ThemeProvider } from '@/contexts/ThemeContext'

import { EditProfileScreen } from './EditProfileScreen'

const Stack = createNativeStackNavigator()

function StorybookWrapper() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

const meta: Meta = {
  title: 'Screens/EditProfileScreen',
  component: StorybookWrapper,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

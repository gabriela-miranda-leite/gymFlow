import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import type { Meta, StoryObj } from '@storybook/react-native'

import { ThemeProvider } from '@/contexts/ThemeContext'

import { ProfileScreen } from './ProfileScreen'

const Tab = createBottomTabNavigator()

function StorybookWrapper() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

const meta: Meta = {
  title: 'Screens/ProfileScreen',
  component: StorybookWrapper,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

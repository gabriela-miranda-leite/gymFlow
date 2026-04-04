import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { Meta, StoryObj } from '@storybook/react-native'

import { ThemeProvider } from '@/contexts/ThemeContext'

import { GymDetailScreen } from './GymDetailScreen'

const Stack = createNativeStackNavigator()

function StorybookWrapper({ gymId = '1' }: { gymId?: string }) {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GymDetail" component={GymDetailScreen} initialParams={{ gymId }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

const meta: Meta = {
  title: 'Screens/GymDetailScreen',
  component: StorybookWrapper,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const BusyGym: Story = {
  args: { gymId: '4' },
}

export const EmptyGym: Story = {
  args: { gymId: '3' },
}

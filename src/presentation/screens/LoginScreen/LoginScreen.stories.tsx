import type { Meta, StoryObj } from '@storybook/react-native'

import { LoginScreen } from '@/presentation/screens/LoginScreen/LoginScreen'

const meta = {
  title: 'Screens/LoginScreen',
  component: LoginScreen,
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#19191D' },
      ],
    },
  },
} satisfies Meta<typeof LoginScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

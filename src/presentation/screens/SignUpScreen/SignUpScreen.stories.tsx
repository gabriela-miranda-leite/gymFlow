import type { Meta, StoryObj } from '@storybook/react-native'

import { SignUpScreen } from '@/presentation/screens/SignUpScreen/SignUpScreen'

const meta = {
  title: 'Screens/SignUpScreen',
  component: SignUpScreen,
} satisfies Meta<typeof SignUpScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

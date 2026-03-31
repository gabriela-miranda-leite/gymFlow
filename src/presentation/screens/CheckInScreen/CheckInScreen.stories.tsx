import type { Meta, StoryObj } from '@storybook/react'

import { CheckInScreen } from './CheckInScreen'

const meta: Meta<typeof CheckInScreen> = {
  title: 'Screens/CheckInScreen',
  component: CheckInScreen,
}

export default meta

type Story = StoryObj<typeof CheckInScreen>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/react'

import { CheckInFeedbackScreen } from './CheckInFeedbackScreen'

const meta: Meta<typeof CheckInFeedbackScreen> = {
  title: 'Screens/CheckInFeedbackScreen',
  component: CheckInFeedbackScreen,
}

export default meta

type Story = StoryObj<typeof CheckInFeedbackScreen>

export const Default: Story = {}

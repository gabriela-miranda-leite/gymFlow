import type { Meta, StoryObj } from '@storybook/react-native'
import type { ComponentType } from 'react'
import { View } from 'react-native'

import { Divider } from '@/presentation/components/Divider/Divider'

const meta = {
  title: 'Components/Divider',
  component: Divider,
  decorators: [
    (Story: ComponentType) => (
      <View style={{ padding: 24, width: '100%' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const WithLabel: Story = {
  args: { label: 'ou' },
}

export const WithoutLabel: Story = {
  args: {},
}

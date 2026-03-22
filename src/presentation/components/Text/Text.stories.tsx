import type { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'

import { Text } from '@/presentation/components/Text/Text'

const meta = {
  title: 'Components/Text',
  component: Text,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['display', 'heading', 'subheading', 'body', 'caption', 'micro', 'data'],
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  args: { children: '' },
  render: () => (
    <>
      <Text variant="display">Display — 24px Bold</Text>
      <Text variant="heading">Heading — 20px Bold</Text>
      <Text variant="subheading">Subheading — 16px SemiBold</Text>
      <Text variant="body">Body — 14px Medium</Text>
      <Text variant="caption">Caption — 12px Medium</Text>
      <Text variant="micro">Micro — 10px SemiBold</Text>
      <Text variant="data">Data — 30px Mono Bold</Text>
    </>
  ),
}

export const CustomColor: Story = {
  args: {
    variant: 'heading',
    children: 'Texto com cor primária',
    color: (t) => t.brand.primary,
  },
}

export const Muted: Story = {
  args: {
    variant: 'body',
    children: 'Texto secundário',
    color: (t) => t.mutedForeground,
  },
}

import type { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'

import { Stack } from '@/presentation/components/Stack/Stack'
import { Text } from '@/presentation/components/Text/Text'
import { Spacing } from '@/tokens'

const meta = {
  title: 'Components/Stack',
  component: Stack,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, width: '100%' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    direction: {
      control: { type: 'radio' },
      options: ['vertical', 'horizontal'],
    },
    spacing: {
      control: { type: 'select' },
      options: Object.values(Spacing),
    },
    align: {
      control: { type: 'select' },
      options: [undefined, 'flex-start', 'center', 'flex-end', 'stretch'],
    },
    justify: {
      control: { type: 'select' },
      options: [undefined, 'flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ label }: { label: string }) => (
  <View style={{ backgroundColor: '#FF6B0033', borderRadius: 8, padding: 12 }}>
    <Text variant="caption">{label}</Text>
  </View>
)

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    spacing: Spacing.s3,
  },
  render: (args) => (
    <Stack {...args}>
      <Box label="Item 1" />
      <Box label="Item 2" />
      <Box label="Item 3" />
    </Stack>
  ),
}

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    spacing: Spacing.s3,
    align: 'center',
  },
  render: (args) => (
    <Stack {...args}>
      <Box label="A" />
      <Box label="B" />
      <Box label="C" />
    </Stack>
  ),
}

export const SpaceBetween: Story = {
  args: {
    direction: 'horizontal',
    spacing: 0,
    justify: 'space-between',
    align: 'center',
  },
  render: (args) => (
    <Stack {...args}>
      <Box label="Esquerda" />
      <Box label="Direita" />
    </Stack>
  ),
}

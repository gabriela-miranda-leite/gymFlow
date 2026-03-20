import type { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'

import { colors } from '@/tokens'

import { AppText } from './AppText'

const meta = {
  title: 'Components/AppText',
  component: AppText,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'heading', 'subheading', 'body', 'caption', 'micro', 'data'],
    },
    color: {
      control: 'select',
      options: [
        colors.foregroundLight,
        colors.secondaryForegroundLight,
        colors.mutedForegroundLight,
        colors.white,
        colors.primary,
      ],
      labels: {
        [colors.foregroundLight]: 'foreground',
        [colors.secondaryForegroundLight]: 'secondaryForeground',
        [colors.mutedForegroundLight]: 'mutedForeground',
        [colors.white]: 'white',
        [colors.primary]: 'brand.primary',
      },
    },
  },
} satisfies Meta<typeof AppText>

export default meta
type Story = StoryObj<typeof meta>

export const Display: Story = { args: { variant: 'display', children: 'Display' } }
export const Heading: Story = { args: { variant: 'heading', children: 'Heading' } }
export const Subheading: Story = { args: { variant: 'subheading', children: 'Subheading' } }
export const Body: Story = { args: { variant: 'body', children: 'Corpo de texto padrão' } }
export const Caption: Story = { args: { variant: 'caption', children: 'Legenda' } }
export const Micro: Story = { args: { variant: 'micro', children: 'Micro texto' } }
export const Data: Story = { args: { variant: 'data', children: '1.234' } }
export const CustomColor: Story = {
  args: { variant: 'body', color: colors.primary, children: 'Cor customizada' },
}

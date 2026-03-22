import type { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'

import { Logo, LogoSize, LogoVariant } from '@/presentation/components/Logo/Logo'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'flex-start', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: Object.values(LogoVariant),
    },
    size: {
      control: { type: 'radio' },
      options: Object.values(LogoSize),
    },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  args: { variant: LogoVariant.Full, size: LogoSize.Md },
}

export const IconOnly: Story = {
  args: { variant: LogoVariant.IconOnly, size: LogoSize.Md },
}

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Logo variant={LogoVariant.Full} size={LogoSize.Sm} />
      <Logo variant={LogoVariant.Full} size={LogoSize.Md} />
      <Logo variant={LogoVariant.Full} size={LogoSize.Lg} />
    </View>
  ),
}

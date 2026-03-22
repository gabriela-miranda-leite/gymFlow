import type { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'

import { Button, ButtonVariant } from '@/presentation/components/Button/Button'
import type { AppIconName } from '@/presentation/components/icons/AppIcons'

const iconOptions: AppIconName[] = [
  'emailField',
  'passwordField',
  'navBack',
  'favorite',
  'logout',
  'notifications',
]

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, width: '100%' }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#19191D' },
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: Object.values(ButtonVariant),
    },
    leftIcon: {
      control: { type: 'select' },
      options: [undefined, ...iconOptions],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    textColor: {
      control: { type: 'select' },
      options: ['default', 'primary', 'destructive', 'muted'],
      mapping: {
        default: undefined,
        primary: (theme: { brand: { primary: string } }) => theme.brand.primary,
        destructive: (theme: { destructive: string }) => theme.destructive,
        muted: (theme: { mutedForeground: string }) => theme.mutedForeground,
      },
    },
    onPress: { action: 'pressed' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Contained: Story = {
  args: {
    label: 'Entrar',
    variant: ButtonVariant.Contained,
    onPress: () => {},
  },
}

export const Outlined: Story = {
  args: {
    label: 'Continuar com Google',
    variant: ButtonVariant.Outlined,
    onPress: () => {},
  },
}

export const OutlinedWithIcon: Story = {
  args: {
    label: 'Continuar com Google',
    variant: ButtonVariant.Outlined,
    leftIcon: 'emailField',
    onPress: () => {},
  },
}

export const Loading: Story = {
  args: {
    label: 'Entrar',
    isLoading: true,
    onPress: () => {},
  },
}

export const Disabled: Story = {
  args: {
    label: 'Entrar',
    disabled: true,
    onPress: () => {},
  },
}

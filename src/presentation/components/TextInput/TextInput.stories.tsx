import type { Meta, StoryObj } from '@storybook/react-native'
import { View } from 'react-native'

import { TextInput } from '@/presentation/components/TextInput/TextInput'

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
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
    keyboardType: {
      control: { type: 'select' },
      options: ['default', 'email-address', 'numeric', 'phone-pad'],
    },
    autoCapitalize: {
      control: { type: 'radio' },
      options: ['none', 'sentences', 'words', 'characters'],
    },
    rightIcon: {
      control: { type: 'select' },
      options: [undefined, 'showPassword', 'hidePassword', 'emailField'],
    },
    secureTextEntry: { control: 'boolean' },
    onChangeText: { action: 'changed' },
    onPressRightIcon: { action: 'icon pressed' },
  },
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    value: '',
    placeholder: 'seu@email.com',
    onChangeText: () => {},
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    value: 'aaa',
    placeholder: 'seu@email.com',
    errorMessage: 'Email inválido',
    onChangeText: () => {},
  },
}

export const Password: Story = {
  args: {
    label: 'Senha',
    value: '',
    placeholder: '••••••••',
    secureTextEntry: true,
    rightIcon: 'showPassword',
    onChangeText: () => {},
  },
}

export const PasswordVisible: Story = {
  args: {
    label: 'Senha',
    value: 'minhasenha',
    secureTextEntry: false,
    rightIcon: 'hidePassword',
    onChangeText: () => {},
  },
}

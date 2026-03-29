import type { Meta, StoryObj } from '@storybook/react-native'
import type { ComponentType } from 'react'
import { View } from 'react-native'

import { Select } from '@/presentation/components/Select/Select'
import type { SelectOption } from '@/presentation/components/Select/Select'

const GYM_OPTIONS: SelectOption[] = [
  {
    value: 'smart-vila',
    label: 'SmartFit Vila Mariana',
    sublabel: 'R. Domingos de Morais, 800',
  },
  {
    value: 'smart-pinheiros',
    label: 'SmartFit Pinheiros',
    sublabel: 'R. dos Pinheiros, 473',
  },
  {
    value: 'bio-paulista',
    label: 'Bio Ritmo Paulista',
    sublabel: 'Av. Paulista, 1234',
  },
  {
    value: 'academia-flow',
    label: 'Academia Flow Moema',
    sublabel: 'Av. Ibirapuera, 2907',
  },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  decorators: [
    (Story: ComponentType) => (
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
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: GYM_OPTIONS,
    placeholder: 'Selecionar academia',
    onChange: () => {},
  },
}

export const WithValue: Story = {
  args: {
    options: GYM_OPTIONS,
    value: 'smart-vila',
    placeholder: 'Selecionar academia',
    onChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    options: GYM_OPTIONS,
    placeholder: 'Selecionar academia',
    onChange: () => {},
    disabled: true,
  },
}

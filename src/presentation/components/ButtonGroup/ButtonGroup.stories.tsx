import type { Meta, StoryObj } from '@storybook/react-native'
import type { ComponentType } from 'react'
import { View } from 'react-native'

import { ButtonGroup } from '@/presentation/components/ButtonGroup/ButtonGroup'
import type { ButtonGroupOption } from '@/presentation/components/ButtonGroup/ButtonGroup'

const CHECK_IN_OPTIONS: ButtonGroupOption[] = [
  {
    value: 'empty',
    label: 'Vazio',
    sublabel: 'Equipamentos livres',
    color: '#4CAF50',
  },
  {
    value: 'normal',
    label: 'Normal',
    sublabel: 'Fluxo tranquilo',
    color: '#FFC107',
  },
  {
    value: 'full',
    label: 'Cheio',
    sublabel: 'Espera em alguns',
    color: '#FF9800',
  },
  {
    value: 'packed',
    label: 'Lotado',
    sublabel: 'Longa espera',
    color: '#F44336',
  },
]

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
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
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: CHECK_IN_OPTIONS,
    onSelect: () => {},
  },
}

export const Disabled: Story = {
  args: {
    options: CHECK_IN_OPTIONS,
    onSelect: () => {},
    disabled: true,
  },
}

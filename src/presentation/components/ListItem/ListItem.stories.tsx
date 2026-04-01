import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { View } from 'react-native'

import { ListItem } from './ListItem'

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
}

export default meta

type Story = StoryObj<typeof ListItem>

export const WithIconAndChevron: Story = {
  args: {
    label: 'Email',
    sublabel: 'rafael@email.com',
    leading: { type: 'icon', icon: 'emailField' },
    trailing: { type: 'chevron' },
    onPress: () => {},
  },
}

export const WithIndicatorAndTextChevron: Story = {
  args: {
    label: 'SmartFit Paulista',
    sublabel: 'Av. Paulista, 1000',
    leading: { type: 'indicator', color: '#4CAF50' },
    trailing: { type: 'text-chevron', text: '22%' },
    onPress: () => {},
  },
}

function ToggleStory() {
  const [value, setValue] = useState(true)
  return (
    <ListItem
      label="Horário ideal"
      sublabel="Avisa quando esvaziar"
      trailing={{ type: 'toggle', value, onValueChange: setValue }}
    />
  )
}

export const WithToggle: Story = {
  render: () => <ToggleStory />,
}

function SliderStory() {
  const [value, setValue] = useState(40)
  return (
    <ListItem
      label="Limite de lotação"
      sublabel={`Avisa abaixo de ${Math.round(value)}%`}
      trailing={{
        type: 'slider',
        value,
        onValueChange: setValue,
        min: 10,
        max: 90,
        step: 1,
        minLabel: '10%',
        midLabel: '50%',
        maxLabel: '90%',
      }}
    />
  )
}

export const WithSlider: Story = {
  render: () => <SliderStory />,
}

export const WithCustomLabelColor: Story = {
  args: {
    label: 'Sair',
    leading: { type: 'icon', icon: 'logout' },
    labelColor: '#EF4444',
    onPress: () => {},
  },
}

export const WithAvatarLeading: Story = {
  args: {
    label: 'Rafael Souza',
    sublabel: '12 check-ins este mês',
    leading: { type: 'avatar', node: <View style={{ width: 40, height: 40 }} /> },
    trailing: { type: 'chevron' },
    onPress: () => {},
  },
}

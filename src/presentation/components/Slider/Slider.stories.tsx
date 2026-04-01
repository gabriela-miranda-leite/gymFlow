import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    onValueChange: { action: 'onValueChange' },
  },
}

export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    label: 'Limite de lotação',
    sublabel: 'Avisa abaixo de 40%',
    value: 40,
    min: 10,
    max: 90,
    step: 1,
    minLabel: '10%',
    midLabel: '50%',
    maxLabel: '90%',
  },
}

export const WithoutSublabel: Story = {
  args: {
    label: 'Limite de lotação',
    value: 60,
    min: 0,
    max: 100,
    minLabel: '0%',
    midLabel: '50%',
    maxLabel: '100%',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Limite de lotação',
    sublabel: 'Avisa abaixo de 40%',
    value: 40,
    min: 10,
    max: 90,
    minLabel: '10%',
    midLabel: '50%',
    maxLabel: '90%',
    disabled: true,
  },
}

function InteractiveSlider(args: React.ComponentProps<typeof Slider>) {
  const [value, setValue] = useState(40)
  const sublabel = `Avisa abaixo de ${Math.round(value)}%`
  return <Slider {...args} value={value} sublabel={sublabel} onValueChange={setValue} />
}

export const Interactive: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    label: 'Limite de lotação',
    min: 10,
    max: 90,
    step: 1,
    minLabel: '10%',
    midLabel: '50%',
    maxLabel: '90%',
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    onValueChange: { action: 'onValueChange' },
  },
}

export default meta

type Story = StoryObj<typeof Toggle>

export const Off: Story = {
  args: {
    label: 'Horário ideal',
    sublabel: 'Entre 6h e 9h',
    value: false,
  },
}

export const On: Story = {
  args: {
    label: 'Horário ideal',
    sublabel: 'Entre 6h e 9h',
    value: true,
  },
}

export const WithoutSublabel: Story = {
  args: {
    label: 'Notificações',
    value: false,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Horário ideal',
    sublabel: 'Entre 6h e 9h',
    value: false,
    disabled: true,
  },
}

function InteractiveToggle(args: React.ComponentProps<typeof Toggle>) {
  const [value, setValue] = useState(false)
  return <Toggle {...args} value={value} onValueChange={setValue} />
}

export const Interactive: Story = {
  render: (args) => <InteractiveToggle {...args} />,
  args: {
    label: 'Horário ideal',
    sublabel: 'Entre 6h e 9h',
  },
}

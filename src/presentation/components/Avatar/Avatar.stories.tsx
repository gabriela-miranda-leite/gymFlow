import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    onCameraPress: { action: 'onCameraPress' },
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const WithInitial: Story = {
  args: {
    name: 'Rafael Souza',
    size: 'md',
  },
}

export const WithInitialLarge: Story = {
  args: {
    name: 'Rafael Souza',
    size: 'lg',
  },
}

export const WithCameraBadge: Story = {
  args: {
    name: 'Rafael Souza',
    size: 'md',
    showCameraBadge: true,
  },
}

export const WithImage: Story = {
  args: {
    name: 'Rafael Souza',
    imageUri: 'https://i.pravatar.cc/150?img=3',
    size: 'md',
  },
}

export const WithImageAndBadge: Story = {
  args: {
    name: 'Rafael Souza',
    imageUri: 'https://i.pravatar.cc/150?img=3',
    size: 'md',
    showCameraBadge: true,
  },
}

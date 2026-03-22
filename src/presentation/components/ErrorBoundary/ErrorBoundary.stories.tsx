import type { Meta, StoryObj } from '@storybook/react-native'
import type { ComponentProps } from 'react'
import { Text } from 'react-native'

import { ErrorFallbackView } from '@/presentation/components/ErrorBoundary/ErrorFallbackView'

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorFallbackView,
} satisfies Meta<typeof ErrorFallbackView>

export default meta
type Story = StoryObj<typeof meta>

export const Fallback: Story = {
  args: { onRetry: () => {} },
}

export const WithCustomFallback: Story = {
  args: { onRetry: () => {} },
  render: (args: ComponentProps<typeof ErrorFallbackView>) => (
    <Text style={{ padding: 24, textAlign: 'center' }} {...args}>
      Fallback customizado
    </Text>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-native';
import { Text } from 'react-native';

import { ErrorFallbackView } from './ErrorFallbackView';

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorFallbackView,
} satisfies Meta<typeof ErrorFallbackView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
  args: { onRetry: () => {} },
};

export const WithCustomFallback: Story = {
  args: { onRetry: () => {} },
  render: (args) => (
    <Text style={{ padding: 24, textAlign: 'center' }} {...args}>
      Fallback customizado
    </Text>
  ),
};

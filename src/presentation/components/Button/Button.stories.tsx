import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { label: 'Confirmar', variant: 'primary' } };
export const Secondary: Story = { args: { label: 'Cancelar', variant: 'secondary' } };
export const Ghost: Story = { args: { label: 'Saiba mais', variant: 'ghost' } };
export const Loading: Story = { args: { label: 'Carregando', variant: 'primary', loading: true } };
export const Disabled: Story = {
  args: { label: 'Desabilitado', variant: 'primary', disabled: true },
};

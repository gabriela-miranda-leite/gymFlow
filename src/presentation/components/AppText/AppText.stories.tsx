import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { AppText } from './AppText';

import { colors } from '@/tokens';

const meta = {
  title: 'Components/AppText',
  component: AppText,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'body', 'bodyLg', 'bodyMedium', 'caption', 'overline'],
    },
    color: {
      control: 'select',
      options: [
        colors.gray900,
        colors.gray600,
        colors.gray400,
        colors.gray300,
        colors.white,
        colors.primary,
        colors.primaryDark,
      ],
      labels: {
        [colors.gray900]: 'text.primary',
        [colors.gray600]: 'text.secondary',
        [colors.gray400]: 'text.tertiary',
        [colors.gray300]: 'text.disabled',
        [colors.white]: 'text.inverse',
        [colors.primary]: 'brand.primary',
        [colors.primaryDark]: 'brand.primaryDark',
      },
    },
  },
} satisfies Meta<typeof AppText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = { args: { variant: 'h1', children: 'Heading 1' } };
export const H2: Story = { args: { variant: 'h2', children: 'Heading 2' } };
export const H3: Story = { args: { variant: 'h3', children: 'Heading 3' } };
export const Body: Story = { args: { variant: 'body', children: 'Corpo de texto padrão' } };
export const BodyLg: Story = { args: { variant: 'bodyLg', children: 'Corpo de texto grande' } };
export const Caption: Story = { args: { variant: 'caption', children: 'Legenda' } };
export const CustomColor: Story = {
  args: { variant: 'body', color: '#FF6B35', children: 'Cor customizada' },
};

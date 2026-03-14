import { type TextProps } from 'react-native';

import { StyledText } from './AppText.styles';

import { useTheme } from '@/contexts/ThemeContext';
import { Typography } from '@/tokens';

export type AppTextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodyLg'
  | 'bodyMedium'
  | 'caption'
  | 'overline';

export interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
  color?: string;
}

export function AppText({ variant = 'body', color, style, ...props }: AppTextProps) {
  const { theme } = useTheme();

  return (
    <StyledText
      textColor={color ?? theme.text.primary}
      style={[Typography[variant], style]}
      {...props}
    />
  );
}

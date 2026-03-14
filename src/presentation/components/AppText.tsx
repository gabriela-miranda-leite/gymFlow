import { Text, type TextProps } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { Typography } from '@/tokens';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyLg' | 'bodyMedium' | 'caption' | 'overline';

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
}

export function AppText({ variant = 'body', color, style, ...props }: AppTextProps) {
  const { theme } = useTheme();

  return (
    <Text style={[Typography[variant], { color: color ?? theme.text.primary }, style]} {...props} />
  );
}

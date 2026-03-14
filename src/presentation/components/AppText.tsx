import { type TextProps } from 'react-native';
import styled from 'styled-components/native';

import { useTheme } from '@/contexts/ThemeContext';
import { Typography } from '@/tokens';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyLg' | 'bodyMedium' | 'caption' | 'overline';

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
}

const StyledText = styled.Text<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
`;

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

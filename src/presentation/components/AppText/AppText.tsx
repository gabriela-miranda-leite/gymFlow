import { StyleSheet, type TextProps } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
import { StyledText } from '@/presentation/components/AppText/AppText.styles'
import { Typography } from '@/tokens'

export type AppTextVariant =
  | 'display'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'caption'
  | 'micro'
  | 'data'

export interface AppTextProps extends TextProps {
  variant?: AppTextVariant
  color?: string
}

export function AppText({ variant = 'body', color, style, children, ...props }: AppTextProps) {
  const { theme } = useTheme()

  const resolvedStyle = { ...Typography[variant], ...StyleSheet.flatten(style) }

  return (
    <StyledText $textColor={color ?? theme.foreground} style={resolvedStyle} {...props}>
      {children}
    </StyledText>
  )
}

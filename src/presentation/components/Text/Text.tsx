import type React from 'react'
import type { TextProps as RNTextProps } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
import {
  BodyText,
  CaptionText,
  DataText,
  DisplayText,
  HeadingText,
  MicroText,
  SubheadingText,
} from '@/presentation/components/Text/Text.styles'
import type { AppTheme } from '@/tokens'

export type TextVariant = keyof typeof variantMap

const variantMap = {
  display: DisplayText,
  heading: HeadingText,
  subheading: SubheadingText,
  body: BodyText,
  caption: CaptionText,
  micro: MicroText,
  data: DataText,
} as const

type TextProps = RNTextProps & {
  variant?: TextVariant
  color?: (theme: AppTheme) => string
  children: React.ReactNode
}

export function Text({ variant = 'body', color, children, ...rest }: TextProps) {
  const { theme } = useTheme()

  const resolvedColor = color ? color(theme) : theme.foreground
  const Component = variantMap[variant]

  return (
    <Component color={resolvedColor} {...rest}>
      {children}
    </Component>
  )
}

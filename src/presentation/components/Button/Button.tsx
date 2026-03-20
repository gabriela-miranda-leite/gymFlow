import { ActivityIndicator, type TouchableOpacityProps } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'

import { Container, Label } from './Button.styles'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export interface ButtonProps extends TouchableOpacityProps {
  label: string
  variant?: ButtonVariant
  loading?: boolean
}

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const { theme } = useTheme()
  const isDisabled = disabled || loading

  const bgColor =
    variant === 'primary'
      ? theme.brand.primary
      : variant === 'secondary'
        ? theme.card
        : 'transparent'

  const textColor =
    variant === 'primary'
      ? theme.brand.primaryForeground
      : variant === 'secondary'
        ? theme.foreground
        : theme.brand.primary

  return (
    <Container
      bgColor={bgColor}
      borderColor={theme.border}
      bordered={variant === 'secondary'}
      isDisabled={!!isDisabled}
      disabled={!!isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Label textColor={textColor}>{label}</Label>
      )}
    </Container>
  )
}

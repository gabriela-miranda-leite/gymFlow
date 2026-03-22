import { useTheme } from '@/contexts/ThemeContext'
import { Wrapper } from '@/presentation/components/ButtonLink/ButtonLink.styles'
import { Text } from '@/presentation/components/Text/Text'
import type { AppIconName } from '@/presentation/components/icons/AppIcons'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import type { AppTheme } from '@/tokens'

type IconPosition = 'start' | 'end'

type ButtonLinkProps = {
  label: string
  onPress: () => void
  icon?: AppIconName
  iconPosition?: IconPosition
  disabled?: boolean
  color?: (theme: AppTheme) => string
  testID?: string
}

export function ButtonLink({
  label,
  onPress,
  icon,
  iconPosition = 'start',
  disabled = false,
  color,
  testID,
}: ButtonLinkProps) {
  const { theme } = useTheme()

  const Icon = icon ? AppIcons[icon] : null
  const resolvedColor = color ? color(theme) : theme.brand.primary

  return (
    <Wrapper
      onPress={onPress}
      disabled={disabled}
      isDisabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      testID={testID}
    >
      {Icon && iconPosition === 'start' && <Icon size={16} color={resolvedColor} />}
      <Text variant="caption" color={() => resolvedColor}>
        {label}
      </Text>
      {Icon && iconPosition === 'end' && <Icon size={16} color={resolvedColor} />}
    </Wrapper>
  )
}

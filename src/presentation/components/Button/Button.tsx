import { ActivityIndicator, Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { useTheme } from '@/contexts/ThemeContext'
import { ButtonVariant, Wrapper } from '@/presentation/components/Button/Button.styles'
import { Text } from '@/presentation/components/Text/Text'
import type { AppIconName } from '@/presentation/components/icons/AppIcons'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import { tk, useTranslation } from '@/shared/i18n'
import type { AppTheme } from '@/tokens'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type ButtonProps = {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  isLoading?: boolean
  disabled?: boolean
  textColor?: (theme: AppTheme) => string
  leftIcon?: AppIconName
  testID?: string
}

function resolveVariantColors(variant: ButtonVariant, theme: AppTheme) {
  const map = {
    [ButtonVariant.Contained]: {
      bgColor: theme.brand.primary,
      borderColor: theme.brand.primary,
      textColor: theme.brand.primaryForeground,
    },
    [ButtonVariant.Outlined]: {
      bgColor: 'transparent',
      borderColor: theme.border,
      textColor: theme.foreground,
    },
  }

  return map[variant]
}

export { ButtonVariant }

export function Button({
  label,
  onPress,
  variant = ButtonVariant.Contained,
  isLoading = false,
  disabled = false,
  textColor,
  leftIcon,
  testID,
}: ButtonProps) {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    alignSelf: 'stretch' as const,
  }))

  const handlePressIn = () => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 })
  }

  const handlePressOut = () => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1, { damping: 15, stiffness: 400 })
  }

  const isDisabled = disabled || isLoading
  const { bgColor, borderColor, textColor: defaultTextColor } = resolveVariantColors(variant, theme)
  const resolvedTextColor = textColor ? textColor(theme) : defaultTextColor

  const Icon = leftIcon ? AppIcons[leftIcon] : null

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      accessibilityHint={isLoading ? t(tk.common.loading) : undefined}
      testID={testID}
    >
      <Wrapper bgColor={bgColor} borderColor={borderColor} isDisabled={isDisabled}>
        {isLoading ? (
          <ActivityIndicator color={resolvedTextColor} />
        ) : (
          <>
            {Icon && <Icon size={20} color={resolvedTextColor} />}
            <Text variant="body" color={() => resolvedTextColor}>
              {label}
            </Text>
          </>
        )}
      </Wrapper>
    </AnimatedPressable>
  )
}

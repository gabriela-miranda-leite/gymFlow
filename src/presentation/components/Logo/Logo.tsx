import { useTheme } from '@/contexts/ThemeContext'
import {
  IconContainer,
  LogoSize,
  LogoVariant,
  Wrapper,
} from '@/presentation/components/Logo/Logo.styles'
import { Text } from '@/presentation/components/Text/Text'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import { tk, useTranslation } from '@/shared/i18n'

export { LogoVariant, LogoSize }

const sizeMap: Record<
  LogoSize,
  { container: number; icon: number; textVariant: 'heading' | 'subheading' | 'body' }
> = {
  [LogoSize.Sm]: { container: 32, icon: 18, textVariant: 'body' },
  [LogoSize.Md]: { container: 40, icon: 22, textVariant: 'subheading' },
  [LogoSize.Lg]: { container: 52, icon: 28, textVariant: 'heading' },
}

type LogoProps = {
  variant?: LogoVariant
  size?: LogoSize
}

export function Logo({ variant = LogoVariant.Full, size = LogoSize.Md }: LogoProps) {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const { container, icon, textVariant } = sizeMap[size]
  const Icon = AppIcons.logo

  if (variant === LogoVariant.Flat) {
    return (
      <Wrapper>
        <Icon size={icon} color={theme.brand.primary} />
        <Text variant={textVariant} color={(t) => t.foreground}>
          {t(tk.common.appName)}
        </Text>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <IconContainer
        size={container}
        bgColor={theme.brand.primary}
        accessible
        accessibilityRole="image"
        accessibilityLabel={t(tk.common.appName)}
      >
        <Icon size={icon} color={theme.brand.primaryForeground} />
      </IconContainer>
      {variant === LogoVariant.Full && (
        <Text variant={textVariant} color={(t) => t.foreground}>
          {t(tk.common.appName)}
        </Text>
      )}
    </Wrapper>
  )
}

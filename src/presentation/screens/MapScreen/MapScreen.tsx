import { useTheme } from '@/contexts/ThemeContext'
import { Container, PlaceholderText } from '@/presentation/screens/MapScreen/MapScreen.styles'
import { tk, useTranslation } from '@/shared/i18n'

export function MapScreen() {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Container bg={theme.background}>
      <PlaceholderText color={theme.mutedForeground}>{t(tk.map.placeholder)}</PlaceholderText>
    </Container>
  )
}

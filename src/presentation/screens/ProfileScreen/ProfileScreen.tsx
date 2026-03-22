import { useTheme } from '@/contexts/ThemeContext'
import {
  Container,
  PlaceholderText,
} from '@/presentation/screens/ProfileScreen/ProfileScreen.styles'
import { tk, useTranslation } from '@/shared/i18n'

export function ProfileScreen() {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Container bg={theme.background}>
      <PlaceholderText color={theme.mutedForeground}>{t(tk.profile.placeholder)}</PlaceholderText>
    </Container>
  )
}

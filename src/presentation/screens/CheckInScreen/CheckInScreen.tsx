import { useTheme } from '@/contexts/ThemeContext'
import {
  Container,
  PlaceholderText,
} from '@/presentation/screens/CheckInScreen/CheckInScreen.styles'
import { tk, useTranslation } from '@/shared/i18n'

export function CheckInScreen() {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Container bg={theme.background}>
      <PlaceholderText color={theme.mutedForeground}>{t(tk.checkIn.placeholder)}</PlaceholderText>
    </Container>
  )
}

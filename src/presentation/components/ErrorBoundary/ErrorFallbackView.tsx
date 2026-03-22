import { TouchableOpacity } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
import { Container, Title } from '@/presentation/components/ErrorBoundary/ErrorFallbackView.styles'
import { tk, useTranslation } from '@/shared/i18n'

interface Props {
  onRetry: () => void
}

export function ErrorFallbackView({ onRetry }: Props) {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Container accessible accessibilityRole="alert" accessibilityLabel={t(tk.errors.generic)}>
      <Title>{t(tk.errors.generic)}</Title>
      <TouchableOpacity
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel={t(tk.common.retry)}
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: theme.brand.primary,
          borderRadius: 8,
        }}
      >
        <Title style={{ color: theme.brand.primaryForeground }}>{t(tk.common.retry)}</Title>
      </TouchableOpacity>
    </Container>
  )
}

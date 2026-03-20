import { useTranslation } from '@/shared/i18n'

import { Button } from '../Button'

import { Container, Title } from './ErrorFallbackView.styles'

interface Props {
  onRetry: () => void
}

export function ErrorFallbackView({ onRetry }: Props) {
  const { t } = useTranslation()

  return (
    <Container accessible accessibilityRole="alert" accessibilityLabel={t('errors.generic')}>
      <Title>{t('errors.generic')}</Title>
      <Button label={t('common.retry')} onPress={onRetry} />
    </Container>
  )
}

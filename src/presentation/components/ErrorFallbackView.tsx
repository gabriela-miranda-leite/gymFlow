import styled from 'styled-components/native';

import { Button } from './Button';

import { useTranslation } from '@/shared/i18n';

interface Props {
  onRetry: () => void;
}

const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 24px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
`;

export function ErrorFallbackView({ onRetry }: Props) {
  const { t } = useTranslation();

  return (
    <Container accessible accessibilityRole="alert" accessibilityLabel={t('errors.generic')}>
      <Title>{t('errors.generic')}</Title>
      <Button label={t('common.retry')} onPress={onRetry} />
    </Container>
  );
}

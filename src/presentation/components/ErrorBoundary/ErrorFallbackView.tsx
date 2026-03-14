import styled from 'styled-components/native';

import { Button } from '../Button';

import { useTranslation } from '@/shared/i18n';
import { FontSize, FontWeight, Spacing } from '@/tokens';

interface Props {
  onRetry: () => void;
}

const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: ${Spacing.s6}px;
`;

const Title = styled.Text`
  font-size: ${FontSize.button}px;
  font-weight: ${FontWeight.semiBold};
  margin-bottom: ${Spacing.s4}px;
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

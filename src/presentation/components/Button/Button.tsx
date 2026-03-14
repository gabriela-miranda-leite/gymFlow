import { ActivityIndicator, type TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

import { useTheme } from '@/contexts/ThemeContext';
import { Radius, Spacing } from '@/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
}

interface ContainerProps {
  bgColor: string;
  borderColor: string;
  bordered: boolean;
  isDisabled: boolean;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-color: ${({ borderColor }) => borderColor};
  border-radius: ${Radius.btn}px;
  border-width: ${({ bordered }) => (bordered ? '1px' : '0px')};
  justify-content: center;
  min-height: 48px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  padding-horizontal: ${Spacing.s5}px;
  padding-vertical: ${Spacing.s3}px;
`;

const Label = styled.Text<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-size: 16px;
  font-weight: 600;
`;

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;

  const bgColor =
    variant === 'primary'
      ? theme.brand.primary
      : variant === 'secondary'
        ? theme.surface.primary
        : 'transparent';

  const textColor =
    variant === 'primary'
      ? theme.brand.onPrimary
      : variant === 'secondary'
        ? theme.text.primary
        : theme.brand.primary;

  return (
    <Container
      bgColor={bgColor}
      borderColor={theme.border.default}
      bordered={variant === 'secondary'}
      isDisabled={!!isDisabled}
      disabled={!!isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Label textColor={textColor}>{label}</Label>
      )}
    </Container>
  );
}

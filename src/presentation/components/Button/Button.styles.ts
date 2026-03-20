import styled from 'styled-components/native';

import { FontSize, FontWeight, Radius, Spacing } from '@/tokens';

interface ContainerProps {
  bgColor: string;
  borderColor: string;
  bordered: boolean;
  isDisabled: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-color: ${({ borderColor }) => borderColor};
  border-radius: ${Radius.md}px;
  border-width: ${({ bordered }) => (bordered ? '1px' : '0px')};
  justify-content: center;
  min-height: ${Spacing.s12}px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s5}px;
  padding-right: ${Spacing.s5}px;
  padding-top: ${Spacing.s3}px;
`;

export const Label = styled.Text<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-size: ${FontSize.subheading}px;
  font-weight: ${FontWeight.semiBold};
`;

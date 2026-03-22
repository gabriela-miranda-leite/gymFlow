import styled from 'styled-components/native'

import { Radius, Spacing } from '@/tokens'

export enum ButtonVariant {
  Contained = 'contained',
  Outlined = 'outlined',
}

interface WrapperProps {
  bgColor: string
  borderColor: string
  isDisabled: boolean
}

export const Wrapper = styled.View<WrapperProps>`
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-color: ${({ borderColor }) => borderColor};
  border-radius: ${Radius.lg}px;
  border-width: 1px;
  flex-direction: row;
  gap: ${Spacing.s2}px;
  justify-content: center;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  padding-top: ${Spacing.s3}px;
`

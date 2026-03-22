import styled from 'styled-components/native'

import { Radius, Spacing } from '@/tokens'

export enum LogoVariant {
  IconOnly = 'icon-only',
  Full = 'full',
  Flat = 'flat',
}

export enum LogoSize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
}

type IconContainerSize = { size: number }

export const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${Spacing.s2}px;
`

export const IconContainer = styled.View<IconContainerSize & { bgColor: string }>`
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: ${Radius.lg}px;
  height: ${({ size }) => size}px;
  justify-content: center;
  width: ${({ size }) => size}px;
`

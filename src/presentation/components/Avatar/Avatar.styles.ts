import styled from 'styled-components/native'

import { FontFamily, FontWeight, Spacing } from '@/tokens'

const SIZES = {
  md: 56,
  lg: 80,
} as const

export type AvatarSize = keyof typeof SIZES

export function getAvatarSize(size: AvatarSize) {
  return SIZES[size]
}

export const Container = styled.View`
  position: relative;
  align-self: flex-start;
`

export const Circle = styled.View<{ size: number; bg: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const InitialText = styled.Text<{ size: number; color: string }>`
  font-family: ${FontFamily.bold};
  font-size: ${({ size }) => Math.round(size * 0.4)}px;
  font-weight: ${FontWeight.bold};
  color: ${({ color }) => color};
`

export const AvatarImage = styled.Image<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
`

export const BadgeWrapper = styled.TouchableOpacity<{ bg: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${Spacing.s6}px;
  height: ${Spacing.s6}px;
  border-radius: ${Spacing.s3}px;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
`

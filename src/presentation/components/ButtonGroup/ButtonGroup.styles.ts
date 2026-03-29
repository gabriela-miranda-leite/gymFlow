import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Radius, Spacing } from '@/tokens'

export const Container = styled.View`
  width: 100%;
`

export const ItemWrapper = styled.TouchableOpacity<{
  bg: string
  isLast: boolean
  disabled?: boolean
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.md}px;
  padding-top: ${Spacing.s3}px;
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  margin-bottom: ${({ isLast }) => (isLast ? 0 : Spacing.s2)}px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`

export const ColorDot = styled.View<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: ${Radius.full}px;
  background-color: ${({ color }) => color};
  margin-right: ${Spacing.s3}px;
`

export const TextContainer = styled.View`
  flex: 1;
`

export const Label = styled.Text<{ color: string }>`
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.bold};
  font-family: ${FontFamily.bold};
  color: ${({ color }) => color};
`

export const Sublabel = styled.Text<{ color: string }>`
  font-size: ${FontSize.caption}px;
  font-family: ${FontFamily.regular};
  color: ${({ color }) => color};
  margin-top: ${Spacing.s1}px;
`

export const Chevron = styled.Text<{ color: string }>`
  font-size: ${FontSize.subheading}px;
  font-weight: ${FontWeight.regular};
  font-family: ${FontFamily.regular};
  color: ${({ color }) => color};
  margin-left: ${Spacing.s2}px;
`

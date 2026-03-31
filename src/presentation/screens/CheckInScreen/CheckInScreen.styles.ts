import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Spacing } from '@/tokens'
import type { AppTheme } from '@/tokens'

export const Container = styled.View<{ bg: AppTheme['background'] }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
  padding-top: ${Spacing.s8}px;
  padding-bottom: ${Spacing.s6}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const Title = styled.Text<{ color: string }>`
  font-family: ${FontFamily.bold};
  font-size: ${FontSize.heading}px;
  font-weight: ${FontWeight.bold};
  color: ${({ color }) => color};
  text-align: center;
  margin-bottom: ${Spacing.s6}px;
`

export const SelectWrapper = styled.View`
  margin-bottom: ${Spacing.s6}px;
`

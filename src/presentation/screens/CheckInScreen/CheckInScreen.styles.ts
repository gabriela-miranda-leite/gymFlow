import styled from 'styled-components/native'

import { Spacing } from '@/tokens'
import type { AppTheme } from '@/tokens'

export const Container = styled.View<{ bg: AppTheme['background'] }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ bg }) => bg};
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s4}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const PlaceholderText = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
`

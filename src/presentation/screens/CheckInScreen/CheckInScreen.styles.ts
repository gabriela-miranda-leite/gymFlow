import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Radius, Spacing } from '@/tokens'
import type { AppTheme } from '@/tokens'

export const SafeAreaWrapper = styled(SafeAreaView)<{ bg: AppTheme['background'] }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
`

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

export const CooldownBanner = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.md}px;
  padding-top: ${Spacing.s3}px;
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  margin-bottom: ${Spacing.s4}px;
  align-items: center;
`

export const CooldownText = styled.Text<{ color: string }>`
  font-family: ${FontFamily.medium};
  font-size: ${FontSize.body}px;
  color: ${({ color }) => color};
  text-align: center;
`

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
  align-items: center;
  justify-content: center;
`

export const IconWrapper = styled.View`
  margin-bottom: ${Spacing.s6}px;
  align-items: center;
`

export const Title = styled.Text<{ color: string }>`
  font-family: ${FontFamily.bold};
  font-size: ${FontSize.heading}px;
  font-weight: ${FontWeight.bold};
  color: ${({ color }) => color};
  text-align: center;
  margin-bottom: ${Spacing.s2}px;
`

export const Subtitle = styled.Text<{ color: string }>`
  font-family: ${FontFamily.regular};
  font-size: ${FontSize.body}px;
  color: ${({ color }) => color};
  text-align: center;
  margin-bottom: ${Spacing.s8}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const OccupancyRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Spacing.s2}px;
`

export const OccupancyDot = styled.View<{ color: string }>`
  width: ${Spacing.s3}px;
  height: ${Spacing.s3}px;
  border-radius: ${Radius.full}px;
  background-color: ${({ color }) => color};
  margin-right: ${Spacing.s2}px;
`

export const OccupancyLabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.medium};
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.medium};
  color: ${({ color }) => color};
`

export const GymName = styled.Text<{ color: string }>`
  font-family: ${FontFamily.regular};
  font-size: ${FontSize.body}px;
  color: ${({ color }) => color};
  text-align: center;
  margin-bottom: ${Spacing.s10}px;
`

export const ButtonWrapper = styled.View`
  align-self: stretch;
`

import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Spacing } from '@/tokens'

export const Container = styled.View`
  padding-top: ${Spacing.s3}px;
  padding-bottom: ${Spacing.s3}px;
`

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${Spacing.s1}px;
`

export const LabelGroup = styled.View`
  flex: 1;
  margin-right: ${Spacing.s4}px;
`

export const Label = styled.Text<{ color: string }>`
  font-family: ${FontFamily.medium};
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.medium};
  color: ${({ color }) => color};
`

export const Sublabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.regular};
  font-size: ${FontSize.caption}px;
  font-weight: ${FontWeight.regular};
  color: ${({ color }) => color};
  margin-top: ${Spacing.s1}px;
`

export const ValueLabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.semiBold};
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.semiBold};
  color: ${({ color }) => color};
`

export const TickRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${Spacing.s1}px;
`

export const TickLabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.regular};
  font-size: ${FontSize.caption}px;
  font-weight: ${FontWeight.regular};
  color: ${({ color }) => color};
`

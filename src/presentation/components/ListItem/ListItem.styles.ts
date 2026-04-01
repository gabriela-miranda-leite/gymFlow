import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Spacing } from '@/tokens'

export const RowPressable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s4}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const RowView = styled.View`
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const LeadingSlot = styled.View`
  width: 36px;
  align-items: center;
  justify-content: center;
  margin-right: ${Spacing.s3}px;
`

export const Indicator = styled.View<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`

export const ContentArea = styled.View`
  flex: 1;
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

export const AvatarSlot = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: ${Spacing.s3}px;
`

export const TrailingSlot = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${Spacing.s3}px;
`

export const TrailingText = styled.Text<{ color: string }>`
  font-family: ${FontFamily.medium};
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.medium};
  color: ${({ color }) => color};
  margin-right: ${Spacing.s1}px;
`

import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Radius, Spacing } from '@/tokens'

export const Content = styled.View<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s6}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const GymName = styled.Text<{ color: string }>`
  font-size: ${FontSize.heading}px;
  font-weight: ${FontWeight.bold};
  font-family: ${FontFamily.bold};
  color: ${({ color }) => color};
  margin-bottom: ${Spacing.s1}px;
`

export const Address = styled.Text<{ color: string }>`
  font-size: ${FontSize.caption}px;
  font-family: ${FontFamily.regular};
  color: ${({ color }) => color};
  margin-bottom: ${Spacing.s3}px;
`

export const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Spacing.s3}px;
  gap: ${Spacing.s4}px;
`

export const MetaItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.s1}px;
`

export const MetaText = styled.Text<{ color: string }>`
  font-size: ${FontSize.caption}px;
  font-family: ${FontFamily.medium};
  color: ${({ color }) => color};
`

export const StatusBadge = styled.View<{ bg: string }>`
  padding-top: ${Spacing.s1}px;
  padding-bottom: ${Spacing.s1}px;
  padding-left: ${Spacing.s2}px;
  padding-right: ${Spacing.s2}px;
  border-radius: ${Radius.sm}px;
  background-color: ${({ bg }) => bg};
`

export const StatusText = styled.Text<{ color: string }>`
  font-size: ${FontSize.micro}px;
  font-weight: ${FontWeight.semiBold};
  color: ${({ color }) => color};
`

export const HoursRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.s2}px;
  margin-bottom: ${Spacing.s3}px;
`

export const HoursText = styled.Text<{ color: string }>`
  font-size: ${FontSize.caption}px;
  font-family: ${FontFamily.regular};
  color: ${({ color }) => color};
`

export const TagsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${Spacing.s2}px;
  margin-bottom: ${Spacing.s4}px;
`

export const Tag = styled.View<{ bg: string }>`
  padding-top: ${Spacing.s1}px;
  padding-bottom: ${Spacing.s1}px;
  padding-left: ${Spacing.s2}px;
  padding-right: ${Spacing.s2}px;
  border-radius: ${Radius.full}px;
  background-color: ${({ bg }) => bg};
`

export const TagText = styled.Text<{ color: string }>`
  font-size: ${FontSize.micro}px;
  font-family: ${FontFamily.medium};
  color: ${({ color }) => color};
`

export const CheckInButton = styled.TouchableOpacity<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.lg}px;
  padding-top: ${Spacing.s3}px;
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  align-items: center;
`

export const CheckInText = styled.Text<{ color: string }>`
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.semiBold};
  font-family: ${FontFamily.semiBold};
  color: ${({ color }) => color};
`

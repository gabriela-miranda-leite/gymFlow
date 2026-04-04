import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Radius, Spacing } from '@/tokens'

export const Content = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s6}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${Spacing.s1}px;
`

export const GymName = styled.Text<{ color: string }>`
  flex: 1;
  font-size: ${FontSize.heading}px;
  font-weight: ${FontWeight.bold};
  font-family: ${FontFamily.bold};
  color: ${({ color }) => color};
  margin-right: ${Spacing.s2}px;
`

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.s1}px;
`

export const RatingText = styled.Text<{ color: string }>`
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.semiBold};
  font-family: ${FontFamily.semiBold};
  color: ${({ color }) => color};
`

export const ReviewCount = styled.Text<{ color: string }>`
  font-size: ${FontSize.body}px;
  font-family: ${FontFamily.regular};
  color: ${({ color }) => color};
`

export const AddressRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.s1}px;
  margin-bottom: ${Spacing.s3}px;
`

export const AddressText = styled.Text<{ color: string }>`
  font-size: ${FontSize.caption}px;
  font-family: ${FontFamily.regular};
  color: ${({ color }) => color};
  flex: 1;
`

export const TagsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${Spacing.s2}px;
  margin-bottom: ${Spacing.s3}px;
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
  font-size: ${FontSize.caption}px;
  font-family: ${FontFamily.medium};
  color: ${({ color }) => color};
`

export const InfoCardsRow = styled.View`
  flex-direction: row;
  gap: ${Spacing.s2}px;
  margin-bottom: ${Spacing.s4}px;
`

export const InfoCard = styled.View<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.lg}px;
  padding-top: ${Spacing.s3}px;
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s2}px;
  padding-right: ${Spacing.s2}px;
  align-items: center;
  gap: ${Spacing.s1}px;
`

export const InfoCardValue = styled.Text<{ color: string }>`
  font-size: ${FontSize.subheading}px;
  font-weight: ${FontWeight.bold};
  font-family: ${FontFamily.bold};
  color: ${({ color }) => color};
  text-align: center;
`

export const InfoCardLabel = styled.Text<{ color: string }>`
  font-size: ${FontSize.micro}px;
  font-family: ${FontFamily.regular};
  color: ${({ color }) => color};
  text-align: center;
`

export const OccupancyPercent = styled.Text<{ color: string }>`
  font-size: ${FontSize.heading}px;
  font-weight: ${FontWeight.bold};
  font-family: ${FontFamily.bold};
  color: ${({ color }) => color};
  text-align: center;
`

export const OccupancyLabel = styled.Text<{ color: string }>`
  font-size: ${FontSize.micro}px;
  font-weight: ${FontWeight.semiBold};
  font-family: ${FontFamily.semiBold};
  color: ${({ color }) => color};
  text-align: center;
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

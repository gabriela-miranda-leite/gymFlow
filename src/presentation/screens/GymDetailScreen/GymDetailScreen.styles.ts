import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Radius, Spacing } from '@/tokens'

// ─── Layout ────────────────────────────────────────────────────────────────

export const SafeWrapper = styled.SafeAreaView<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
`

export const ScrollContainer = styled.ScrollView<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
`

export const ContentWrapper = styled.View`
  padding-bottom: ${Spacing.s10}px;
`

// ─── Header ────────────────────────────────────────────────────────────────

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s4}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.s1}px;
`

export const BackLabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.medium};
  font-size: ${FontSize.body}px;
  color: ${({ color }) => color};
`

export const FavoriteButton = styled.TouchableOpacity`
  padding: ${Spacing.s1}px;
`

// ─── Gym info ───────────────────────────────────────────────────────────────

export const GymName = styled.Text<{ color: string }>`
  font-family: ${FontFamily.bold};
  font-size: ${FontSize.heading}px;
  color: ${({ color }) => color};
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s1}px;
`

export const AddressRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.s1}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s6}px;
`

export const AddressText = styled.Text<{ color: string }>`
  font-family: ${FontFamily.regular};
  font-size: ${FontSize.caption}px;
  color: ${({ color }) => color};
  flex: 1;
`

// ─── Info cards ─────────────────────────────────────────────────────────────

export const InfoCardsRow = styled.View`
  flex-direction: row;
  gap: ${Spacing.s3}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s6}px;
`

export const InfoCard = styled.View<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.lg}px;
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s4}px;
  padding-left: ${Spacing.s3}px;
  padding-right: ${Spacing.s3}px;
  gap: ${Spacing.s1}px;
`

export const InfoCardTitle = styled.Text<{ color: string }>`
  font-family: ${FontFamily.medium};
  font-size: ${FontSize.caption}px;
  color: ${({ color }) => color};
`

export const OccupancyPercent = styled.Text<{ color: string }>`
  font-family: ${FontFamily.bold};
  font-size: 28px;
  color: ${({ color }) => color};
`

export const OccupancyBadge = styled.View<{ bg: string }>`
  align-self: flex-start;
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.full}px;
  padding-top: ${Spacing.s1}px;
  padding-bottom: ${Spacing.s1}px;
  padding-left: ${Spacing.s2}px;
  padding-right: ${Spacing.s2}px;
`

export const OccupancyBadgeText = styled.Text<{ color: string }>`
  font-family: ${FontFamily.semiBold};
  font-size: ${FontSize.micro}px;
  color: ${({ color }) => color};
`

export const BestTimeHour = styled.Text<{ color: string }>`
  font-family: ${FontFamily.bold};
  font-size: 28px;
  color: ${({ color }) => color};
`

export const BestTimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.s1}px;
`

export const BestTimeSublabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.medium};
  font-size: ${FontSize.caption}px;
  color: ${({ color }) => color};
`

// ─── Day selector ──────────────────────────────────────────────────────────

export const DaySelectorRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s6}px;
`

export const DayPill = styled.TouchableOpacity<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.full}px;
  padding-top: ${Spacing.s1}px;
  padding-bottom: ${Spacing.s1}px;
  padding-left: ${Spacing.s2}px;
  padding-right: ${Spacing.s2}px;
  align-items: center;
  justify-content: center;
  min-width: 36px;
`

export const DayLabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.semiBold};
  font-size: ${FontSize.micro}px;
  font-weight: ${FontWeight.semiBold};
  color: ${({ color }) => color};
`

// ─── Flow chart ─────────────────────────────────────────────────────────────

export const ChartSection = styled.View`
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s6}px;
`

export const ChartTitle = styled.Text<{ color: string }>`
  font-family: ${FontFamily.semiBold};
  font-size: ${FontSize.body}px;
  color: ${({ color }) => color};
  margin-bottom: ${Spacing.s4}px;
`

export const ChartBarsRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  height: 80px;
  gap: 2px;
`

export const ChartBar = styled.View<{ color: string; heightPercent: number; opacity: number }>`
  flex: 1;
  background-color: ${({ color }) => color};
  height: ${({ heightPercent }) => Math.max(heightPercent * 0.8, 4)}px;
  border-radius: 2px;
  opacity: ${({ opacity }) => opacity};
`

export const ChartAxisRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${Spacing.s1}px;
  gap: 2px;
`

export const ChartAxisLabel = styled.Text<{ color: string; isCurrent: boolean }>`
  flex: 1;
  font-family: ${FontFamily.regular};
  font-size: 8px;
  color: ${({ color }) => color};
  text-align: center;
  font-weight: ${({ isCurrent }) => (isCurrent ? '700' : '400')};
`

export const CurrentHourDot = styled.View<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
  align-self: center;
`

// ─── Notify button ──────────────────────────────────────────────────────────

export const NotifyButton = styled.TouchableOpacity<{ bg: string }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.s2}px;
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.xl}px;
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s4}px;
  margin-left: ${Spacing.s4}px;
  margin-right: ${Spacing.s4}px;
  margin-bottom: ${Spacing.s4}px;
`

export const NotifyButtonText = styled.Text<{ color: string }>`
  font-family: ${FontFamily.semiBold};
  font-size: ${FontSize.body}px;
  color: ${({ color }) => color};
`

// ─── Footer ─────────────────────────────────────────────────────────────────

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${Spacing.s1}px;
  padding-bottom: ${Spacing.s4}px;
`

export const FooterText = styled.Text<{ color: string }>`
  font-family: ${FontFamily.regular};
  font-size: ${FontSize.caption}px;
  color: ${({ color }) => color};
`

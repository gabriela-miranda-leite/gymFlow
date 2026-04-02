import { ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Radius, Spacing } from '@/tokens'

export const SafeAreaWrapper = styled(SafeAreaView)<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
`

export const Container = styled(ScrollView)<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
`

export const PageTitle = styled.Text<{ color: string }>`
  font-family: ${FontFamily.bold};
  font-size: ${FontSize.display}px;
  font-weight: ${FontWeight.bold};
  color: ${({ color }) => color};
  text-align: center;
  margin-bottom: ${Spacing.s6}px;
`

export const ContentWrapper = styled.View<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s8}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const HeaderSection = styled.View`
  margin-bottom: ${Spacing.s6}px;
`

export const Section = styled.View`
  margin-bottom: ${Spacing.s6}px;
`

export const SectionLabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.semiBold};
  font-size: ${FontSize.caption}px;
  font-weight: ${FontWeight.semiBold};
  color: ${({ color }) => color};
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: ${Spacing.s2}px;
  padding-left: ${Spacing.s1}px;
`

export const Card = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.lg}px;
  overflow: hidden;
`

export const Separator = styled.View<{ color: string }>`
  height: 1px;
  background-color: ${({ color }) => color};
  margin-left: ${Spacing.s4}px;
`

export const StandaloneCard = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.lg}px;
  overflow: hidden;
  margin-bottom: ${Spacing.s3}px;
`

export const ActionRow = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s4}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  gap: ${Spacing.s3}px;
`

export const ActionLabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.medium};
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.medium};
  color: ${({ color }) => color};
`

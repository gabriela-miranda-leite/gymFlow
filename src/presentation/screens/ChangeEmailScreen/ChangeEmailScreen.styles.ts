import { ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Spacing, Radius } from '@/tokens'

export const SafeAreaWrapper = styled(SafeAreaView)<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
`
export const Container = styled(ScrollView)<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
`
export const ContentWrapper = styled.View<{ bg: string }>`
  flex: 1;
  background-color: ${({ bg }) => bg};
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s8}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`
export const BackButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: ${Spacing.s1}px;
  margin-bottom: ${Spacing.s4}px;
  align-self: flex-start;
`

export const BackLabel = styled.Text<{ color: string }>`
  font-family: ${FontFamily.regular};
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.regular};
  color: ${({ color }) => color};
`
export const PageTitle = styled.Text<{ color: string }>`
  font-family: ${FontFamily.bold};
  font-size: ${FontSize.display}px;
  font-weight: ${FontWeight.bold};
  color: ${({ color }) => color};
  margin-bottom: ${Spacing.s6}px;
`
export const CurrentEmailRow = styled.Text<{ color: string }>`
  font-family: ${FontFamily.regular};
  font-size: ${FontSize.body}px;
  font-weight: ${FontWeight.regular};
  color: ${({ color }) => color};
  margin-bottom: ${Spacing.s6}px;
`

export const CurrentEmailBold = styled.Text<{ color: string }>`
  font-family: ${FontFamily.regular};
  font-weight: ${FontWeight.medium};
  color: ${({ color }) => color};
`

export const FieldsWrapper = styled.View`
  gap: ${Spacing.s4}px;
  margin-bottom: ${Spacing.s8}px;
`

export const ButtonWrapper = styled.View`
  border-radius: ${Radius.lg}px;
  overflow: hidden;
`

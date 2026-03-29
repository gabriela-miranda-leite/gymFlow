import styled from 'styled-components/native'

import { FontFamily, FontSize, FontWeight, Radius, Shadows, Spacing } from '@/tokens'

export const TriggerWrapper = styled.TouchableOpacity<{
  bg: string
  borderColor: string
  isOpen: boolean
  disabled?: boolean
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.md}px;
  border-width: 1.5px;
  border-color: ${({ isOpen, borderColor, bg }) => (isOpen ? borderColor : bg)};
  padding-top: ${Spacing.s3}px;
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`

export const TriggerLabel = styled.Text<{ color: string }>`
  flex: 1;
  font-size: ${FontSize.body}px;
  font-family: ${FontFamily.regular};
  font-weight: ${FontWeight.regular};
  color: ${({ color }) => color};
  margin-left: ${Spacing.s2}px;
  margin-right: ${Spacing.s2}px;
`

export const ListContainer = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.lg}px;
  padding-top: ${Spacing.s2}px;
  padding-bottom: ${Spacing.s2}px;
  overflow: hidden;
  ${Shadows.md}
`

export const OptionItem = styled.TouchableOpacity<{
  selectedBg: string
  isSelected: boolean
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ isSelected, selectedBg }) => (isSelected ? selectedBg : 'transparent')};
  padding-top: ${Spacing.s3}px;
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
`

export const OptionIconWrapper = styled.View`
  margin-right: ${Spacing.s3}px;
`

export const OptionTextContainer = styled.View`
  flex: 1;
`

export const OptionLabel = styled.Text<{ color: string }>`
  font-size: ${FontSize.body}px;
  font-family: ${FontFamily.bold};
  font-weight: ${FontWeight.bold};
  color: ${({ color }) => color};
`

export const OptionSublabel = styled.Text<{ color: string }>`
  font-size: ${FontSize.caption}px;
  font-family: ${FontFamily.regular};
  font-weight: ${FontWeight.regular};
  color: ${({ color }) => color};
  margin-top: ${Spacing.s1}px;
`

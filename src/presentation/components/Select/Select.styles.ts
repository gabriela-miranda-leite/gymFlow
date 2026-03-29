import styled from 'styled-components/native'

import { FontFamily, FontSize, Radius, Shadows, Spacing } from '@/tokens'

export const TriggerWrapper = styled.TouchableOpacity<{
  borderColor: string
  isOpen: boolean
  disabled?: boolean
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${Radius.md}px;
  border-width: 1px;
  border-color: ${({ isOpen, borderColor }) => (isOpen ? borderColor : 'transparent')};
  padding-top: ${Spacing.s3}px;
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s4}px;
  padding-right: ${Spacing.s4}px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`

export const TriggerLabel = styled.Text<{ color: string }>`
  font-size: ${FontSize.body}px;
  font-family: ${FontFamily.regular};
  color: ${({ color }) => color};
  margin-left: ${Spacing.s2}px;
  margin-right: ${Spacing.s1}px;
`

export const ListContainer = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  border-radius: ${Radius.lg}px;
  padding-top: ${Spacing.s2}px;
  padding-bottom: ${Spacing.s2}px;
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
  font-family: ${FontFamily.semiBold};
  color: ${({ color }) => color};
`

export const OptionSublabel = styled.Text<{ color: string }>`
  font-size: ${FontSize.caption}px;
  font-family: ${FontFamily.regular};
  color: ${({ color }) => color};
  margin-top: ${Spacing.s1}px;
`

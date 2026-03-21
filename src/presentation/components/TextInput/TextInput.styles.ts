import styled from 'styled-components/native'

import { FontFamily, FontSize, Radius, Spacing } from '@/tokens'

export const Container = styled.View`
  gap: ${Spacing.s1}px;
`

export const InputRow = styled.View<{ borderColor: string; bgColor: string }>`
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-color: ${({ borderColor }) => borderColor};
  border-radius: ${Radius.lg}px;
  border-width: 1px;
  flex-direction: row;
  padding-bottom: ${Spacing.s3}px;
  padding-left: ${Spacing.s3}px;
  padding-right: ${Spacing.s3}px;
  padding-top: ${Spacing.s3}px;
`

export const StyledInput = styled.TextInput<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  flex: 1;
  font-family: ${FontFamily.regular};
  font-size: ${FontSize.body}px;
`

export const ErrorRow = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${Spacing.s1}px;
`

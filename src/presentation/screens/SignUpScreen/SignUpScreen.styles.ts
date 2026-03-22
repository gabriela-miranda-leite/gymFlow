import styled from 'styled-components/native'

import { Spacing } from '@/tokens'

export const Header = styled.View`
  gap: ${Spacing.s1}px;
  margin-bottom: ${Spacing.s6}px;
  margin-top: ${Spacing.s8}px;
`

export const SocialButtons = styled.View`
  gap: ${Spacing.s3}px;
`

export const FormFields = styled.View`
  gap: ${Spacing.s4}px;
  margin-bottom: ${Spacing.s4}px;
`

export const Footer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: auto;
  padding-top: ${Spacing.s6}px;
`

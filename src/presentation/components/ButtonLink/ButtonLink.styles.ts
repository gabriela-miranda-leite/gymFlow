import styled from 'styled-components/native'

import { Spacing } from '@/tokens'

type WrapperProps = {
  isDisabled: boolean
}

export const Wrapper = styled.Pressable<WrapperProps>`
  align-items: center;
  flex-direction: row;
  gap: ${Spacing.s1}px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  padding-bottom: ${Spacing.s1}px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: ${Spacing.s1}px;
`

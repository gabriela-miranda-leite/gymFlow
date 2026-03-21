import styled from 'styled-components/native'

import { Spacing } from '@/tokens'

export const Container = styled.ScrollView<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  flex: 1;
`

export const Content = styled.View`
  flex-grow: 1;
  padding-bottom: ${Spacing.s8}px;
  padding-left: ${Spacing.s5}px;
  padding-right: ${Spacing.s5}px;
  padding-top: ${Spacing.s6}px;
`

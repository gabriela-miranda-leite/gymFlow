import styled from 'styled-components/native'

import { Radius, Spacing } from '@/tokens'

export const MarkerContainer = styled.TouchableOpacity<{
  bg: string
  borderColor: string
}>`
  width: 40px;
  height: 40px;
  border-radius: ${Radius.full}px;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${({ borderColor }) => borderColor};
  padding-top: ${Spacing.s1}px;
  padding-bottom: ${Spacing.s1}px;
  padding-left: ${Spacing.s1}px;
  padding-right: ${Spacing.s1}px;
`

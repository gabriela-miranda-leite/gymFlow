import styled from 'styled-components/native'

import { Radius, Spacing } from '@/tokens'

export const MarkerContainer = styled.TouchableOpacity<{ bg: string; isActive: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${Radius.full}px;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
  border-width: ${({ isActive }) => (isActive ? 0 : 2)}px;
  border-color: ${({ bg }) => bg};
  padding-top: ${Spacing.s1}px;
  padding-bottom: ${Spacing.s1}px;
  padding-left: ${Spacing.s1}px;
  padding-right: ${Spacing.s1}px;
`

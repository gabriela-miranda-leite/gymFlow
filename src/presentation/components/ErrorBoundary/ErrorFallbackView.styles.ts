import styled from 'styled-components/native'

import { FontSize, FontWeight, Spacing } from '@/tokens'

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: ${Spacing.s6}px;
`

export const Title = styled.Text`
  font-size: ${FontSize.subheading}px;
  font-weight: ${FontWeight.semiBold};
  margin-bottom: ${Spacing.s4}px;
  text-align: center;
`

import styled from 'styled-components/native'

import { Spacing } from '@/tokens'

export const Row = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${Spacing.s3}px;
`

export const Line = styled.View<{ color: string }>`
  background-color: ${({ color }) => color};
  flex: 1;
  height: 1px;
`

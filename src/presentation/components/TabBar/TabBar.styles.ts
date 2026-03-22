import styled from 'styled-components/native'

import { Spacing } from '@/tokens'

export const Bar = styled.View<{ bg: string; border: string }>`
  flex-direction: row;
  background-color: ${({ bg }) => bg};
  border-top-width: 1px;
  border-top-color: ${({ border }) => border};
`

export const TabItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding-top: ${Spacing.s3}px;
  padding-bottom: ${Spacing.s3}px;
`

export const ActiveIndicator = styled.View<{ color: string }>`
  position: absolute;
  top: 0;
  left: 24px;
  right: 24px;
  height: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: ${({ color }) => color};
`

export const TabLabel = styled.Text<{ color: string }>`
  font-size: 10px;
  margin-top: ${Spacing.s1}px;
  color: ${({ color }) => color};
`

import type { FlexStyle } from 'react-native'
import styled from 'styled-components/native'

export enum StackDirection {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

type ContainerProps = {
  direction: StackDirection
  spacing: number
  align?: FlexStyle['alignItems']
  justify?: FlexStyle['justifyContent']
  flex?: number
  wrap?: boolean
  paddingVertical?: number
  paddingHorizontal?: number
}

export const Container = styled.View<ContainerProps>`
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'row' : 'column')};
  gap: ${({ spacing }) => spacing}px;
  ${({ align }) => (align ? `align-items: ${align};` : '')}
  ${({ justify }) => (justify ? `justify-content: ${justify};` : '')}
  ${({ flex }) => (flex !== undefined ? `flex: ${flex};` : '')}
  ${({ wrap }) => (wrap ? 'flex-wrap: wrap;' : '')}
  ${({ paddingVertical }) =>
    paddingVertical
      ? `padding-top: ${paddingVertical}px; padding-bottom: ${paddingVertical}px;`
      : ''}
  ${({ paddingHorizontal }) =>
    paddingHorizontal
      ? `padding-left: ${paddingHorizontal}px; padding-right: ${paddingHorizontal}px;`
      : ''}
`

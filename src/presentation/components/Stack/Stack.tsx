import type React from 'react'
import type { FlexStyle, ViewProps } from 'react-native'

import { Container, StackDirection } from '@/presentation/components/Stack/Stack.styles'

export { StackDirection }

type StackProps = {
  children: React.ReactNode
  direction?: StackDirection
  spacing?: number
  align?: FlexStyle['alignItems']
  justify?: FlexStyle['justifyContent']
  flex?: number
  wrap?: boolean
  paddingVertical?: number
  paddingHorizontal?: number
  testID?: ViewProps['testID']
}

export function Stack({
  children,
  direction = StackDirection.Vertical,
  spacing = 0,
  align,
  justify,
  flex,
  wrap,
  paddingVertical,
  paddingHorizontal,
  testID,
}: StackProps) {
  return (
    <Container
      direction={direction}
      spacing={spacing}
      align={align}
      justify={justify}
      flex={flex}
      wrap={wrap}
      paddingVertical={paddingVertical}
      paddingHorizontal={paddingHorizontal}
      testID={testID}
    >
      {children}
    </Container>
  )
}

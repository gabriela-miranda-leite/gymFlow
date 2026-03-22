import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'

import { Stack, StackDirection } from '@/presentation/components/Stack/Stack'

describe('Stack', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Stack>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Stack>,
    )

    expect(getByText('Item 1')).toBeTruthy()
    expect(getByText('Item 2')).toBeTruthy()
  })

  it('renders vertical by default', () => {
    const { getByTestId } = render(
      <Stack testID="stack">
        <Text>Item</Text>
      </Stack>,
    )

    expect(getByTestId('stack').props.style).toMatchObject(
      expect.objectContaining({ flexDirection: 'column' }),
    )
  })

  it('renders horizontal when direction is horizontal', () => {
    const { getByTestId } = render(
      <Stack direction={StackDirection.Horizontal} testID="stack">
        <Text>Item</Text>
      </Stack>,
    )

    expect(getByTestId('stack').props.style).toMatchObject(
      expect.objectContaining({ flexDirection: 'row' }),
    )
  })
})

import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'

import { AppBottomSheet } from '@/presentation/components/AppBottomSheet/AppBottomSheet'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      card: '#FFFFFF',
      mutedForeground: '#71717A',
    },
  }),
}))

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react')
  const { View } = require('react-native')
  const BottomSheet = React.forwardRef(
    (
      { children }: { children?: React.ReactNode },
      ref: React.Ref<{ expand: () => void; close: () => void }>,
    ) => {
      React.useImperativeHandle(ref, () => ({ expand: jest.fn(), close: jest.fn() }))
      return React.createElement(View, { testID: 'app-bottom-sheet' }, children)
    },
  )
  BottomSheet.displayName = 'BottomSheet'
  const BottomSheetView = ({ children }: { children?: React.ReactNode }) =>
    React.createElement(View, {}, children)
  return { __esModule: true, default: BottomSheet, BottomSheetView }
})

describe('AppBottomSheet', () => {
  it('renders children inside the sheet', () => {
    const ref = React.createRef<React.ComponentRef<typeof import('@gorhom/bottom-sheet').default>>()
    const { getByText } = render(
      <AppBottomSheet ref={ref} onDismiss={jest.fn()}>
        <Text>Conteúdo do sheet</Text>
      </AppBottomSheet>,
    )
    expect(getByText('Conteúdo do sheet')).toBeTruthy()
  })

  it('renders the bottom sheet container', () => {
    const ref = React.createRef<React.ComponentRef<typeof import('@gorhom/bottom-sheet').default>>()
    const { getByTestId } = render(
      <AppBottomSheet ref={ref} onDismiss={jest.fn()}>
        <Text>Conteúdo</Text>
      </AppBottomSheet>,
    )
    expect(getByTestId('app-bottom-sheet')).toBeTruthy()
  })
})

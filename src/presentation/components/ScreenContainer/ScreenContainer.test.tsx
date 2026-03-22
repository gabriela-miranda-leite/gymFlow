import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'

import { ScreenContainer } from '@/presentation/components/ScreenContainer/ScreenContainer'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: { background: '#FFFFFF' },
  }),
}))

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('ScreenContainer', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ScreenContainer>
        <Text>Conteúdo</Text>
      </ScreenContainer>,
    )

    expect(getByText('Conteúdo')).toBeTruthy()
  })

  it('renders with scrollable disabled', () => {
    const { getByText } = render(
      <ScreenContainer scrollable={false}>
        <Text>Conteúdo</Text>
      </ScreenContainer>,
    )

    expect(getByText('Conteúdo')).toBeTruthy()
  })
})

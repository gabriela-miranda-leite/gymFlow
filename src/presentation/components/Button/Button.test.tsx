import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { Button } from './Button'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      brand: { primary: '#FF6B00', primaryForeground: '#FFFFFF' },
      card: '#FFFFFF',
      foreground: '#111111',
      border: '#E4E4E7',
    },
    isDark: false,
  }),
}))

describe('Button', () => {
  it('renders label', () => {
    const { getByText } = render(<Button label="Confirmar" />)

    expect(getByText('Confirmar')).toBeTruthy()
  })

  it('calls onPress when tapped', () => {
    const onPress = jest.fn()
    const { getByRole } = render(<Button label="Salvar" onPress={onPress} />)

    fireEvent.press(getByRole('button'))

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn()
    const { getByRole } = render(<Button label="Salvar" disabled onPress={onPress} />)

    fireEvent.press(getByRole('button'))

    expect(onPress).not.toHaveBeenCalled()
  })

  it('shows ActivityIndicator when loading', () => {
    const { queryByText, getByRole } = render(<Button label="Salvar" loading />)

    expect(queryByText('Salvar')).toBeNull()
    expect(getByRole('button')).toBeTruthy()
  })
})

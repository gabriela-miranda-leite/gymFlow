import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { Button } from '@/presentation/components/Button/Button'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      brand: { primary: '#FF6B00', primaryForeground: '#FFFFFF' },
    },
  }),
}))

describe('Button', () => {
  it('renders label', () => {
    const { getByText } = render(<Button label="Entrar" onPress={() => {}} />)

    expect(getByText('Entrar')).toBeTruthy()
  })

  it('calls onPress when tapped', () => {
    const onPress = jest.fn()
    const { getByRole } = render(<Button label="Entrar" onPress={onPress} />)

    fireEvent.press(getByRole('button'))

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('shows loading indicator and hides label when isLoading', () => {
    const { queryByText, getByTestId } = render(
      <Button label="Entrar" onPress={() => {}} isLoading />,
    )

    expect(queryByText('Entrar')).toBeNull()
    expect(getByTestId('activity-indicator')).toBeTruthy()
  })

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn()
    const { getByRole } = render(<Button label="Entrar" onPress={onPress} disabled />)

    fireEvent.press(getByRole('button'))

    expect(onPress).not.toHaveBeenCalled()
  })
})

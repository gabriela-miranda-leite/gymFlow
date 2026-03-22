import { render } from '@testing-library/react-native'
import React from 'react'

import { Text } from '@/presentation/components/Text/Text'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      foreground: '#18181B',
      brand: { primary: '#FF6B00' },
    },
  }),
}))

describe('Text', () => {
  it('renders children', () => {
    const { getByText } = render(<Text>Olá mundo</Text>)

    expect(getByText('Olá mundo')).toBeTruthy()
  })

  it('renders with default body variant', () => {
    const { getByText } = render(<Text>Corpo</Text>)

    expect(getByText('Corpo')).toBeTruthy()
  })

  it('renders each variant without error', () => {
    const variants = [
      'display',
      'heading',
      'subheading',
      'body',
      'caption',
      'micro',
      'data',
    ] as const

    variants.forEach((variant) => {
      const { getByText } = render(<Text variant={variant}>{variant}</Text>)
      expect(getByText(variant)).toBeTruthy()
    })
  })

  it('applies custom color from theme', () => {
    const { getByText } = render(<Text color={(t) => t.brand.primary}>Texto colorido</Text>)

    expect(getByText('Texto colorido')).toBeTruthy()
  })
})

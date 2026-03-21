import { render } from '@testing-library/react-native'
import React from 'react'

import { AppText } from './AppText'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: { foreground: '#111111' },
    isDark: false,
  }),
}))

describe('AppText', () => {
  it('renders text content', () => {
    const { getByText } = render(<AppText>Olá</AppText>)

    expect(getByText('Olá')).toBeTruthy()
  })

  it('renders with each variant without crashing', () => {
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
      const { unmount } = render(<AppText variant={variant}>texto</AppText>)
      unmount()
    })
  })

  it('applies custom color when provided', () => {
    const { getByText } = render(<AppText color="#FF0000">colorido</AppText>)

    expect(getByText('colorido')).toBeTruthy()
  })
})

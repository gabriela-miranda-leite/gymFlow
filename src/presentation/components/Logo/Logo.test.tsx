import { render } from '@testing-library/react-native'
import React from 'react'

import { Logo, LogoSize, LogoVariant } from '@/presentation/components/Logo/Logo'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      foreground: '#18181B',
      brand: { primary: '#FF6B00', primaryForeground: '#FFFFFF' },
    },
  }),
}))

describe('Logo', () => {
  it('renders app name when variant is Full', () => {
    const { getByText } = render(<Logo variant={LogoVariant.Full} />)

    expect(getByText('common.appName')).toBeTruthy()
  })

  it('does not render app name when variant is IconOnly', () => {
    const { queryByText } = render(<Logo variant={LogoVariant.IconOnly} />)

    expect(queryByText('common.appName')).toBeNull()
  })

  it('renders app name without icon container when variant is Flat', () => {
    const { getByText, queryByRole } = render(<Logo variant={LogoVariant.Flat} />)

    expect(getByText('common.appName')).toBeTruthy()
    expect(queryByRole('image')).toBeNull()
  })

  it('renders with default props', () => {
    const { getByText } = render(<Logo />)

    expect(getByText('common.appName')).toBeTruthy()
  })

  it('renders all sizes without error', () => {
    const sizes = Object.values(LogoSize)

    sizes.forEach((size) => {
      const { unmount } = render(<Logo size={size} />)
      unmount()
    })
  })
})

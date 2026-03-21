import { render } from '@testing-library/react-native'
import React from 'react'

import { Divider } from '@/presentation/components/Divider/Divider'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      border: '#E4E4E7',
      mutedForeground: '#A1A1AA',
    },
  }),
}))

describe('Divider', () => {
  it('renders without label', () => {
    const { queryByText } = render(<Divider />)

    expect(queryByText(/.+/)).toBeNull()
  })

  it('renders label when provided', () => {
    const { getByText } = render(<Divider label="ou" />)

    expect(getByText('ou')).toBeTruthy()
  })

  it('does not render label text when label is empty string', () => {
    const { queryByText } = render(<Divider label="" />)

    expect(queryByText(/.+/)).toBeNull()
  })

  it('is hidden from accessibility tree', () => {
    const { queryByRole } = render(<Divider label="ou" />)

    expect(queryByRole('none')).toBeNull()
    expect(queryByRole('separator')).toBeNull()
  })
})

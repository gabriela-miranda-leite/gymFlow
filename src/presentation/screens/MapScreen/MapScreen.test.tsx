import { render } from '@testing-library/react-native'
import React from 'react'

import { MapScreen } from '@/presentation/screens/MapScreen/MapScreen'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: { background: '#FFFFFF', mutedForeground: '#71717A' },
  }),
}))

describe('MapScreen', () => {
  it('renders the placeholder text', () => {
    const { getByText } = render(<MapScreen />)

    expect(getByText('map.placeholder')).toBeTruthy()
  })
})

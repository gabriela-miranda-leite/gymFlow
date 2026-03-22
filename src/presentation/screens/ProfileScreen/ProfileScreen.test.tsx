import { render } from '@testing-library/react-native'
import React from 'react'

import { ProfileScreen } from '@/presentation/screens/ProfileScreen/ProfileScreen'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: { background: '#FFFFFF', mutedForeground: '#71717A' },
  }),
}))

describe('ProfileScreen', () => {
  it('renders the placeholder text', () => {
    const { getByText } = render(<ProfileScreen />)

    expect(getByText('profile.placeholder')).toBeTruthy()
  })
})

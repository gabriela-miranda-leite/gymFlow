import { render } from '@testing-library/react-native'
import React from 'react'

import { CheckInScreen } from '@/presentation/screens/CheckInScreen/CheckInScreen'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: { background: '#FFFFFF', mutedForeground: '#71717A' },
  }),
}))

describe('CheckInScreen', () => {
  it('renders the placeholder text', () => {
    const { getByText } = render(<CheckInScreen />)

    expect(getByText('checkIn.placeholder')).toBeTruthy()
  })
})

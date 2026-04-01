import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { Toggle } from '@/presentation/components/Toggle'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      foreground: '#18181B',
      mutedForeground: '#A1A1AA',
      secondary: '#F0F0F2',
      brand: { primary: '#FF6A00' },
    },
  }),
}))

const LABEL = 'Horário ideal'
const SUBLABEL = 'Entre 6h e 9h'

describe('Toggle', () => {
  it('renders the label', () => {
    const { getByText } = render(<Toggle label={LABEL} value={false} onValueChange={() => {}} />)

    expect(getByText(LABEL)).toBeTruthy()
  })

  it('renders the sublabel when provided', () => {
    const { getByText } = render(
      <Toggle label={LABEL} sublabel={SUBLABEL} value={false} onValueChange={() => {}} />,
    )

    expect(getByText(SUBLABEL)).toBeTruthy()
  })

  it('does not render sublabel when not provided', () => {
    const { queryByText } = render(<Toggle label={LABEL} value={false} onValueChange={() => {}} />)

    expect(queryByText(SUBLABEL)).toBeNull()
  })

  it('calls onValueChange with toggled value when pressed', () => {
    const onValueChange = jest.fn()
    const { getByRole } = render(
      <Toggle label={LABEL} value={false} onValueChange={onValueChange} />,
    )

    fireEvent(getByRole('switch'), 'valueChange', true)

    expect(onValueChange).toHaveBeenCalledWith(true)
  })

  it('reflects the value prop on the switch', () => {
    const { getByRole } = render(<Toggle label={LABEL} value={true} onValueChange={() => {}} />)

    expect(getByRole('switch').props.value).toBe(true)
  })

  it('sets accessibilityState checked correctly', () => {
    const { getByRole } = render(<Toggle label={LABEL} value={true} onValueChange={() => {}} />)

    expect(getByRole('switch').props.accessibilityState.checked).toBe(true)
  })

  it('sets accessibilityState disabled when disabled', () => {
    const { getByRole } = render(
      <Toggle label={LABEL} value={false} onValueChange={() => {}} disabled />,
    )

    expect(getByRole('switch').props.accessibilityState.disabled).toBe(true)
  })

  it('renders with testID on the row', () => {
    const { getByTestId } = render(
      <Toggle label={LABEL} value={false} onValueChange={() => {}} testID="toggle-ideal" />,
    )

    expect(getByTestId('toggle-ideal')).toBeTruthy()
  })

  it('renders switch with derived testID', () => {
    const { getByTestId } = render(
      <Toggle label={LABEL} value={false} onValueChange={() => {}} testID="toggle-ideal" />,
    )

    expect(getByTestId('toggle-ideal-switch')).toBeTruthy()
  })
})

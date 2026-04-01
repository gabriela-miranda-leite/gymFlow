import { render } from '@testing-library/react-native'
import React from 'react'

import { Slider } from '@/presentation/components/Slider'

jest.mock('@react-native-community/slider', () => {
  const { View } = require('react-native')
  return {
    __esModule: true,
    default: ({
      testID,
      accessibilityRole,
      accessibilityLabel,
      accessibilityState,
      accessibilityValue,
    }: {
      testID?: string
      accessibilityRole?: string
      accessibilityLabel?: string
      accessibilityState?: object
      accessibilityValue?: object
    }) => (
      <View
        testID={testID}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
        accessibilityValue={accessibilityValue}
        accessible
      />
    ),
  }
})

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

const LABEL = 'Limite de lotação'
const SUBLABEL = 'Avisa abaixo de 40%'

describe('Slider', () => {
  it('renders the label', () => {
    const { getByText } = render(<Slider label={LABEL} value={40} onValueChange={() => {}} />)

    expect(getByText(LABEL)).toBeTruthy()
  })

  it('renders the sublabel when provided', () => {
    const { getByText } = render(
      <Slider label={LABEL} sublabel={SUBLABEL} value={40} onValueChange={() => {}} />,
    )

    expect(getByText(SUBLABEL)).toBeTruthy()
  })

  it('does not render sublabel when not provided', () => {
    const { queryByText } = render(<Slider label={LABEL} value={40} onValueChange={() => {}} />)

    expect(queryByText(SUBLABEL)).toBeNull()
  })

  it('renders the current value as percentage', () => {
    const { getByText } = render(<Slider label={LABEL} value={40} onValueChange={() => {}} />)

    expect(getByText('40%')).toBeTruthy()
  })

  it('rounds the displayed value', () => {
    const { getByText } = render(<Slider label={LABEL} value={40.7} onValueChange={() => {}} />)

    expect(getByText('41%')).toBeTruthy()
  })

  it('renders tick labels when provided', () => {
    const { getByText } = render(
      <Slider
        label={LABEL}
        value={40}
        onValueChange={() => {}}
        minLabel="10%"
        midLabel="50%"
        maxLabel="90%"
      />,
    )

    expect(getByText('10%')).toBeTruthy()
    expect(getByText('50%')).toBeTruthy()
    expect(getByText('90%')).toBeTruthy()
  })

  it('does not render tick row when no labels provided', () => {
    const { queryByTestId } = render(
      <Slider label={LABEL} value={40} onValueChange={() => {}} testID="slider-lotacao" />,
    )

    expect(queryByTestId('slider-lotacao-ticks')).toBeNull()
  })

  it('renders tick row when at least one label is provided', () => {
    const { getByTestId } = render(
      <Slider
        label={LABEL}
        value={40}
        onValueChange={() => {}}
        minLabel="10%"
        testID="slider-lotacao"
      />,
    )

    expect(getByTestId('slider-lotacao-ticks')).toBeTruthy()
  })

  it('renders with testID on the container', () => {
    const { getByTestId } = render(
      <Slider label={LABEL} value={40} onValueChange={() => {}} testID="slider-lotacao" />,
    )

    expect(getByTestId('slider-lotacao')).toBeTruthy()
  })

  it('renders slider with derived testID', () => {
    const { getByTestId } = render(
      <Slider label={LABEL} value={40} onValueChange={() => {}} testID="slider-lotacao" />,
    )

    expect(getByTestId('slider-lotacao-slider')).toBeTruthy()
  })

  it('sets accessibilityRole adjustable on the slider', () => {
    const { getByRole } = render(<Slider label={LABEL} value={40} onValueChange={() => {}} />)

    expect(getByRole('adjustable')).toBeTruthy()
  })

  it('sets accessibilityState disabled when disabled', () => {
    const { getByRole } = render(
      <Slider label={LABEL} value={40} onValueChange={() => {}} disabled />,
    )

    expect(getByRole('adjustable').props.accessibilityState.disabled).toBe(true)
  })

  it('sets accessibilityValue with min, max, and current value', () => {
    const { getByRole } = render(
      <Slider label={LABEL} value={40} onValueChange={() => {}} min={10} max={90} />,
    )

    const slider = getByRole('adjustable')
    expect(slider.props.accessibilityValue.min).toBe(10)
    expect(slider.props.accessibilityValue.max).toBe(90)
    expect(slider.props.accessibilityValue.now).toBe(40)
  })
})

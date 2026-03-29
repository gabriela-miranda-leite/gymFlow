import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { Select } from '@/presentation/components/Select/Select'
import type { SelectOption } from '@/presentation/components/Select/Select'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      card: '#2A2A2E',
      foreground: '#FFFFFF',
      mutedForeground: '#8A8A8E',
      brand: { primary: '#FF6B00', primaryForeground: '#FFFFFF' },
    },
  }),
}))

jest.mock('@/presentation/components/icons/AppIcons', () => {
  const MockIcon = () => null
  return {
    AppIcons: {
      location: MockIcon,
      navChevronDown: MockIcon,
    },
  }
})

const OPTIONS: SelectOption[] = [
  { value: 'smart-vila', label: 'SmartFit Vila Mariana', sublabel: 'R. Domingos de Morais, 800' },
  { value: 'smart-pinheiros', label: 'SmartFit Pinheiros', sublabel: 'R. dos Pinheiros, 473' },
  { value: 'bio-paulista', label: 'Bio Ritmo Paulista', sublabel: 'Av. Paulista, 1234' },
]

describe('Select', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Select options={OPTIONS} onChange={() => {}} />)
    expect(toJSON()).toBeTruthy()
  })

  it('renders the placeholder when no value is provided', () => {
    const { getByText } = render(
      <Select options={OPTIONS} onChange={() => {}} placeholder="Selecionar academia" />,
    )
    expect(getByText('Selecionar academia')).toBeTruthy()
  })

  it('renders the selected option label when value is provided', () => {
    const { getByText } = render(
      <Select options={OPTIONS} value="smart-pinheiros" onChange={() => {}} />,
    )
    expect(getByText('SmartFit Pinheiros')).toBeTruthy()
  })

  it('opens the list when the trigger is pressed', () => {
    const { getByRole, getAllByRole } = render(<Select options={OPTIONS} onChange={() => {}} />)

    fireEvent.press(getByRole('combobox'))

    const optionItems = getAllByRole('radio')
    expect(optionItems).toHaveLength(OPTIONS.length)
  })

  it('closes the list and calls onChange when an option is selected', () => {
    const onChange = jest.fn()
    const { getByRole, getByText } = render(<Select options={OPTIONS} onChange={onChange} />)

    fireEvent.press(getByRole('combobox'))
    fireEvent.press(getByText('Bio Ritmo Paulista'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('bio-paulista')
  })

  it('calls onChange with the correct value for each option', () => {
    const onChange = jest.fn()
    const { getByRole, getByText } = render(<Select options={OPTIONS} onChange={onChange} />)

    fireEvent.press(getByRole('combobox'))
    fireEvent.press(getByText('SmartFit Vila Mariana'))

    expect(onChange).toHaveBeenCalledWith('smart-vila')
  })

  it('marks the selected option with accessibilityState selected: true', () => {
    const { getByRole, getAllByRole } = render(
      <Select options={OPTIONS} value="smart-pinheiros" onChange={() => {}} />,
    )

    fireEvent.press(getByRole('combobox'))

    const optionItems = getAllByRole('radio')
    const selectedItem = optionItems.find(
      (item) => item.props.accessibilityLabel === 'SmartFit Pinheiros, R. dos Pinheiros, 473',
    )
    expect(selectedItem?.props.accessibilityState?.selected).toBe(true)
  })

  it('marks non-selected options with accessibilityState selected: false', () => {
    const { getByRole, getAllByRole } = render(
      <Select options={OPTIONS} value="smart-pinheiros" onChange={() => {}} />,
    )

    fireEvent.press(getByRole('combobox'))

    const optionItems = getAllByRole('radio')
    const nonSelectedItem = optionItems.find(
      (item) =>
        item.props.accessibilityLabel === 'SmartFit Vila Mariana, R. Domingos de Morais, 800',
    )
    expect(nonSelectedItem?.props.accessibilityState?.selected).toBe(false)
  })

  it('does not open the list when disabled', () => {
    const { getByRole, queryAllByRole } = render(
      <Select options={OPTIONS} onChange={() => {}} disabled />,
    )

    fireEvent.press(getByRole('combobox'))

    expect(queryAllByRole('radio')).toHaveLength(0)
  })

  it('sets accessibilityRole="combobox" on the trigger', () => {
    const { getByRole } = render(<Select options={OPTIONS} onChange={() => {}} />)
    expect(getByRole('combobox')).toBeTruthy()
  })

  it('sets accessibilityLabel on the trigger via prop', () => {
    const { getByLabelText } = render(
      <Select options={OPTIONS} onChange={() => {}} accessibilityLabel="Escolher unidade" />,
    )
    expect(getByLabelText('Escolher unidade')).toBeTruthy()
  })

  it('sets accessibilityState expanded: false on the trigger when closed', () => {
    const { getByRole } = render(<Select options={OPTIONS} onChange={() => {}} />)
    const trigger = getByRole('combobox')
    expect(trigger.props.accessibilityState?.expanded).toBe(false)
  })

  it('sets accessibilityState expanded: true on the trigger when open', () => {
    const { getByRole } = render(<Select options={OPTIONS} onChange={() => {}} />)
    fireEvent.press(getByRole('combobox'))
    const trigger = getByRole('combobox')
    expect(trigger.props.accessibilityState?.expanded).toBe(true)
  })

  it('sets accessibilityState disabled: true on the trigger when disabled', () => {
    const { getByRole } = render(<Select options={OPTIONS} onChange={() => {}} disabled />)
    const trigger = getByRole('combobox')
    expect(trigger.props.accessibilityState?.disabled).toBe(true)
  })

  it('sets accessibilityLabel combining label and sublabel on each option', () => {
    const { getByRole, getAllByRole } = render(<Select options={OPTIONS} onChange={() => {}} />)

    fireEvent.press(getByRole('combobox'))

    const optionItems = getAllByRole('radio')
    optionItems.forEach((item, index) => {
      const option = OPTIONS[index]
      expect(item.props.accessibilityLabel).toBe(`${option.label}, ${option.sublabel}`)
    })
  })
})

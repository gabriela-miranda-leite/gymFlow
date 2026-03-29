import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { ButtonGroup } from '@/presentation/components/ButtonGroup/ButtonGroup'
import type { ButtonGroupOption } from '@/presentation/components/ButtonGroup/ButtonGroup'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      card: '#2A2A2E',
      foreground: '#FFFFFF',
      mutedForeground: '#8A8A8E',
    },
  }),
}))

const OPTIONS: ButtonGroupOption[] = [
  { value: 'empty', label: 'Vazio', sublabel: 'Equipamentos livres', color: '#4CAF50' },
  { value: 'normal', label: 'Normal', sublabel: 'Fluxo tranquilo', color: '#FFC107' },
  { value: 'full', label: 'Cheio', sublabel: 'Espera em alguns', color: '#FF9800' },
  { value: 'packed', label: 'Lotado', sublabel: 'Longa espera', color: '#F44336' },
]

describe('ButtonGroup', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<ButtonGroup options={OPTIONS} onSelect={() => {}} />)
    expect(toJSON()).toBeTruthy()
  })

  it('renders all options passed via prop', () => {
    const { getAllByRole } = render(<ButtonGroup options={OPTIONS} onSelect={() => {}} />)
    expect(getAllByRole('button')).toHaveLength(OPTIONS.length)
  })

  it('displays label and sublabel for each option', () => {
    const { getByText } = render(<ButtonGroup options={OPTIONS} onSelect={() => {}} />)

    OPTIONS.forEach((option) => {
      expect(getByText(option.label)).toBeTruthy()
      expect(getByText(option.sublabel)).toBeTruthy()
    })
  })

  it('calls onSelect with the correct value when an item is pressed', () => {
    const onSelect = jest.fn()
    const { getByText } = render(<ButtonGroup options={OPTIONS} onSelect={onSelect} />)

    fireEvent.press(getByText('Normal'))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith('normal')
  })

  it('only one option is selected at a time', () => {
    const onSelect = jest.fn()
    const { getByText, getAllByRole } = render(
      <ButtonGroup options={OPTIONS} onSelect={onSelect} />,
    )

    fireEvent.press(getByText('Vazio'))
    fireEvent.press(getByText('Cheio'))

    const buttons = getAllByRole('button')
    const selectedButtons = buttons.filter((btn) => btn.props.accessibilityState?.selected === true)
    expect(selectedButtons).toHaveLength(1)
    expect(selectedButtons[0].props.accessibilityLabel).toBe('Cheio, Espera em alguns')
  })

  it('does not call onSelect when disabled', () => {
    const onSelect = jest.fn()
    const { getByText } = render(<ButtonGroup options={OPTIONS} onSelect={onSelect} disabled />)

    fireEvent.press(getByText('Vazio'))

    expect(onSelect).not.toHaveBeenCalled()
  })

  it('sets accessibilityState disabled on all items when disabled', () => {
    const { getAllByRole } = render(<ButtonGroup options={OPTIONS} onSelect={() => {}} disabled />)

    getAllByRole('button').forEach((btn) => {
      expect(btn.props.accessibilityState?.disabled).toBe(true)
    })
  })

  it('sets accessibilityRole="button" on each item', () => {
    const { getAllByRole } = render(<ButtonGroup options={OPTIONS} onSelect={() => {}} />)
    expect(getAllByRole('button')).toHaveLength(OPTIONS.length)
  })

  it('sets accessibilityLabel combining label and sublabel on each item', () => {
    const { getAllByRole } = render(<ButtonGroup options={OPTIONS} onSelect={() => {}} />)

    const buttons = getAllByRole('button')
    buttons.forEach((btn, index) => {
      const option = OPTIONS[index]
      expect(btn.props.accessibilityLabel).toBe(`${option.label}, ${option.sublabel}`)
    })
  })

  it('sets accessibilityState selected on the pressed item', () => {
    const { getByText, getAllByRole } = render(
      <ButtonGroup options={OPTIONS} onSelect={() => {}} />,
    )

    fireEvent.press(getByText('Normal'))

    const buttons = getAllByRole('button')
    const normalButton = buttons.find(
      (btn) => btn.props.accessibilityLabel === 'Normal, Fluxo tranquilo',
    )
    expect(normalButton?.props.accessibilityState?.selected).toBe(true)
  })
})

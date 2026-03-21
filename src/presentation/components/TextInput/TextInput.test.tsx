import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { TextInput } from '@/presentation/components/TextInput/TextInput'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      foreground: '#18181B',
      mutedForeground: '#A1A1AA',
      border: '#E4E4E7',
      input: '#F7F7F8',
      destructive: '#EF4444',
    },
  }),
}))

describe('TextInput', () => {
  it('renders label and placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <TextInput label="Email" value="" onChangeText={() => {}} placeholder="seu@email.com" />,
    )

    expect(getByText('Email')).toBeTruthy()
    expect(getByPlaceholderText('seu@email.com')).toBeTruthy()
  })

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn()
    const { getByPlaceholderText } = render(
      <TextInput label="Email" value="" onChangeText={onChangeText} placeholder="seu@email.com" />,
    )

    fireEvent.changeText(getByPlaceholderText('seu@email.com'), 'test@email.com')

    expect(onChangeText).toHaveBeenCalledWith('test@email.com')
  })

  it('shows error message when errorMessage is provided', () => {
    const { getByText } = render(
      <TextInput label="Email" value="aaa" onChangeText={() => {}} errorMessage="Email inválido" />,
    )

    expect(getByText('Email inválido')).toBeTruthy()
  })

  it('does not show error row when errorMessage is absent', () => {
    const { queryByText } = render(<TextInput label="Email" value="" onChangeText={() => {}} />)

    expect(queryByText('Email inválido')).toBeNull()
  })

  it('calls onPressRightIcon when icon is pressed', () => {
    const onPressRightIcon = jest.fn()
    const { getByRole } = render(
      <TextInput
        label="Senha"
        value=""
        onChangeText={() => {}}
        rightIcon="showPassword"
        onPressRightIcon={onPressRightIcon}
      />,
    )

    fireEvent.press(getByRole('button'))

    expect(onPressRightIcon).toHaveBeenCalledTimes(1)
  })
})

import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { ListItem } from '@/presentation/components/ListItem'

jest.mock('@/presentation/components/Avatar', () => ({
  Avatar: ({ name, testID }: { name: string; testID?: string }) => {
    const { View, Text } = require('react-native')
    return (
      <View testID={testID}>
        <Text>{name.trim().charAt(0).toUpperCase()}</Text>
      </View>
    )
  },
}))

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      foreground: '#18181B',
      mutedForeground: '#A1A1AA',
      secondary: '#F0F0F2',
      card: '#FFFFFF',
      brand: { primary: '#FF6A00', primaryForeground: '#FFFFFF' },
      destructive: '#EF4444',
    },
  }),
}))

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

const LABEL = 'Email'
const SUBLABEL = 'rafael@email.com'

describe('ListItem', () => {
  describe('label and sublabel', () => {
    it('renders the label', () => {
      const { getByText } = render(<ListItem label={LABEL} />)

      expect(getByText(LABEL)).toBeTruthy()
    })

    it('renders the sublabel when provided', () => {
      const { getByText } = render(<ListItem label={LABEL} sublabel={SUBLABEL} />)

      expect(getByText(SUBLABEL)).toBeTruthy()
    })

    it('does not render sublabel when not provided', () => {
      const { queryByText } = render(<ListItem label={LABEL} />)

      expect(queryByText(SUBLABEL)).toBeNull()
    })

    it('renders label with custom color when labelColor is provided', () => {
      const { getByText } = render(<ListItem label="Sair" labelColor="#EF4444" />)

      expect(getByText('Sair').props.style).toEqual(expect.objectContaining({ color: '#EF4444' }))
    })
  })

  describe('trailing: chevron', () => {
    it('renders as pressable with accessibilityRole button', () => {
      const { getByRole } = render(
        <ListItem label={LABEL} trailing={{ type: 'chevron' }} onPress={() => {}} />,
      )

      expect(getByRole('button')).toBeTruthy()
    })

    it('calls onPress when pressed', () => {
      const onPress = jest.fn()
      const { getByRole } = render(
        <ListItem label={LABEL} trailing={{ type: 'chevron' }} onPress={onPress} />,
      )

      fireEvent.press(getByRole('button'))

      expect(onPress).toHaveBeenCalledTimes(1)
    })
  })

  describe('trailing: text-chevron', () => {
    it('renders the trailing text', () => {
      const { getByText } = render(
        <ListItem label="SmartFit" trailing={{ type: 'text-chevron', text: '22%' }} />,
      )

      expect(getByText('22%')).toBeTruthy()
    })
  })

  describe('trailing: toggle', () => {
    it('renders a switch', () => {
      const { getByRole } = render(
        <ListItem
          label="Horário ideal"
          sublabel="Avisa quando esvaziar"
          trailing={{ type: 'toggle', value: true, onValueChange: () => {} }}
        />,
      )

      expect(getByRole('switch')).toBeTruthy()
    })

    it('calls onValueChange when toggle is pressed', () => {
      const onValueChange = jest.fn()
      const { getByRole } = render(
        <ListItem
          label="Horário ideal"
          trailing={{ type: 'toggle', value: false, onValueChange }}
        />,
      )

      fireEvent(getByRole('switch'), 'valueChange', true)

      expect(onValueChange).toHaveBeenCalledWith(true)
    })

    it('reflects toggle value', () => {
      const { getByRole } = render(
        <ListItem
          label="Horário ideal"
          trailing={{ type: 'toggle', value: true, onValueChange: () => {} }}
        />,
      )

      expect(getByRole('switch').props.value).toBe(true)
    })
  })

  describe('trailing: slider', () => {
    it('renders a slider', () => {
      const { getByRole } = render(
        <ListItem
          label="Limite de lotação"
          sublabel="Avisa abaixo de 40%"
          trailing={{ type: 'slider', value: 40, onValueChange: () => {} }}
        />,
      )

      expect(getByRole('adjustable')).toBeTruthy()
    })

    it('renders current percentage value', () => {
      const { getByText } = render(
        <ListItem
          label="Limite de lotação"
          trailing={{ type: 'slider', value: 40, onValueChange: () => {} }}
        />,
      )

      expect(getByText('40%')).toBeTruthy()
    })
  })

  describe('leading: indicator', () => {
    it('renders without crashing with indicator leading', () => {
      const { getByText } = render(
        <ListItem
          label="SmartFit"
          leading={{ type: 'indicator', color: '#4CAF50' }}
          trailing={{ type: 'text-chevron', text: '22%' }}
        />,
      )

      expect(getByText('SmartFit')).toBeTruthy()
    })
  })

  describe('leading: avatar', () => {
    it('renders the avatar initial', () => {
      const { getByText } = render(
        <ListItem
          label="Rafael Souza"
          leading={{ type: 'avatar', name: 'Rafael Souza' }}
          trailing={{ type: 'chevron' }}
        />,
      )

      expect(getByText('R')).toBeTruthy()
    })

    it('renders with camera badge when showCameraBadge is true', () => {
      const { getByTestId } = render(
        <ListItem
          label="Rafael Souza"
          leading={{ type: 'avatar', name: 'Rafael Souza', showCameraBadge: true }}
          testID="profile-item"
        />,
      )

      expect(getByTestId('profile-item')).toBeTruthy()
    })
  })

  describe('testID', () => {
    it('applies testID to the container', () => {
      const { getByTestId } = render(<ListItem label={LABEL} testID="list-item-email" />)

      expect(getByTestId('list-item-email')).toBeTruthy()
    })
  })
})

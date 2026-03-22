import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { TabBar } from '@/presentation/components/TabBar/TabBar'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      tabBar: {
        bg: '#FFFFFF',
        border: '#E4E4E7',
        active: '#FF6A00',
        inactive: '#71717A',
      },
    },
  }),
}))

function makeProps(activeIndex = 0) {
  const routes = [
    { key: 'Map', name: 'Map' },
    { key: 'CheckIn', name: 'CheckIn' },
    { key: 'Profile', name: 'Profile' },
  ]

  return {
    state: {
      routes,
      index: activeIndex,
    },
    descriptors: Object.fromEntries(
      routes.map((r) => [
        r.key,
        {
          options: {
            tabBarLabel: r.name,
            tabBarIcon: ({ color }: { color: string; size: number; focused: boolean }) =>
              React.createElement('View', { testID: `icon-${r.name}`, style: { color } }),
          },
        },
      ]),
    ),
    navigation: {
      emit: jest.fn(() => ({ defaultPrevented: false })),
      navigate: jest.fn(),
    },
  }
}

describe('TabBar', () => {
  it('renders one tab item per route', () => {
    const props = makeProps()
    const { getByTestId } = render(<TabBar {...(props as unknown as BottomTabBarProps)} />)

    expect(getByTestId('tab-Map')).toBeTruthy()
    expect(getByTestId('tab-CheckIn')).toBeTruthy()
    expect(getByTestId('tab-Profile')).toBeTruthy()
  })

  it('renders the active indicator only for the focused tab', () => {
    const props = makeProps(0)
    const { getByTestId, queryByTestId } = render(
      <TabBar {...(props as unknown as BottomTabBarProps)} />,
    )

    expect(getByTestId('tab-indicator-Map')).toBeTruthy()
    expect(queryByTestId('tab-indicator-CheckIn')).toBeNull()
    expect(queryByTestId('tab-indicator-Profile')).toBeNull()
  })

  it('moves indicator when a different tab is active', () => {
    const props = makeProps(2)
    const { getByTestId, queryByTestId } = render(
      <TabBar {...(props as unknown as BottomTabBarProps)} />,
    )

    expect(queryByTestId('tab-indicator-Map')).toBeNull()
    expect(getByTestId('tab-indicator-Profile')).toBeTruthy()
  })

  it('pressing an inactive tab emits tabPress and navigates', () => {
    const props = makeProps(0)
    const { getByTestId } = render(<TabBar {...(props as unknown as BottomTabBarProps)} />)

    fireEvent.press(getByTestId('tab-CheckIn'))

    expect(props.navigation.emit).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'tabPress', target: 'CheckIn' }),
    )
    expect(props.navigation.navigate).toHaveBeenCalledWith('CheckIn')
  })

  it('pressing the already focused tab does not call navigate', () => {
    const props = makeProps(0)
    const { getByTestId } = render(<TabBar {...(props as unknown as BottomTabBarProps)} />)

    fireEvent.press(getByTestId('tab-Map'))

    expect(props.navigation.navigate).not.toHaveBeenCalled()
  })

  it('renders each tab label', () => {
    const props = makeProps()
    const { getByText } = render(<TabBar {...(props as unknown as BottomTabBarProps)} />)

    expect(getByText('Map')).toBeTruthy()
    expect(getByText('CheckIn')).toBeTruthy()
    expect(getByText('Profile')).toBeTruthy()
  })
})

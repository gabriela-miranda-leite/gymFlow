import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'

import { GymDetailCard } from '@/presentation/components/GymDetailCard/GymDetailCard'
import type { GymUiModel } from '@/presentation/uiModels/MapUiModel'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      foreground: '#18181B',
      card: '#FFFFFF',
      mutedForeground: '#71717A',
      muted: '#F4F4F5',
      brand: { primary: '#F97316', primaryForeground: '#FFFFFF' },
      status: { empty: '#22C55E', moderate: '#EAB308', busy: '#F97316', packed: '#EF4444' },
    },
  }),
}))

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react')
  const { View } = require('react-native')
  const BottomSheet = React.forwardRef(
    (
      { children }: { children?: React.ReactNode },
      ref: React.Ref<{ expand: () => void; close: () => void }>,
    ) => {
      React.useImperativeHandle(ref, () => ({ expand: jest.fn(), close: jest.fn() }))
      return React.createElement(View, { testID: 'bottom-sheet' }, children)
    },
  )
  BottomSheet.displayName = 'BottomSheet'
  const BottomSheetView = ({ children }: { children?: React.ReactNode }) =>
    React.createElement(View, {}, children)
  return { __esModule: true, default: BottomSheet, BottomSheetView }
})

const mockGym: GymUiModel = {
  id: '1',
  name: 'Smart Fit – Paulista',
  address: 'Av. Paulista, 1374',
  rating: 4.2,
  ratingLabel: '4.2',
  reviewCount: '(214)',
  distanceLabel: '350 m',
  openingHours: '06:00 – 22:00',
  isOpen: true,
  statusLabel: 'Aberta',
  tags: ['Musculação', 'Crossfit'],
  coordinates: { latitude: -23.565, longitude: -46.6525 },
  occupancy: 'empty',
  occupancyPercent: '22%',
  occupancyLabel: 'VAZIO',
}

describe('GymDetailCard', () => {
  it('renders gym name and address when gym is provided', () => {
    const ref = React.createRef<React.ComponentRef<typeof import('@gorhom/bottom-sheet').default>>()
    const { getByText } = render(
      <GymDetailCard ref={ref} gym={mockGym} onDismiss={jest.fn()} onCheckIn={jest.fn()} />,
    )
    expect(getByText('Smart Fit – Paulista')).toBeTruthy()
    expect(getByText('Av. Paulista, 1374')).toBeTruthy()
  })

  it('renders rating and review count', () => {
    const ref = React.createRef<React.ComponentRef<typeof import('@gorhom/bottom-sheet').default>>()
    const { getByText } = render(
      <GymDetailCard ref={ref} gym={mockGym} onDismiss={jest.fn()} onCheckIn={jest.fn()} />,
    )
    expect(getByText('4.2')).toBeTruthy()
    expect(getByText('(214)')).toBeTruthy()
  })

  it('renders distance and opening hours info cards', () => {
    const ref = React.createRef<React.ComponentRef<typeof import('@gorhom/bottom-sheet').default>>()
    const { getByText } = render(
      <GymDetailCard ref={ref} gym={mockGym} onDismiss={jest.fn()} onCheckIn={jest.fn()} />,
    )
    expect(getByText('350 m')).toBeTruthy()
    expect(getByText('06:00 – 22:00')).toBeTruthy()
  })

  it('renders occupancy percent and label', () => {
    const ref = React.createRef<React.ComponentRef<typeof import('@gorhom/bottom-sheet').default>>()
    const { getByText } = render(
      <GymDetailCard ref={ref} gym={mockGym} onDismiss={jest.fn()} onCheckIn={jest.fn()} />,
    )
    expect(getByText('22%')).toBeTruthy()
    expect(getByText('VAZIO')).toBeTruthy()
  })

  it('renders all tags', () => {
    const ref = React.createRef<React.ComponentRef<typeof import('@gorhom/bottom-sheet').default>>()
    const { getByText } = render(
      <GymDetailCard ref={ref} gym={mockGym} onDismiss={jest.fn()} onCheckIn={jest.fn()} />,
    )
    expect(getByText('Musculação')).toBeTruthy()
    expect(getByText('Crossfit')).toBeTruthy()
  })

  it('calls onCheckIn when check-in button is pressed', () => {
    const onCheckIn = jest.fn()
    const ref = React.createRef<React.ComponentRef<typeof import('@gorhom/bottom-sheet').default>>()
    const { getByText } = render(
      <GymDetailCard ref={ref} gym={mockGym} onDismiss={jest.fn()} onCheckIn={onCheckIn} />,
    )
    fireEvent.press(getByText('map.checkIn'))
    expect(onCheckIn).toHaveBeenCalledTimes(1)
  })

  it('renders nothing inside the sheet when gym is null', () => {
    const ref = React.createRef<React.ComponentRef<typeof import('@gorhom/bottom-sheet').default>>()
    const { queryByText } = render(
      <GymDetailCard ref={ref} gym={null} onDismiss={jest.fn()} onCheckIn={jest.fn()} />,
    )
    expect(queryByText('Smart Fit – Paulista')).toBeNull()
  })
})

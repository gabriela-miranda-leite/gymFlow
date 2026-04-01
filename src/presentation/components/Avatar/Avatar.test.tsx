import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { Avatar } from '@/presentation/components/Avatar'

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      foreground: '#18181B',
      mutedForeground: '#A1A1AA',
      card: '#F7F7F8',
      brand: {
        primary: '#FF6A00',
        primaryForeground: '#FFFFFF',
      },
    },
  }),
}))

const NAME = 'Rafael Souza'

describe('Avatar', () => {
  describe('initial', () => {
    it('renders the first letter of the name uppercased', () => {
      const { getByTestId } = render(<Avatar name={NAME} testID="avatar" />)

      expect(getByTestId('avatar-initial')).toBeTruthy()
      expect(getByTestId('avatar-initial').props.children).toBe('R')
    })

    it('uppercases a lowercase first letter', () => {
      const { getByTestId } = render(<Avatar name="rafael" testID="avatar" />)

      expect(getByTestId('avatar-initial').props.children).toBe('R')
    })

    it('trims leading whitespace when extracting initial', () => {
      const { getByTestId } = render(<Avatar name="  João" testID="avatar" />)

      expect(getByTestId('avatar-initial').props.children).toBe('J')
    })
  })

  describe('image', () => {
    it('renders the image when imageUri is provided', () => {
      const { getByTestId, queryByTestId } = render(
        <Avatar name={NAME} imageUri="https://example.com/photo.jpg" testID="avatar" />,
      )

      expect(getByTestId('avatar-image')).toBeTruthy()
      expect(queryByTestId('avatar-initial')).toBeNull()
    })

    it('renders initial when imageUri is not provided', () => {
      const { queryByTestId, getByTestId } = render(<Avatar name={NAME} testID="avatar" />)

      expect(queryByTestId('avatar-image')).toBeNull()
      expect(getByTestId('avatar-initial')).toBeTruthy()
    })
  })

  describe('camera badge', () => {
    it('does not render camera badge by default', () => {
      const { queryByTestId } = render(<Avatar name={NAME} testID="avatar" />)

      expect(queryByTestId('avatar-camera-badge')).toBeNull()
    })

    it('renders camera badge when showCameraBadge is true', () => {
      const { getByTestId } = render(<Avatar name={NAME} showCameraBadge testID="avatar" />)

      expect(getByTestId('avatar-camera-badge')).toBeTruthy()
    })

    it('calls onCameraPress when badge is pressed', () => {
      const onCameraPress = jest.fn()
      const { getByTestId } = render(
        <Avatar name={NAME} showCameraBadge onCameraPress={onCameraPress} testID="avatar" />,
      )

      fireEvent.press(getByTestId('avatar-camera-badge'))

      expect(onCameraPress).toHaveBeenCalledTimes(1)
    })

    it('renders badge with accessibilityRole button', () => {
      const { getByTestId } = render(<Avatar name={NAME} showCameraBadge testID="avatar" />)

      expect(getByTestId('avatar-camera-badge').props.accessibilityRole).toBe('button')
    })
  })

  describe('accessibility', () => {
    it('sets accessibilityRole image on the circle', () => {
      const { getByTestId } = render(<Avatar name={NAME} testID="avatar" />)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const circle = getByTestId('avatar').children[0] as any
      expect(circle.props.accessibilityRole).toBe('image')
    })

    it('sets accessibilityLabel to the name on the circle', () => {
      const { getByTestId } = render(<Avatar name={NAME} testID="avatar" />)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const circle = getByTestId('avatar').children[0] as any
      expect(circle.props.accessibilityLabel).toBe(NAME)
    })
  })

  describe('testID', () => {
    it('applies testID to the container', () => {
      const { getByTestId } = render(<Avatar name={NAME} testID="avatar" />)

      expect(getByTestId('avatar')).toBeTruthy()
    })
  })
})

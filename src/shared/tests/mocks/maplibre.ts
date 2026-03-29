import React from 'react'
import { View } from 'react-native'

const noop = () => {}

export const MapView = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(View, { testID: 'map-view' }, children)

export const Camera = () => null
export const MarkerView = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(View, {}, children)
export const setAccessToken = noop

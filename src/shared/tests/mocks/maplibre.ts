import React from 'react'
import { View } from 'react-native'

const noop = () => {}

const MapView = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(View, { testID: 'map-view' }, children)

const Camera = () => null
const UserLocation = () => null
const MarkerView = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(View, {}, children)

const MapLibreGL = {
  MapView,
  Camera,
  UserLocation,
  MarkerView,
  setAccessToken: noop,
}

export default MapLibreGL

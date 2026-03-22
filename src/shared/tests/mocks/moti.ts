import React from 'react'
import { View } from 'react-native'

// Renders children as a plain View — animations are no-ops in tests
const MotiView = ({ children, ...rest }: React.ComponentProps<typeof View>) =>
  React.createElement(View, rest, children)

const MotiText = ({ children, ...rest }: React.ComponentProps<typeof View>) =>
  React.createElement(View, rest, children)

const MotiImage = (props: React.ComponentProps<typeof View>) => React.createElement(View, props)

const AnimatePresence = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children)

export { MotiView, MotiText, MotiImage, AnimatePresence }
export const useAnimationState = () => ({})
export const useDynamicAnimation = () => ({})
export const motify = (Component: React.ElementType) => Component

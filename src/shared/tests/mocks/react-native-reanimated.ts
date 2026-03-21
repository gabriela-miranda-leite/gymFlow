const Animated = {
  View: 'View',
  Text: 'Text',
  Image: 'Image',
  ScrollView: 'ScrollView',
  createAnimatedComponent: (component: unknown) => component,
}

export default Animated

export const useSharedValue = (initial: unknown) => ({ value: initial })
export const useAnimatedStyle = (fn: () => object) => fn()
export const withSpring = (value: unknown) => value
export const withTiming = (value: unknown) => value
export const runOnJS = (fn: (...args: unknown[]) => unknown) => fn
export const interpolate = (value: unknown) => value

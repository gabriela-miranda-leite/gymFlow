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
export const Easing = {
  bezier: () => 0,
  out: () => 0,
  in: () => 0,
  inOut: () => 0,
  linear: 0,
  ease: 0,
  quad: 0,
  cubic: 0,
  sin: 0,
  circle: 0,
  exp: 0,
  elastic: () => 0,
  back: () => 0,
  bounce: 0,
  step0: 0,
  step1: 0,
}

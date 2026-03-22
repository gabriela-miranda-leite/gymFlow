import { View } from 'react-native';

// Minimal mock — animations are no-ops in web Storybook
export const useSharedValue = (initial: number) => ({ value: initial });

export const useAnimatedStyle = (fn: () => object) => fn();

export const withSpring = (value: number) => value;

export const withTiming = (value: number) => value;

const Animated = {
  createAnimatedComponent: (component: unknown) => component,
  View,
};

export default Animated;

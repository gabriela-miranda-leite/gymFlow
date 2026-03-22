import '@testing-library/jest-native/extend-expect'

jest.mock('react-native-gesture-handler', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native')
  return {
    GestureHandlerRootView: View,
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    TouchableOpacity: View,
    TouchableHighlight: View,
    TouchableNativeFeedback: View,
    TouchableWithoutFeedback: View,
    gestureHandlerRootHOC: (c: unknown) => c,
    Directions: {},
  }
})

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: { latitude: -23.565, longitude: -46.6525 },
  }),
  PermissionStatus: { GRANTED: 'granted', DENIED: 'denied' },
  Accuracy: { Balanced: 3 },
}))

jest.mock('react-i18next', () => ({
  initReactI18next: { type: '3rdParty', init: () => {} },
  useTranslation: () => ({ t: (key: string) => key }),
}))

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn(),
  useNavigation: jest.fn(() => ({ navigate: jest.fn(), goBack: jest.fn() })),
}))

jest.mock('moti', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native')
  return {
    MotiView: ({ children, ...rest }: { children?: React.ReactNode }) =>
      React.createElement(View, rest, children),
    MotiText: ({ children, ...rest }: { children?: React.ReactNode }) =>
      React.createElement(View, rest, children),
    MotiImage: (props: object) => React.createElement(View, props),
    AnimatePresence: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useAnimationState: () => ({}),
    useDynamicAnimation: () => ({}),
    motify: (c: unknown) => c,
  }
})

import '@testing-library/jest-native/extend-expect'

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

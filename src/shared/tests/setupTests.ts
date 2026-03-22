import '@testing-library/jest-native/extend-expect'

jest.mock('react-i18next', () => ({
  initReactI18next: { type: '3rdParty', init: () => {} },
  useTranslation: () => ({ t: (key: string) => key }),
}))

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))

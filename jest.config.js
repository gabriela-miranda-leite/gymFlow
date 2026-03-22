module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/shared/tests/setupTests.ts'],
  moduleNameMapper: {
    '^react-native-reanimated$': '<rootDir>/src/shared/tests/mocks/react-native-reanimated.ts',
    '^moti(.*)$': '<rootDir>/src/shared/tests/mocks/moti.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|moti|@motify))',
    '/node_modules/react-native-reanimated/plugin/',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    // infra / config — sem lógica testável
    '!src/App.tsx',
    '!src/config/**',
    '!src/tokens/**',
    '!src/theme/**',
    // tipos e modelos puros
    '!src/**/*.d.ts',
    '!src/domain/models/**',
    '!src/presentation/uiModels/**',
    '!src/shared/navigation/types.ts',
    // i18n — dados de tradução, sem lógica
    '!src/shared/i18n/**',
    // navegação — setup do React Navigation
    '!src/shared/navigation/RootNavigator.tsx',
    // styled-components — apenas estilo, sem lógica
    '!src/**/*.styles.ts',
    // Storybook — não é código de produção
    '!src/**/*.stories.tsx',
    '!src/**/*.stories.ts',
    // infra de testes
    '!src/shared/tests/**',
    // barrel exports
    '!src/**/__tests__/**',
    '!src/**/.gitkeep',
    '!src/**/index.ts',
    // icons — re-exports e constantes
    '!src/presentation/components/icons/**',
    // serviços de infra — apiClient, queryClient
    '!src/data/services/**',
  ],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 40,
      statements: 40,
    },
  },
};

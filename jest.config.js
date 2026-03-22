module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/shared/tests/setupTests.ts'],
  moduleNameMapper: {
    '^react-native-reanimated$': '<rootDir>/src/shared/tests/mocks/react-native-reanimated.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/.gitkeep',
    '!src/**/index.ts',
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

import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { ErrorBoundary } from './ErrorBoundary';

jest.mock('@/shared/i18n', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      brand: { primary: '#FF6B35', onPrimary: '#FFFFFF' },
      surface: { primary: '#FFFFFF' },
      text: { primary: '#111111' },
      border: { default: '#E0E0E0' },
    },
    isDark: false,
  }),
}));

function ThrowError() {
  throw new Error('test error');
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Text>conteúdo normal</Text>
      </ErrorBoundary>,
    );

    expect(getByText('conteúdo normal')).toBeTruthy();
  });

  it('renders fallback when child throws', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(getByText('errors.generic')).toBeTruthy();
  });

  it('renders custom fallback when provided', () => {
    const { getByText } = render(
      <ErrorBoundary fallback={<Text>erro customizado</Text>}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(getByText('erro customizado')).toBeTruthy();
  });
});

import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Button } from './Button';

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

describe('Button', () => {
  it('renders label', () => {
    const { getByText } = render(<Button label="Confirmar" />);

    expect(getByText('Confirmar')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button label="Salvar" onPress={onPress} />);

    fireEvent.press(getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button label="Salvar" disabled onPress={onPress} />);

    fireEvent.press(getByRole('button'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows ActivityIndicator when loading', () => {
    const { queryByText, getByRole } = render(<Button label="Salvar" loading />);

    expect(queryByText('Salvar')).toBeNull();
    expect(getByRole('button')).toBeTruthy();
  });
});

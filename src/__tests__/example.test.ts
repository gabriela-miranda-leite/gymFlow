import { render } from '@testing-library/react-native';
import React from 'react';

import App from '@/App';

jest.mock('@/hooks/useFonts', () => ({
  useAppFonts: () => ({ fontsLoaded: true, error: null }),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

describe('App sanity test', () => {
  it('renders initial template text', () => {
    const { getByText } = render(React.createElement(App));

    expect(getByText('Open up App.tsx to start working on your app!')).toBeTruthy();
  });
});

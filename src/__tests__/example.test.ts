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

jest.mock('react-native-safe-area-context', () => {
  const MockView = require('react-native').View;
  return {
    SafeAreaProvider: ({ children }: { children: unknown }) =>
      require('react').createElement(MockView, null, children),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

jest.mock('@/shared/navigation/RootNavigator', () => {
  const { Text } = require('react-native');
  return {
    RootNavigator: () => require('react').createElement(Text, null, 'GymFlow'),
  };
});

describe('App sanity test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(React.createElement(App));

    expect(getByText('GymFlow')).toBeTruthy();
  });
});

import type { Preview } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';

import type { ThemeMode } from '../src/contexts/ThemeContext';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import '../src/shared/i18n';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tema da aplicação',
      defaultValue: 'light',
      toolbar: {
        title: 'Tema',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const themeMode = (context.globals?.theme ?? 'light') as ThemeMode;
      return (
        <ThemeProvider initialMode={themeMode}>
          <View style={{ flex: 1, padding: 24 }}>
            <Story />
          </View>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;

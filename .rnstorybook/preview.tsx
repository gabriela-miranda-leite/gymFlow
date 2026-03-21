import type { Preview } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';

import { ThemeProvider } from '../src/contexts/ThemeContext';
import '../src/shared/i18n';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ flex: 1, padding: 24 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;

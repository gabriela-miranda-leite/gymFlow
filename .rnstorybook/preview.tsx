import type { Preview } from '@storybook/react-native';
import React from 'react';

import { ThemeProvider } from '../src/contexts/ThemeContext';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;

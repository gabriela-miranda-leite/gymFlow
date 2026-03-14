import type { Preview } from '@storybook/react';
import React from 'react';

import { FontFaces } from './FontFaces';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import '../src/shared/i18n';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <FontFaces />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#121212' },
      ],
    },
  },
};

export default preview;

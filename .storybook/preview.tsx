import type { Preview } from '@storybook/react';
import React from 'react';

import { FontFaces } from './FontFaces';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import '../src/shared/i18n';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'App theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.theme === 'dark' ? 'dark' : 'light';
      const background = mode === 'dark' ? '#19191D' : '#FFFFFF';

      return (
        <ThemeProvider key={mode} initialMode={mode}>
          <FontFaces />
          <div style={{ background, minHeight: '100vh', padding: '24px' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;

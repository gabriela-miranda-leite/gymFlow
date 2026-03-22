import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import type { StorybookConfig } from '@storybook/react-webpack5';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.?(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (webpackConfig) => {
    // Add babel-loader for TypeScript/JSX files — includes expo/* and react-native-web
    webpackConfig.module?.rules?.push({
      test: /\.[jt]sx?$/,
      exclude:
        /node_modules\/(?!(react-native-web|@react-native|expo-localization|expo-status-bar|expo-modules-core|expo-constants))/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
            plugins: [
              [
                'module-resolver',
                {
                  root: [resolve(__dirname, '../src')],
                  alias: { '@': resolve(__dirname, '../src') },
                  extensions: ['.ts', '.tsx', '.js', '.jsx'],
                },
              ],
            ],
          },
        },
      ],
    });

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve?.alias,
        // React Native → web equivalents
        'react-native$': 'react-native-web',
        'react-native/Libraries/Utilities/Platform': 'react-native-web/dist/exports/Platform',
        // Mock Expo/native modules not available in browser
        'expo-localization': resolve(__dirname, './mocks/expo-localization.ts'),
        'expo-constants': resolve(__dirname, './mocks/expo-constants.ts'),
        'expo-status-bar': resolve(__dirname, './mocks/expo-status-bar.ts'),
        'expo-modules-core': resolve(__dirname, './mocks/expo-modules-core.ts'),
        '@react-native-async-storage/async-storage': resolve(
          __dirname,
          './mocks/async-storage.ts',
        ),
        'react-native-reanimated': resolve(__dirname, './mocks/react-native-reanimated.ts'),
      },
      // Polyfill Node.js core modules used by dev deps (e.g. @testing-library)
      fallback: {
        ...webpackConfig.resolve?.fallback,
        util: false,
        stream: false,
        path: false,
        fs: false,
        console: false,
        os: false,
        crypto: false,
      },
      extensions: [
        '.web.tsx',
        '.web.ts',
        '.web.js',
        ...(webpackConfig.resolve?.extensions ?? []),
      ],
    };

    // Handle font files
    webpackConfig.module?.rules?.push({
      test: /\.(ttf|otf|woff|woff2)$/,
      type: 'asset/resource',
    });

    return webpackConfig;
  },
};

export default config;

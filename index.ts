import { registerRootComponent } from 'expo';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const isStorybook = process.env.EXPO_PUBLIC_STORYBOOK === 'true'
// eslint-disable-next-line no-console
console.log('[index] STORYBOOK:', process.env.EXPO_PUBLIC_STORYBOOK, isStorybook)

if (isStorybook) {
  const StorybookUI = require('./.rnstorybook').default;
  registerRootComponent(StorybookUI);
} else {
  const App = require('./src/App').default;
  registerRootComponent(App);
}

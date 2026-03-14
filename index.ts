import { registerRootComponent } from 'expo';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
if (process.env.STORYBOOK === 'true') {
  const StorybookUI = require('./.rnstorybook').default;
  registerRootComponent(StorybookUI);
} else {
  const App = require('./src/App').default;
  registerRootComponent(App);
}

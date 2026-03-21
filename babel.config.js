module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: { '@': './src' },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    ],
    ...(process.env.NODE_ENV !== 'test' ? ['react-native-reanimated/plugin'] : []),
  ],
};

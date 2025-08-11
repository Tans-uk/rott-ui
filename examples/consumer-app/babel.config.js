/* eslint-disable indent */
/* eslint-disable no-undef */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    ['module-resolver', {
        alias: { 'rott.config': './rott.config.ts' },
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    ],
  ],
}

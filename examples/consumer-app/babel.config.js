/* eslint-disable indent */
/* eslint-disable no-undef */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        alias: {
          'rott.config': './rott.config.ts',
          // Peer dependencies aliases
          'react': './node_modules/react',
          'react-intl': './node_modules/react-intl',
          'react-native': './node_modules/react-native',
          '@react-native-community/netinfo': './node_modules/@react-native-community/netinfo',
          '@shopify/flash-list': './node_modules/@shopify/flash-list',
          'date-fns': './node_modules/date-fns',
          'react-native-device-info': './node_modules/react-native-device-info',
          'react-native-edge-to-edge': './node_modules/react-native-edge-to-edge',
          'react-native-keyboard-controller': './node_modules/react-native-keyboard-controller',
          'react-native-linear-gradient': './node_modules/react-native-linear-gradient',
          'react-native-mask-input': './node_modules/react-native-mask-input',
          'react-native-reanimated': './node_modules/react-native-reanimated',
          'react-native-safe-area-context': './node_modules/react-native-safe-area-context',
          'react-native-select-contact': './node_modules/react-native-select-contact',
          'react-native-svg': './node_modules/react-native-svg',
          'react-native-svg-transformer': './node_modules/react-native-svg-transformer',
          'react-native-tab-view': './node_modules/react-native-tab-view',
          'react-native-toast-notifications': './node_modules/react-native-toast-notifications',
          'react-native-worklets': './node_modules/react-native-worklets',
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    ],
  ],
}

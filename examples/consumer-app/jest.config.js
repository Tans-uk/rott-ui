/* eslint-disable no-undef */
const path = require('path')

const rottUiRoot = path.resolve(__dirname, '../..')

module.exports = {
  preset: 'react-native',

  /**
   * Mirrors the `resolveRequest` hook in metro.config.js: the app consumes
   * @tansuk/rott-ui from source, not from the built lib/. Without this, Jest falls
   * back to Node resolution, finds no workspace symlink, and the suite cannot even
   * import the library.
   *
   * react / react-native are pinned to the app's own copies for the same reason the
   * babel module-resolver aliases them — the library resolves them from the repo
   * root otherwise, and two React copies in one renderer break hooks.
   */
  moduleNameMapper: {
    '^@tansuk/rott-ui$': path.join(rottUiRoot, 'src/index.tsx'),
    '^rott.config$': path.join(__dirname, 'rott.config.ts'),
    '^react$': path.join(__dirname, 'node_modules/react'),
    '^react-native$': path.join(__dirname, 'node_modules/react-native'),
    '\\.svg': path.join(rottUiRoot, '__mocks__/svgMock.js'),
  },

  setupFiles: [path.join(rottUiRoot, 'jest.setup.env.js')],
  setupFilesAfterEnv: [path.join(__dirname, 'jest.setup.js')],

  transformIgnorePatterns: [
    'node_modules/(?!(' +
      'react-native|' +
      '@react-native|' +
      'react-native-\\w*|' +
      '@react-navigation/\\w*|' +
      '@react-native-community/\\w*|' +
      '@shopify/flash-list|' +
      'react-intl|' +
      'react-test-renderer|' +
      '@testing-library/react-native' +
      '))',
  ],
}

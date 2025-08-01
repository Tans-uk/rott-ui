/* eslint-disable no-undef */
const path = require('path')
const {getDefaultConfig} = require('@react-native/metro-config')

const root = path.resolve(__dirname, '..')

/**
 * Metro configuration for workspace dependency
 * https://reactnative.dev/docs/metro
 */
const config = getDefaultConfig(__dirname)

// Watch the parent directory for workspace changes
config.watchFolders = [root]

// Configure resolver for workspace dependency
config.resolver = {
  ...config.resolver,
  // MAIN PACKAGE RESOLUTION - This is the key fix!
  alias: {
    '@tansuk/rott-ui': path.resolve(__dirname, '..'),
  },
  // Node modules path resolution for monorepo
  nodeModulesPaths: [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '..', 'node_modules'),
  ],
  resolverMainFields: ['react-native', 'browser', 'main'],
  platforms: ['ios', 'android', 'native', 'web'],
  unstable_enablePackageExports: true,
  // SVG configuration
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
  // Exclude test files
  blockList: [
    /.*\/__tests__\/.*/,
    /.*\.test\.(js|jsx|ts|tsx)$/,
    /.*\.spec\.(js|jsx|ts|tsx)$/,
    /.*\/testUtils\.ts$/,
    /.*\/commonUiTestExtension\.ts$/,
    /@testing-library\/.*/,
  ],
}

// // SVG transformer
// config.transformer = {
//   ...config.transformer,
//   babelTransformerPath: require.resolve('react-native-svg-transformer'),
// }

module.exports = config

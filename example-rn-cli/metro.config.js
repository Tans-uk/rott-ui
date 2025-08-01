/* eslint-disable no-undef */
const path = require('path')
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')

const defaultConfig = getDefaultConfig(__dirname)
const {assetExts, sourceExts} = defaultConfig.resolver

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const root = path.resolve(__dirname, '..')
const config = {
  watchFolders: [root],
  alias: {
    '@tansuk/rott-ui': path.resolve(__dirname, '..'),
  },
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native'
    )
  },
  resolver: {
 
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
}

module.exports = mergeConfig(defaultConfig, config)
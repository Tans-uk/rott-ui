/* eslint-disable no-undef */
/* eslint-disable quotes */
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")
const path = require('path')

const defaultConfig = getDefaultConfig(__dirname)
const { assetExts, sourceExts } = defaultConfig.resolver

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),

  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'rott.config') {
        return {
          type: 'sourceFile',
          filePath: path.resolve(__dirname, 'rott.config.ts'),
        }
      }

      return context.resolveRequest(context, moduleName, platform)
    },
  }
}

module.exports = mergeConfig(defaultConfig, config)
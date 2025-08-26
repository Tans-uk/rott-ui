/* eslint-disable no-undef */
/* eslint-disable quotes */
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")
const path = require('path')

const defaultConfig = getDefaultConfig(__dirname)
const { assetExts, sourceExts } = defaultConfig.resolver


const rottUiPath = path.resolve(__dirname, '../../')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [rottUiPath],
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

      if (moduleName === '@tansuk/rott-ui') {
        return {
          type: 'sourceFile',
          filePath: path.resolve(rottUiPath, 'src/index.tsx'),
        }
      }

      return context.resolveRequest(context, moduleName, platform)
    },
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(rottUiPath, 'node_modules'),
    ],
  }
}

module.exports = mergeConfig(defaultConfig, config)
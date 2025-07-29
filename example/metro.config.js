/* eslint-disable no-undef */
const path = require('path')
const {getDefaultConfig} = require('@expo/metro-config')
const {withMetroConfig} = require('react-native-monorepo-config')

const root = path.resolve(__dirname, '..')

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
})

config.resolver.unstable_enablePackageExports = true

// Exclude test files and testing utilities from bundling
config.resolver.platforms = ['ios', 'android', 'native', 'web']
config.resolver.blockList = [
  /.*\/__tests__\/.*/,
  /.*\.test\.(js|jsx|ts|tsx)$/,
  /.*\.spec\.(js|jsx|ts|tsx)$/,
  /.*\/testUtils\.ts$/,
  /.*\/commonUiTestExtension\.ts$/,
  /@testing-library\/.*/,
]

module.exports = config

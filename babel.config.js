/* eslint-disable no-undef */
module.exports = {
  overrides: [
    {
      exclude: /\/node_modules\//,
      presets: ['module:react-native-builder-bob/babel-preset'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            alias: {
              '@tansuk/rott-ui': './src',
              '@features': './src/features',
              '@features/*': './src/features/*',
              '@constants': './src/constants',
              '@constants/*': './src/constants/*',
              '@utils': './src/utils',
              '@utils/*': './src/utils/*',
              '@libs': './src/libs',
              '@libs/*': './src/libs/*',
              '@hooks': './src/hooks',
              '@hooks/*': './src/hooks/*',
              '@models': './src/models',
              '@models/*': './src/models/*',
              '@providers': './src/providers',
              '@providers/*': './src/providers/*',
              '@contexts': './src/contexts',
              '@contexts/*': './src/contexts/*',
            },
          },
        ],
      ],
    },
    {
      include: /\/node_modules\//,
      presets: ['module:@react-native/babel-preset'],
    },
  ],
}

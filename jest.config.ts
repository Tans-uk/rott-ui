import {compilerOptions} from './tsconfig.json'

import {pathsToModuleNameMapper, type JestConfigWithTsJest} from 'ts-jest'
import {defaults as tsjPreset} from 'ts-jest/presets'

const isolatedModules = process.env.ISOLATED_MODULES === 'true'
const jestConfiguration: JestConfigWithTsJest = {
  ...tsjPreset,
  preset: 'react-native',
  coverageReporters: ['cobertura'],
  reporters: [
    'default',
    ['jest-junit', {outputDirectory: 'jest-test-reports', outputName: 'report.xml'}],
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js)$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        isolatedModules,
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      // React Native and its dependencies
      'react-native|' +
      '@react-native|' +
      'react-native-\\w*|' +
      // React Navigation ecosystem
      '@react-navigation/\\w*|' +
      // Community packages
      '@react-native-community/\\w*|' +
      '@react-native-clipboard/\\w*|' +
      '@react-native-firebase/\\w*|' +
      '@react-native-masked-view/\\w*|' +
      '@react-native/eslint-config|' +
      '@shopify/flash-list|' +
      // Third-party libraries used in the project that need transformation
      'jail-monkey|' +
      'redux-persist|' +
      'react-intl|' +
      'yup|' +
      'formik|' +
      'lottie-react-native|' +
      '@twotalltotems/react-native-otp-input|' +
      // Testing libraries
      'react-test-renderer|' +
      '@testing-library/react-native' +
      '))',
  ],
  // setupFiles: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleDirectories: [
    'node_modules',
    'utils',
    __dirname, // the root directory
  ],
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
    '^@babel/runtime/helpers/interopRequireDefault$':
      '<rootDir>/node_modules/@babel/runtime/helpers/interopRequireDefault',
    'tr-TR.json': '<rootDir>/src/libs/i18n/tr-TR.json',
    'en-US.json': '<rootDir>/src/libs/i18n/en-US.json',
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  silent: true,
  cacheDirectory: '<rootDir>/.jest-cache',
}

export default jestConfiguration

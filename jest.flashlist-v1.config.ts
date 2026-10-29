import baseConfiguration from './jest.config'

import {type JestConfigWithTsJest} from 'ts-jest'

// Runs the suites that render a FlashList against @shopify/flash-list 1.x, which
// the package still supports through its `>=1.8.0` peer range. The default run
// uses 2.x. Only these suites render the list; running every suite twice would
// duplicate snapshots that do not depend on FlashList.
// Read by scripts/snapshotResolver.js in the test workers, which inherit this env.
process.env.ROTT_FLASHLIST_V1 = 'true'

const jestConfiguration: JestConfigWithTsJest = {
  ...baseConfiguration,
  transform: {
    ...baseConfiguration.transform,
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.flashlist-v1.json',
        isolatedModules: process.env.ISOLATED_MODULES === 'true',
      },
    ],
  },
  moduleNameMapper: {
    ...baseConfiguration.moduleNameMapper,
    '^@shopify/flash-list$': '<rootDir>/node_modules/@shopify/flash-list-v1',
    '^@shopify/flash-list/(.*)$': '<rootDir>/node_modules/@shopify/flash-list-v1/$1',
  },
  testMatch: [
    '<rootDir>/src/features/List/__tests__/*.test.tsx',
    '<rootDir>/src/features/ActionMenu/__tests__/*.test.tsx',
    '<rootDir>/src/features/Input/__tests__/SelectInput.test.tsx',
    '<rootDir>/src/features/Input/__tests__/DateInput.test.tsx',
  ],
  snapshotResolver: '<rootDir>/scripts/snapshotResolver.js',
  cacheDirectory: '<rootDir>/.jest-cache/flashlist-v1',
}

export default jestConfiguration

declare module 'react-native-device-info/jest/react-native-device-info-mock'

type Nullable<T> = null | T

interface String {
  isEmpty: () => boolean
  toSeoFriendly: () => string
  toPascalCase: () => string
  toBalance: () => number
  toMaskName: (maskCharacter?: string) => string
  toMaskIban: (maskCharacter?: string) => string
}

interface Array<T> {
  /**
   * Sorts the array by the given key.
   * @param key The key to sort on
   * @param orderBy Sort direction (asc | desc). Defaults to `asc`, alphabetical
   */
  sortByKey(key: string, orderBy?: 'asc' | 'desc'): T[]
  /**
   *
   * @returns `true` when the array is empty, `false` otherwise.
   */
  isEmpty: () => boolean
  /**
   *
   * @returns `false` when the array is empty, `true` otherwise.
   */
  hasItems: () => boolean
}

import('./../node_modules/react-native-reanimated/src/reanimated2/globals')
typeof globalThis

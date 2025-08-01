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
   * Diziyi belirtilen anahtar değere göre sıralar.
   * @param key Sıralama yapılacak anahtar
   * @param orderBy Sıralama türü (asc | desc) - Varsayilan `asc` (Alfabetik Siralama)
   */
  sortByKey(key: string, orderBy?: 'asc' | 'desc'): T[]
  /**
   *
   * @returns Dizi boş ise `true` dolu ise `false` döner.
   */
  isEmpty: () => boolean
  /**
   *
   * @returns Dizi boş ise `false` dolu ise `true` döner.
   */
  hasItems: () => boolean
}

import('./../node_modules/react-native-reanimated/src/reanimated2/globals')
typeof globalThis

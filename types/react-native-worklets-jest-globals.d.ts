/**
 * react-native-worklets Jest mock assigns to globalThis; ts-jest typechecks that file.
 * Augment globalThis so strict mode does not fail on those properties.
 */
declare global {
  // eslint-disable-next-line no-var -- must be var for global augmentation
  var _WORKLET: boolean
  // eslint-disable-next-line no-var
  var __RUNTIME_KIND: unknown
  // eslint-disable-next-line no-var
  var _log: typeof console.log
  // eslint-disable-next-line no-var
  var _getAnimationTimestamp: () => number
}

export {}

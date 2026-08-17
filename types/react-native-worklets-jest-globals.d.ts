/**
 * react-native-worklets Jest mock assigns to globalThis; ts-jest typechecks that file.
 * Augment globalThis so strict mode does not fail on those properties.
 */
declare global {
  // `var` is required here: global augmentation ignores let/const.
  var _WORKLET: boolean
  var __RUNTIME_KIND: unknown
  var _log: typeof console.log
  var _getAnimationTimestamp: () => number
}

export {}

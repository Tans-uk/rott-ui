/**
 * Used by react-test-renderer when set before TestRenderer.create (see jest.setup.ts).
 */
declare global {
  // `var` is required here: global augmentation ignores let/const.
  var IS_REACT_NATIVE_TEST_ENVIRONMENT: boolean | undefined
}

export {}

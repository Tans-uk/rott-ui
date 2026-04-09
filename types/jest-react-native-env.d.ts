/**
 * Used by react-test-renderer when set before TestRenderer.create (see jest.setup.ts).
 */
declare global {
  // eslint-disable-next-line no-var -- global flag for react-test-renderer
  var IS_REACT_NATIVE_TEST_ENVIRONMENT: boolean | undefined
}

export {}

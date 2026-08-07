/* eslint-disable no-undef */
/**
 * Minimal setup for consumer-side tests.
 *
 * Deliberately not reusing the library's own jest.setup.ts: that file is written for
 * the root ts-jest transform and references an out-of-scope import inside a
 * jest.mock() factory, which babel-jest rejects. Mocking only the native modules an
 * app actually has to mock also keeps this closer to a real consumer setup.
 */
require('@testing-library/jest-native/extend-expect')
const {configure} = require('@testing-library/react-native')

global.IS_REACT_NATIVE_TEST_ENVIRONMENT = true
configure({concurrentRoot: false})

jest.mock('react-native-device-info', () =>
  require('react-native-device-info/jest/react-native-device-info-mock')
)

jest.mock('react-native-keyboard-controller', () => require('react-native-keyboard-controller/jest'))

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker')

jest.mock('react-native-date-picker', () => 'DatePicker')

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}

  return {
    SafeAreaProvider: ({children}) => children,
    SafeAreaConsumer: ({children}) => children(inset),
    SafeAreaView: ({children}) => children,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => ({height: 800, width: 340, x: 0, y: 0}),
  }
})

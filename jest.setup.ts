/* eslint-disable no-console */
import en from './src/libs/i18n/en-US.json'

import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'

import '@shopify/flash-list/jestSetup'
import '@testing-library/jest-native/extend-expect'

import {act, render as rtlRender} from '@testing-library/react-native'

export const mockRNCNetInfo = require('@react-native-community/netinfo/jest/netinfo-mock')
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo)

require('react-native-reanimated').setUpTests()

jest.mock('react-native-device-info', () => mockRNDeviceInfo)

jest.mock('react-intl', () => {
  const reactIntl = jest.requireActual('react-intl')
  const intl = reactIntl.createIntl({
    locale: 'en-US',
    messages: en, //jest.fn().mockReturnValue(en),
  })

  return {
    ...reactIntl,
    useIntl: () => intl,
  }
})

// Mock RottUiContext for tests
jest.mock('react', () => {
  const React = jest.requireActual('react')
  const originalUseContext = React.useContext

  return {
    ...React,
    useContext: jest.fn((context) => {
      // Check if it's RottUiContext being requested
      if (
        (context && context.displayName === 'RottUiContext') ||
        (context && context._currentValue && context._currentValue.language)
      ) {
        return {
          language: {
            name: 'en-US',
          },
          hasDynamicIsland: false,
          hasNotch: false,
          deviceInfo: {
            operatingSystemVersion: '17.0',
            apiLevel: 33,
            totalMemory: 8000000000,
          },
        }
      }
      // For other contexts, use the original useContext
      return originalUseContext(context)
    }),
  }
})

beforeEach(() => {
  jest.clearAllTimers()
})

// TODO: KRITIK - KONTROL EDİLMELİ
// jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)
jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  const frame = {height: 800, width: 340, x: 0, y: 0}

  return {
    SafeAreaProvider: jest.fn().mockImplementation(({children}) => children),
    SafeAreaConsumer: jest.fn().mockImplementation(({children}) => children(inset)),
    SafeAreaView: jest.fn().mockImplementation(({children}) => children),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
    useSafeAreaFrame: jest.fn().mockImplementation(() => frame),
  }
})

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')
jest.mock('react-native/Libraries/Interaction/InteractionManager', () => {
  return {
    runAfterInteractions: jest.fn(),
    clearInteractionHandle: jest.fn(),
    createInteractionHandle: jest.fn(),
  }
})

// Tüm testleri act ile sarmalama
declare global {
  var render: (
    ui: React.ReactElement<any>,
    options?: Parameters<typeof rtlRender>[1]
  ) => ReturnType<typeof rtlRender>
}

const originalRender = rtlRender
global.render = (ui, options) => {
  let result
  act(() => {
    result = originalRender(ui, options)
  })

  return result!
}

jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest')
)

jest.mock('react-native-edge-to-edge', () => {
  const {View} = require('react-native')

  return {
    SystemBars: View,
  }
})

jest.mock('./src/hooks/useSafeArea', () => ({
  useSafeArea: jest.fn(() => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })),
}))

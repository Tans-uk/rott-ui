/* eslint-disable no-console */
import en from './src/libs/i18n/en-US.json'

import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'

import '@shopify/flash-list/jestSetup'
import '@testing-library/jest-native/extend-expect'

import {act, render as rtlRender} from '@testing-library/react-native'

export const mockRNCNetInfo = require('@react-native-community/netinfo/jest/netinfo-mock')
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo)

// Mock react-native-reanimated with a complete custom implementation
jest.mock('react-native-reanimated', () => {
  const mockAnimation = {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    reset: jest.fn(),
  }

  const mockValue = (value: any) => ({
    setValue: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    interpolate: jest.fn(),
    animate: jest.fn(),
    stopAnimation: jest.fn(),
    resetAnimation: jest.fn(),
    _value: value,
    _animation: mockAnimation,
  })

  return {
    default: {
      View: require('react-native').View,
      Text: require('react-native').Text,
      Image: require('react-native').Image,
      ScrollView: require('react-native').ScrollView,
      FlatList: require('react-native').FlatList,

      // Animation functions
      timing: jest.fn(() => mockAnimation),
      spring: jest.fn(() => mockAnimation),
      decay: jest.fn(() => mockAnimation),
      sequence: jest.fn(() => mockAnimation),
      parallel: jest.fn(() => mockAnimation),
      stagger: jest.fn(() => mockAnimation),
      loop: jest.fn(() => mockAnimation),
      delay: jest.fn(() => mockAnimation),

      // Value functions
      Value: jest.fn((value) => mockValue(value)),
      Clock: jest.fn(() => mockValue(0)),
      Node: jest.fn(),

      // Easing
      Easing: {
        linear: jest.fn(),
        ease: jest.fn(),
        quad: jest.fn(),
        cubic: jest.fn(),
        poly: jest.fn(),
        sin: jest.fn(),
        circle: jest.fn(),
        exp: jest.fn(),
        elastic: jest.fn(),
        back: jest.fn(),
        bounce: jest.fn(),
        bezier: jest.fn(),
        in: jest.fn(),
        out: jest.fn(),
        inOut: jest.fn(),
      },

      // Operators
      add: jest.fn((a, b) => mockValue(a + b)),
      sub: jest.fn((a, b) => mockValue(a - b)),
      multiply: jest.fn((a, b) => mockValue(a * b)),
      divide: jest.fn((a, b) => mockValue(a / b)),
      pow: jest.fn((a, b) => mockValue(a ** b)),
      modulo: jest.fn((a, b) => mockValue(a % b)),
      sqrt: jest.fn((a) => mockValue(Math.sqrt(a))),
      sin: jest.fn((a) => mockValue(Math.sin(a))),
      cos: jest.fn((a) => mockValue(Math.cos(a))),
      tan: jest.fn((a) => mockValue(Math.tan(a))),
      acos: jest.fn((a) => mockValue(Math.acos(a))),
      asin: jest.fn((a) => mockValue(Math.asin(a))),
      atan: jest.fn((a) => mockValue(Math.atan(a))),
      exp: jest.fn((a) => mockValue(Math.exp(a))),
      round: jest.fn((a) => mockValue(Math.round(a))),
      floor: jest.fn((a) => mockValue(Math.floor(a))),
      ceil: jest.fn((a) => mockValue(Math.ceil(a))),
      abs: jest.fn((a) => mockValue(Math.abs(a))),

      // Comparison
      eq: jest.fn((a, b) => mockValue(a === b ? 1 : 0)),
      neq: jest.fn((a, b) => mockValue(a !== b ? 1 : 0)),
      lessThan: jest.fn((a, b) => mockValue(a < b ? 1 : 0)),
      lessOrEq: jest.fn((a, b) => mockValue(a <= b ? 1 : 0)),
      greaterThan: jest.fn((a, b) => mockValue(a > b ? 1 : 0)),
      greaterOrEq: jest.fn((a, b) => mockValue(a >= b ? 1 : 0)),

      // Logic
      and: jest.fn((a, b) => mockValue(a && b)),
      or: jest.fn((a, b) => mockValue(a || b)),
      not: jest.fn((a) => mockValue(!a)),

      // Control flow
      cond: jest.fn((condition, ifBlock, elseBlock) => mockValue(condition ? ifBlock : elseBlock)),
      block: jest.fn((items) => mockValue(items[items.length - 1])),
      call: jest.fn((_f: any, ...args: any[]) => args[0]),
      set: jest.fn((_dest, src) => mockValue(src)),

      // Clock functions
      clockRunning: jest.fn((_clock) => mockValue(0)),
      startClock: jest.fn(),
      stopClock: jest.fn(),

      // Hooks
      useSharedValue: jest.fn((value) => ({value})),
      useDerivedValue: jest.fn((fn) => ({value: fn()})),
      useAnimatedStyle: jest.fn((fn) => fn()),
      useAnimatedGestureHandler: jest.fn((handlers) => handlers),
      useAnimatedScrollHandler: jest.fn((handler) => handler),
      useAnimatedReaction: jest.fn(),
      useWorkletCallback: jest.fn((fn) => fn),

      // Animation functions for new API
      withTiming: jest.fn((value) => value),
      withSpring: jest.fn((value) => value),
      withDecay: jest.fn((value) => value),
      withSequence: jest.fn((...values) => values[values.length - 1]),
      withDelay: jest.fn((_, value) => value),
      withRepeat: jest.fn((value) => value),

      // Gesture handler
      runOnJS: jest.fn((fn) => fn),
      runOnUI: jest.fn((fn) => fn),

      // Layout animations
      Layout: {
        springify: jest.fn(),
        damping: jest.fn(),
        stiffness: jest.fn(),
        mass: jest.fn(),
        duration: jest.fn(),
        delay: jest.fn(),
      },

      // Entering/Exiting animations
      FadeIn: {duration: jest.fn()},
      FadeOut: {duration: jest.fn()},
      SlideInLeft: {duration: jest.fn()},
      SlideInRight: {duration: jest.fn()},
      SlideInUp: {duration: jest.fn()},
      SlideInDown: {duration: jest.fn()},
      SlideOutLeft: {duration: jest.fn()},
      SlideOutRight: {duration: jest.fn()},
      SlideOutUp: {duration: jest.fn()},
      SlideOutDown: {duration: jest.fn()},
    },

    // Export commonly used items at module level too
    View: require('react-native').View,
    Text: require('react-native').Text,
    Image: require('react-native').Image,
    ScrollView: require('react-native').ScrollView,
    FlatList: require('react-native').FlatList,
    useSharedValue: jest.fn((value) => ({value})),
    useDerivedValue: jest.fn((fn) => ({value: fn()})),
    useAnimatedStyle: jest.fn((fn) => fn()),
    withTiming: jest.fn((value) => value),
    withSpring: jest.fn((value) => value),
    runOnJS: jest.fn((fn) => fn),
    runOnUI: jest.fn((fn) => fn),
  }
})

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

// Mock theme icons
jest.mock('./src/theme', () => {
  const React = require('react')
  const {Text} = require('react-native')

  const MockIcon = React.forwardRef((props: any, ref: any) =>
    React.createElement(Text, {ref, testID: 'mock-icon', ...props}, 'MockIcon')
  )
  MockIcon.default = MockIcon

  return {
    theme: {
      icons: new Proxy(
        {},
        {
          get() {
            return MockIcon
          },
        }
      ),
      colors: {
        primary: '#00A9CE',
        white: '#FFFFFF',
        black: '#111111',
        warning: '#FF7518',
      },
    },
  }
})

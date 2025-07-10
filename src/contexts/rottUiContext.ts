import {createContext} from 'react'

import {Platform, StatusBar} from 'react-native'

import {RottUiContextModel} from '@models/rottUiContextModel.interface'

import {
  getApiLevelSync,
  getSystemVersion,
  getTotalMemorySync,
  hasDynamicIsland,
  hasNotch,
} from 'react-native-device-info'

export const RottUiContext = createContext<RottUiContextModel>({
  language: {
    name: 'en-US',
  },
  hasDynamicIsland: hasDynamicIsland(),
  hasNotch:
    !hasNotch() && Platform.OS === 'android' && StatusBar.currentHeight! > 24 ? true : hasNotch(),
  deviceInfo: {
    operatingSystemVersion: getSystemVersion(),
    apiLevel: getApiLevelSync(),
    totalMemory: getTotalMemorySync(),
  },
})

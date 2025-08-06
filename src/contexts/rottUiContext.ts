import {createContext} from 'react'

import {Platform, StatusBar} from 'react-native'

import {RottUiContextModel} from '../models/rottUiContextModel.interface'
import {defaultThemeConfig} from '../providers/defaultThemeConfig'

import {
  getApiLevelSync,
  getSystemVersion,
  getTotalMemorySync,
  hasDynamicIsland,
  hasNotch,
} from 'react-native-device-info'

export const RottUiContext = createContext<RottUiContextModel>({
  deviceInfo: {
    operatingSystemVersion: getSystemVersion(),
    apiLevel: getApiLevelSync(),
    totalMemory: getTotalMemorySync(),
    hasDynamicIsland: hasDynamicIsland(),
    hasNotch:
      !hasNotch() && Platform.OS === 'android' && StatusBar.currentHeight! > 24 ? true : hasNotch(),
  },
  ...defaultThemeConfig,
})

import {createContext} from 'react'

import {Platform, StatusBar} from 'react-native'

import {Language, RottUiContextModel} from '../models'

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

  setLanguage: (_language: Language) => {},
})

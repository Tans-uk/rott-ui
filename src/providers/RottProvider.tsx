import {type FC, type PropsWithChildren} from 'react'

import {Platform, StatusBar} from 'react-native'

import {RottUiContext} from '../contexts'
import {
  ActionMenuProvider,
  AlertDialogProvider,
  ModalProvider,
  NotificationProvider,
} from '../features'
import {ThemeConfig} from '../models/themeConfig.interface'
import {defaultThemeConfig} from './defaultThemeConfig'

import {
  getApiLevelSync,
  getSystemVersion,
  getTotalMemorySync,
  hasDynamicIsland,
  hasNotch,
} from 'react-native-device-info'
import {SafeAreaProvider} from 'react-native-safe-area-context'

interface RottProviderProps<TTheme extends ThemeConfig> extends PropsWithChildren {
  themeConfig?: TTheme
}

export const RottProvider: FC<RottProviderProps<ThemeConfig>> = ({children, themeConfig}) => {
  return (
    <SafeAreaProvider>
      <RottUiContext.Provider
        value={{
          deviceInfo: {
            operatingSystemVersion: getSystemVersion(),
            apiLevel: getApiLevelSync(),
            totalMemory: getTotalMemorySync(),
            hasDynamicIsland: hasDynamicIsland(),
            hasNotch:
              !hasNotch() && Platform.OS === 'android' && StatusBar.currentHeight! > 24
                ? true
                : hasNotch(),
          },
          ...(themeConfig ?? defaultThemeConfig),
        }}>
        <NotificationProvider>
          <ModalProvider>
            <ActionMenuProvider>
              <AlertDialogProvider>{children}</AlertDialogProvider>
            </ActionMenuProvider>
          </ModalProvider>
        </NotificationProvider>
      </RottUiContext.Provider>
    </SafeAreaProvider>
  )
}

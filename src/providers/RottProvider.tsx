import React, {type FC, type PropsWithChildren} from 'react'

import {initialState, RottUiContext} from '../contexts'
import {
  ActionMenuProvider,
  AlertDialogProvider,
  ModalProvider,
  NotificationProvider,
} from '../features'
import {languageMessages} from '../libs'
import {setActiveLanguage} from '../libs/i18n/utils/activeLanguage'
import {Language, ThemeConfig} from '../models'
import {theme} from '../theme'

import {IntlProvider} from 'react-intl'

import {KeyboardProvider} from 'react-native-keyboard-controller'
import {SafeAreaProvider} from 'react-native-safe-area-context'

interface RottProviderProps extends PropsWithChildren {
  config?: Partial<ThemeConfig>
}

/** Use theme (respects rott.config; empty config = only consumer assets) */
export let themeConfig: ThemeConfig = {
  ...theme,
}

export const RottProvider: FC<RottProviderProps> = ({children, config}) => {
  if (config) {
    themeConfig = {
      ...themeConfig,
      ...config,
      // rott.config (theme) wins on collisions; config supplements per-record
      options: {...config.options, ...theme.options},
      colors: {...config.colors, ...theme.colors},
      images: {...config.images, ...theme.images},
      icons: {...config.icons, ...theme.icons},
      fontSizes: {...config.fontSizes, ...theme.fontSizes},
      fontFamilies: {...config.fontFamilies, ...theme.fontFamilies},
      fontWeights: {...config.fontWeights, ...theme.fontWeights},
    }
  }
  const defaultLanguage: Language = {name: 'en-US'}
  const language: Language = config?.options?.language ?? theme.options?.language
  const resolvedLanguage =
    language && Object.keys(languageMessages).includes(language.name) ? language : defaultLanguage

  // formatMessage is not a hook, so it reads the language from here instead of context.
  setActiveLanguage(resolvedLanguage.name)

  return (
    <SafeAreaProvider>
      <RottUiContext.Provider
        value={{
          ...initialState,
          language: resolvedLanguage,
        }}>
        <IntlProvider
          defaultLocale={defaultLanguage.name}
          locale={resolvedLanguage.name}
          messages={languageMessages[resolvedLanguage.name as keyof typeof languageMessages]}>
          <KeyboardProvider enabled={true}>
            <NotificationProvider>
              <ModalProvider>
                <ActionMenuProvider>
                  <AlertDialogProvider>{children}</AlertDialogProvider>
                </ActionMenuProvider>
              </ModalProvider>
            </NotificationProvider>
          </KeyboardProvider>
        </IntlProvider>
      </RottUiContext.Provider>
    </SafeAreaProvider>
  )
}

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
  /**
   * When true, the app ignores touches while a notification is visible — the behavior
   * before 0.10.0. Off by default.
   */
  blockTouchesWhileNotificationVisible?: boolean
}

/** Use theme (respects rott.config; empty config = only consumer assets) */
const baseThemeConfig: ThemeConfig = {
  ...theme,
}
export let themeConfig: ThemeConfig = baseThemeConfig

export const RottProvider: FC<RottProviderProps> = ({
  children,
  config,
  blockTouchesWhileNotificationVisible,
}) => {
  const defaultLanguage: Language = {name: 'en-US'}
  const language: Language = config?.options?.language ?? theme.options?.language
  const resolvedLanguage =
    language && Object.keys(languageMessages).includes(language.name) ? language : defaultLanguage

  // Rebuilt from the base on every render, so keys of an earlier config never linger and
  // removing config restores the base.
  themeConfig = config
    ? {
        ...baseThemeConfig,
        ...config,
        // rott.config (theme) wins on collisions; config supplements per-record. The language
        // is the resolved one, which IntlProvider and formatMessage use too.
        options: {...config.options, ...theme.options, language: resolvedLanguage},
        colors: {...config.colors, ...theme.colors},
        images: {...config.images, ...theme.images},
        icons: {...config.icons, ...theme.icons},
        fontSizes: {...config.fontSizes, ...theme.fontSizes},
        fontFamilies: {...config.fontFamilies, ...theme.fontFamilies},
        fontWeights: {...config.fontWeights, ...theme.fontWeights},
      }
    : baseThemeConfig

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
            <NotificationProvider blockTouchesWhileVisible={blockTouchesWhileNotificationVisible}>
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

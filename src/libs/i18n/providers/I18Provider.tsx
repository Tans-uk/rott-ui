import React, {type FC, type PropsWithChildren} from 'react'

import {en, tr} from '../../../libs'
import {theme} from '../../../theme'

import {IntlProvider} from 'react-intl'

export const languageMessages = {
  'tr-TR': tr,
  'en-US': en,
}

export const I18nProvider: FC<PropsWithChildren> = ({children}) => {
  const appLanguage = theme.options?.appLanguage

  return (
    <IntlProvider
      defaultLocale='en-US'
      locale={appLanguage?.name ?? 'en-US'}
      messages={
        appLanguage?.name
          ? languageMessages[(appLanguage?.name as 'tr-TR') || 'en-US']
          : languageMessages['en-US']
      }>
      {children}
    </IntlProvider>
  )
}

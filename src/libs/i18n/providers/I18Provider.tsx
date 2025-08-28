import React, {type FC, type PropsWithChildren} from 'react'

import {theme} from '../../../theme'
import en from '../en-US.json'
import tr from '../tr-TR.json'

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

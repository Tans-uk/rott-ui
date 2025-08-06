import {useContext, type FC, type PropsWithChildren} from 'react'

import {RottUiContext} from '../../../contexts'
import {en, tr} from '../../../libs'

import {IntlProvider} from 'react-intl'

export const languageMessages = {
  'tr-TR': tr,
  'en-US': en,
}

export const I18nProvider: FC<PropsWithChildren> = ({children}) => {
  const {language} = useContext(RottUiContext)
  const appLanguage = language

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

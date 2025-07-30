/* eslint-disable react-hooks/rules-of-hooks */
import {useContext} from 'react'

import {
  createIntl,
  createIntlCache,
  useIntl,
  type MessageDescriptor,
  type PrimitiveType,
} from 'react-intl'

import '@utils/arrayExtensions'
import '@utils/stringExtensions'

import {RottUiContext} from '../../../contexts'
import {languageMessages} from '../providers'
import type {TranslationLanguageTypes} from './models'

/**
 *
 * @param {TranslationLanguageTypes} key Dil dosyasında yazılı olan anahtar kelime. Örn: Common.Hello -> Türkçe Merhaba, İngilizce Hello şeklinde çıktı verir.
 * @param {Record<string, PrimitiveType | any | undefined>} extraMessages Dil dosyasında kullanılan anahtar keline eğer ekstra parametre alıyorsa obje şeklinde verilmelidir. Örn, {name: 'Cindoruk'}}.
 *
 * @returns {string} Seçilen dil içinde yer alan anahtar kelimeye karşılık geren çeviriyi ekrana getirir. Verilen key seçilen dil dosyasında yoksa "failed" olarak sonuç döner.
 *
 */
export const translator = (
  key: TranslationLanguageTypes,
  extraMessages?: Record<string, PrimitiveType | any | undefined>
): string => {
  const intl = useIntl()

  if (!key?.isEmpty()) return intl?.formatMessage({id: `${key}`}, extraMessages)
  else return 'failed'
}

export const formatMessage = (
  message: TranslationLanguageTypes,
  extraMessages?: Record<string, PrimitiveType | any | undefined>,
  descriptor?: MessageDescriptor
): string => {
  const cache = createIntlCache()
  const {language} = useContext(RottUiContext)

  const intl = createIntl(
    {
      locale: language?.name ?? 'en-US',
      messages:
        Object.entries(languageMessages).find((key) => key[0] === language?.name)?.[1] ??
        languageMessages['en-US'],
    },
    cache
  )

  return intl.formatMessage(descriptor ? descriptor : {id: `${message}`}, extraMessages)
}

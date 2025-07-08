/* eslint-disable react-hooks/rules-of-hooks */
import {
  createIntl,
  createIntlCache,
  useIntl,
  type MessageDescriptor,
  type PrimitiveType,
} from 'react-intl'

import '../arrayExtensions'
import '../stringExtensions'

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
  const selectedLang = store.getState().app.lang

  const intl = createIntl(
    {
      locale: selectedLang?.name ?? 'tr-TR',
      messages:
        Object.entries(languageMessages).find((key) => key[0] === selectedLang?.name)?.[1] ??
        languageMessages['tr-TR'],
    },
    cache
  )

  return intl.formatMessage(descriptor ? descriptor : {id: `${message}`}, extraMessages)
}

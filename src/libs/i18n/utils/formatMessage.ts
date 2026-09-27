import {
  createIntl,
  createIntlCache,
  type IntlShape,
  type MessageDescriptor,
  type PrimitiveType,
} from 'react-intl'

import '../../../utils/arrayExtensions'
import '../../../utils/stringExtensions'

import {languageMessages} from '../constants'
import {getActiveLanguage} from './activeLanguage'
import type {TranslationLanguageTypes} from './models'

const intlCache = createIntlCache()
const intlByLocale = new Map<string, IntlShape>()

const getIntl = (locale: string): IntlShape => {
  const cached = intlByLocale.get(locale)
  if (cached) return cached

  const messages = Object.prototype.hasOwnProperty.call(languageMessages, locale)
    ? languageMessages[locale as keyof typeof languageMessages]
    : languageMessages['en-US']
  const intl = createIntl({locale, messages}, intlCache)
  intlByLocale.set(locale, intl)

  return intl
}

/**
 * Translates a key from the library's language files into the active language.
 *
 * Not a hook: it can be called during render, inside event handlers, or outside React.
 * The active language follows the most recently rendered RottProvider and defaults to en-US.
 *
 * @param {TranslationLanguageTypes} message The key written in the language file. Example: Common.Hello -> Outputs "Merhaba" in Turkish, "Hello" in English.
 * @param {Record<string, PrimitiveType | any | undefined>} extraMessages Values for the placeholders in the message. Example: {name: 'Cindoruk'}.
 * @param {MessageDescriptor} descriptor A full descriptor to use instead of the key. Example: {id: 'Common.Hello', defaultMessage: 'Hello'}.
 *
 * @returns {string} The translation in the active language. A key without a translation is returned as is.
 */
export const formatMessage = (
  message: TranslationLanguageTypes,
  extraMessages?: Record<string, PrimitiveType | any | undefined>,
  descriptor?: MessageDescriptor
): string =>
  getIntl(getActiveLanguage()).formatMessage(descriptor ?? {id: `${message}`}, extraMessages)

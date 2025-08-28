/* eslint-disable react-hooks/rules-of-hooks */
import {useContext} from 'react'

import {createIntl, createIntlCache, type MessageDescriptor, type PrimitiveType} from 'react-intl'

import '../../../utils/arrayExtensions'
import '../../../utils/stringExtensions'

import {RottUiContext} from '../../../contexts'
import {languageMessages} from '../providers'
import type {TranslationLanguageTypes} from './models'

/**
 *
 * @param {TranslationLanguageTypes} message The key written in the language file. Example: Common.Hello -> Outputs "Merhaba" in Turkish, "Hello" in English.
 * @param {Record<string, PrimitiveType | any | undefined>} extraMessages If the key in the language file requires extra parameters, they should be provided as an object. Example: {name: 'Cindoruk'}.
 * @param {MessageDescriptor} descriptor If the key in the language file requires extra parameters, they should be provided as an object. Example: {id: 'Common.Hello', defaultMessage: 'Hello'}.
 *
 * @returns {string} Returns the translation corresponding to the given key in the selected language. If the key does not exist in the selected language file, returns "failed".
 *
 */
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

import {TranslationLanguageTypes} from '../utils'

import {PrimitiveType, useIntl} from 'react-intl'

/**
 * @description This hook is used to return the translator function to be used.
 */
export const useTranslator = (): {
  translator: (
    key: TranslationLanguageTypes,
    extraMessages?: Record<string, PrimitiveType | any | undefined>
  ) => string
} => {
  const intl = useIntl()

  /**
   *
   * @param {TranslationLanguageTypes} key The key written in the language file. Example: Common.Hello -> Outputs "Merhaba" in Turkish, "Hello" in English.
   * @param {Record<string, PrimitiveType | any | undefined>} extraMessages If the key in the language file requires extra parameters, they should be provided as an object. Example: {name: 'Cindoruk'}.
   *
   * @returns {string} Returns the translation corresponding to the given key in the selected language. If the key does not exist in the selected language file, returns "failed".
   *
   */
  const translator = (
    key: TranslationLanguageTypes,
    extraMessages?: Record<string, PrimitiveType | any | undefined>
  ): string => {
    if (!key?.isEmpty()) return intl?.formatMessage({id: `${key}`}, extraMessages)
    else return 'failed'
  }

  return {
    translator,
  }
}

const DEFAULT_LANGUAGE = 'en-US'

let activeLanguage = DEFAULT_LANGUAGE

/**
 * Name of the language formatMessage translates into. RottProvider sets it on every
 * render, so it follows the provider's resolved language. This module is left out of
 * the utils barrel on purpose: it is internal state, not public API.
 */
export const getActiveLanguage = (): string => activeLanguage

export const setActiveLanguage = (name: string): void => {
  activeLanguage = name || DEFAULT_LANGUAGE
}

import React from 'react'

import en from '../en-US.json'
import {useTranslator} from '../hooks'
import {TranslationLanguageTypes} from '../utils'

import {renderHook} from '@testing-library/react-hooks'
import {IntlProvider} from 'react-intl'

describe('Hook -> useTranslator', () => {
  const wrapper = ({children, locale = 'en-US', messages = en}: any) => (
    <IntlProvider defaultLocale={locale} locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )

  it('should return an object with translator function', () => {
    const {result} = renderHook(() => useTranslator(), {
      wrapper,
    })
    expect(result.current.translator).toBeInstanceOf(Function)
  })

  it('should translate a key', () => {
    const {result} = renderHook(() => useTranslator(), {
      wrapper,
    })
    expect(result.current.translator('COMMON.COPY')).toBe(en['COMMON.COPY'])
  })

  it('should interpolate params in translation', () => {
    const {result} = renderHook(() => useTranslator(), {
      wrapper,
    })
    expect(result.current.translator('TEST.WITH.PARAM', {testText: 'foo'})).toBe(
      en['TEST.WITH.PARAM'].replace('{testText}', 'foo')
    )
  })

  it('should return the key if translation is missing', () => {
    const {result} = renderHook(() => useTranslator(), {
      wrapper,
    })
    expect(result.current.translator('NON_EXISTENT_KEY' as TranslationLanguageTypes)).toBe(
      'NON_EXISTENT_KEY'
    )
  })
})

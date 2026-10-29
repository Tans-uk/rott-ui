import en from '../en-US.json'
import tr from '../tr-TR.json'
import {formatMessage} from '../utils'
import {setActiveLanguage} from '../utils/activeLanguage'

describe('Util -> FormatMessage', () => {
  afterEach(() => {
    setActiveLanguage('en-US')
  })

  it('matches the English locale snapshot', () => {
    expect(en).toMatchSnapshot()
  })

  it('matches the Turkish locale snapshot', () => {
    expect(tr).toMatchSnapshot()
  })

  it('keeps the Turkish locale keys in step with the English ones', () => {
    const turkishLanguageKeys = Object.keys(tr)
    const englishLanguageKeys = Object.keys(en)

    expect(turkishLanguageKeys).toStrictEqual(englishLanguageKeys)
  })

  it('shows the valid value passed to formatMessage', () => {
    const translatedString = formatMessage('TEST')

    expect(translatedString).toBe(en.TEST)
  })

  it('appends an extra message to the given key and returns the joined result.', () => {
    const translatedString = formatMessage('TEST.WITH.PARAM', {testText: 'test'})

    expect(translatedString).toBe(en['TEST.WITH.PARAM'].replace('{testText}', 'test'))
  })

  it('translates into the active language', () => {
    setActiveLanguage('tr-TR')

    expect(formatMessage('COMMON.OK')).toBe(tr['COMMON.OK'])
  })

  it('falls back to English for a language without messages', () => {
    setActiveLanguage('de-DE')

    expect(formatMessage('COMMON.OK')).toBe(en['COMMON.OK'])
  })
})

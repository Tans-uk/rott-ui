import en from '../en-US.json'
import tr from '../tr-TR.json'
import {formatMessage} from '../utils'

describe('Util -> FormatMessage', () => {
  it('english dil snapshotı eşleşmeli', () => {
    expect(en).toMatchSnapshot()
  })

  it('türkçe dil snapshotı eşleşmeli', () => {
    expect(tr).toMatchSnapshot()
  })

  it('türkçe dil keyleri english dil keyleri ile eşleşmeli', () => {
    const turkishLanguageKeys = Object.keys(tr)
    const englishLanguageKeys = Object.keys(en)

    expect(turkishLanguageKeys).toStrictEqual(englishLanguageKeys)
  })

  it('formatMessage metoduna verilen geçerli değeri ekranda göstermeli', () => {
    const translatedString = formatMessage('TEST')

    expect(translatedString).toBe(en.TEST)
  })

  it('formatMessage verilen key ile birlikte ekstra mesaj yazılması gerekiyorsa onu birleştirip dönmelidir.', () => {
    const translatedString = formatMessage('TEST.WITH.PARAM', {testText: 'test'})

    expect(translatedString).toBe(en['TEST.WITH.PARAM'].replace('{testText}', 'test'))
  })
})

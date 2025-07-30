import {en, formatMessage, tr, translator} from '../../../../libs'

describe('Util -> Translator', () => {
  it('english dil snapshotı eşleşmeli', () => {
    expect(en).toMatchSnapshot()
  })

  it('türkçe dil snapshotı eşleşmeli', () => {
    expect(tr).toMatchSnapshot()
  })

  it('translator metoduna verilen geçerli değeri ekranda göstermeli', () => {
    const translatedString = translator('TEST')

    expect(translatedString).toBe(en.TEST)
  })

  it('türkçe dil keyleri english dil keyleri ile eşleşmeli', () => {
    const turkishLanguageKeys = Object.keys(tr)
    const englishLanguageKeys = Object.keys(en)

    expect(turkishLanguageKeys).toStrictEqual(englishLanguageKeys)
  })

  it('translator verilen key ile birlikte ekstra mesaj yazılması gerekiyorsa onu birleştirip dönmelidir.', () => {
    const translatedString = translator('TEST.WITH.PARAM', {testText: 'test'})

    expect(translatedString).toBe('TEST WITH test')
  })
})

describe('Util -> FormatMessage', () => {
  it('formatMessage metoduna verilen geçerli değeri ekranda göstermeli', () => {
    const translatedString = formatMessage('TEST', undefined, undefined)

    expect(translatedString).toBe(en.TEST)
  })
})

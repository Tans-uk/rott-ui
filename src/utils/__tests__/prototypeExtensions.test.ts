import '../arrayExtensions'
import '../stringExtensions'

const enumerableKeys = (value: object) => {
  const keys: string[] = []
  for (const key in value) keys.push(key)

  return keys
}

describe('prototype extensions', () => {
  it('keeps for...in over an array limited to its indices', () => {
    expect(enumerableKeys([1, 2])).toEqual(['0', '1'])
  })

  it('keeps for...in over a string limited to its indices', () => {
    expect(enumerableKeys(new String('ab'))).toEqual(['0', '1'])
  })

  it('keeps the helpers callable', () => {
    expect([].isEmpty()).toBe(true)
    expect([{name: 'b'}, {name: 'a'}].sortByKey('name')).toEqual([{name: 'a'}, {name: 'b'}])
    expect('  '.isEmpty()).toBe(true)
    expect('Ahmet Yilmaz'.toMaskName()).toBe('Ah*** Yi****')
  })
})

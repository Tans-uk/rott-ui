import {inputIconGapNormalizer} from '../inputIconGapNormalizer'

describe('inputIconGapNormalizer', () => {
  it('returns 4 for xs/sm', () => {
    expect(inputIconGapNormalizer('xs')).toBe(4)
    expect(inputIconGapNormalizer('sm')).toBe(4)
  })
  it('returns 8 for md and for undefined', () => {
    expect(inputIconGapNormalizer('md')).toBe(8)
    expect(inputIconGapNormalizer(undefined)).toBe(8)
  })
  it('returns 12 for lg/xl/xxl/full', () => {
    expect(inputIconGapNormalizer('lg')).toBe(12)
    expect(inputIconGapNormalizer('xl')).toBe(12)
    expect(inputIconGapNormalizer('xxl')).toBe(12)
    expect(inputIconGapNormalizer('full')).toBe(12)
  })
})

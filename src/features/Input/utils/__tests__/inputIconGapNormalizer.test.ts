import {inputIconGapNormalizer} from '../inputIconGapNormalizer'

describe('inputIconGapNormalizer', () => {
  it('xs/sm için 4 döner', () => {
    expect(inputIconGapNormalizer('xs')).toBe(4)
    expect(inputIconGapNormalizer('sm')).toBe(4)
  })
  it('md ve tanımsız için 8 döner', () => {
    expect(inputIconGapNormalizer('md')).toBe(8)
    expect(inputIconGapNormalizer(undefined)).toBe(8)
  })
  it('lg/xl/xxl/full için 12 döner', () => {
    expect(inputIconGapNormalizer('lg')).toBe(12)
    expect(inputIconGapNormalizer('xl')).toBe(12)
    expect(inputIconGapNormalizer('xxl')).toBe(12)
    expect(inputIconGapNormalizer('full')).toBe(12)
  })
})

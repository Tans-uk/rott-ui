import {Dimensions} from 'react-native'

import {fontSizeNormalizer} from '../fontSizeNormalizer'

// Local mocks override the global jest.setup theme/providers mocks so the
// fontSizes map is fully controlled for this unit.
jest.mock('../../theme', () => ({
  theme: {
    fontSizes: {md: 14, '3xl': 36, custom: 50},
  },
}))

jest.mock('../../providers/RottProvider', () => ({
  themeConfig: {
    fontSizes: {providerOnly: 99},
  },
}))

describe('fontSizeNormalizer', () => {
  afterEach(() => jest.restoreAllMocks())

  const mockWidth = (width: number) =>
    jest.spyOn(Dimensions, 'get').mockReturnValue({width, height: 800, scale: 2, fontScale: 2})

  it('resolves a configured token (3xl) to its theme.fontSizes value', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('3xl')).toBe(36)
  })

  it('resolves a custom configured token', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('custom')).toBe(50)
  })

  it('honors a consumer override of a built-in key (md)', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('md')).toBe(14)
  })

  it('falls back to themeConfig.fontSizes when not in theme', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('providerOnly')).toBe(99)
  })

  it('applies a -2 delta on small screens', () => {
    mockWidth(360)
    expect(fontSizeNormalizer('3xl')).toBe(34)
  })

  it('keeps legacy xxl/xxxl responsive values (not in the fontSizes map)', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('xxl')).toBe(24)
    expect(fontSizeNormalizer('xxxl')).toBe(36)
    mockWidth(360)
    expect(fontSizeNormalizer('xxl')).toBe(22)
    expect(fontSizeNormalizer('xxxl')).toBe(34)
  })

  it('returns an unknown token unchanged', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('nope')).toBe('nope')
  })

  it('passes a numeric size through unchanged', () => {
    mockWidth(800)
    expect(fontSizeNormalizer(20)).toBe(20)
  })
})

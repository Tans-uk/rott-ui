import {defineRottConfig} from '../defineRottConfig'

describe('defineRottConfig', () => {
  const originalEnv = process.env.NODE_ENV

  afterEach(() => {
    process.env.NODE_ENV = originalEnv
  })

  describe('empty config', () => {
    it('allows empty config object', () => {
      const config = defineRottConfig({})
      expect(config).toEqual({})
    })

    it('allows empty config with as const', () => {
      const config = defineRottConfig({} as const)
      expect(config).toEqual({})
    })
  })

  describe('validation in development', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development'
    })

    it('throws when config is null', () => {
      expect(() => defineRottConfig(null as any)).toThrow(/rott.config.ts must export an object/)
    })

    it('throws when config is undefined', () => {
      expect(() => defineRottConfig(undefined as any)).toThrow(
        /rott.config.ts must export an object/
      )
    })

    it('throws when config is not an object', () => {
      expect(() => defineRottConfig('invalid' as any)).toThrow(
        /rott.config.ts must export an object/
      )
    })

    it('accepts config without images or icons (empty config)', () => {
      const config = defineRottConfig({})
      expect(config).toEqual({})
    })

    it('returns the same config object', () => {
      const input = {colors: {primary: '#000'}}
      const result = defineRottConfig(input)
      expect(result).toBe(input)
    })
  })

  describe('production', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production'
    })

    it('allows empty config without throwing', () => {
      const config = defineRottConfig({})
      expect(config).toEqual({})
    })
  })
})

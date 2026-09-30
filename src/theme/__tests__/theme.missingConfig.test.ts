/**
 * rott.config is deliberately left unmocked here, so require('rott.config') fails the way
 * it does in an app that skipped the optional Metro/Babel resolution step.
 */
const mockMissingConfigIcons = {'consumer-arrow': {uri: 'file://consumer.svg'} as any}

jest.mock('@rott-consumer-assets', () => ({images: {}, icons: mockMissingConfigIcons}), {
  virtual: true,
})

describe('theme without a resolvable rott.config', () => {
  it('keeps the library icons and images next to the consumer assets', () => {
    jest.isolateModules(() => {
      const {theme} = require('../theme')
      const {defaultThemeConfig} = require('../../providers/defaultThemeConfig')

      expect(Object.keys(theme.icons)).toEqual(
        expect.arrayContaining([...Object.keys(defaultThemeConfig.icons), 'consumer-arrow'])
      )
      expect(Object.keys(theme.images)).toEqual(
        expect.arrayContaining(Object.keys(defaultThemeConfig.images))
      )
    })
  })
})

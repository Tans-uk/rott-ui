/**
 * Theme merge logic: empty config = only consumer assets; non-empty = user + consumer.
 * Mocks rott.config and @rott-consumer-assets to test the empty-config scenario.
 */
const mockConsumerImages = {'consumer-logo': {uri: 'file://consumer.png'} as any}
const mockConsumerIcons = {'consumer-arrow': {uri: 'file://consumer.svg'} as any}

jest.mock(
  '@rott-consumer-assets',
  () => ({
    images: mockConsumerImages,
    icons: mockConsumerIcons,
  }),
  {virtual: true}
)

jest.mock('rott.config', () => ({config: {}}), {virtual: true})

describe('theme merge', () => {
  it('uses only consumer assets when rott.config is empty', () => {
    jest.isolateModules(() => {
      const {theme} = require('../theme')

      expect(theme.images).toBeDefined()
      expect(theme.icons).toBeDefined()
      expect(theme.images['consumer-logo']).toBeDefined()
      expect(theme.icons['consumer-arrow']).toBeDefined()
      // Empty config: no default images/icons from defaultThemeConfig
      expect(Object.keys(theme.images)).toEqual(['consumer-logo'])
      expect(Object.keys(theme.icons)).toEqual(['consumer-arrow'])
    })
  })

  it('has base config (colors, goBack, etc.) even with empty rott.config', () => {
    jest.isolateModules(() => {
      const {theme} = require('../theme')

      expect(theme.colors).toBeDefined()
      expect(theme.referenceDevice).toBeDefined()
      expect(typeof theme.goBack).toBe('function')
    })
  })
})

describe('theme merge (config with images/icons)', () => {
  const userImages = {'user-logo': {uri: 'file://user.png'} as any}
  const userIcons = {'user-arrow': {uri: 'file://user.svg'} as any}

  beforeAll(() => {
    jest.doMock(
      'rott.config',
      () => ({
        config: {images: userImages, icons: userIcons},
      }),
      {virtual: true}
    )
  })

  it('merges user images/icons with consumer assets', () => {
    jest.isolateModules(() => {
      jest.doMock(
        'rott.config',
        () => ({
          config: {images: userImages, icons: userIcons},
        }),
        {virtual: true}
      )

      const {theme} = require('../theme')

      expect(theme.images['user-logo']).toBeDefined()
      expect(theme.icons['user-arrow']).toBeDefined()
      expect(theme.images['consumer-logo']).toBeDefined()
      expect(theme.icons['consumer-arrow']).toBeDefined()
    })
  })
})

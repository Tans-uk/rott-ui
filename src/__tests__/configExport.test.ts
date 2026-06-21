describe('@tansuk/rott-ui/config subpath export', () => {
  it('exposes the ./config export pointing at rott-config-entry', () => {
    const pkg = require('../../package.json')

    expect(pkg.exports['./config']).toBeDefined()
    expect(pkg.exports['./config'].source).toBe('./src/rott-config-entry.ts')
  })

  it('rott-config-entry exports defineRottConfig as a function', () => {
    const entry = require('../rott-config-entry')

    expect(typeof entry.defineRottConfig).toBe('function')
  })
})

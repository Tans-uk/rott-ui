const fs = require('fs')
const os = require('os')
const path = require('path')

const {withRottAssets} = require('../withRottAssets')

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'withRottAssets-'))
}

function writeFile(dir, relativePath, content = '') {
  const full = path.join(dir, relativePath)
  fs.mkdirSync(path.dirname(full), {recursive: true})
  fs.writeFileSync(full, content)
}

describe('withRottAssets', () => {
  let tmpDir

  beforeEach(() => {
    tmpDir = createTempDir()
  })

  afterEach(() => {
    fs.rmSync(tmpDir, {recursive: true, force: true})
  })

  describe('projectRoot and scanning', () => {
    it('scans consumer project assets when projectRoot is provided', () => {
      writeFile(tmpDir, 'src/assets/images/logo.png')
      writeFile(tmpDir, 'src/assets/icons/svg/arrow.svg')

      const config = withRottAssets({resolver: {}}, {projectRoot: tmpDir})

      const jsPath = path.join(tmpDir, '.rott/consumer-assets.js')
      expect(fs.existsSync(jsPath)).toBe(true)

      const content = fs.readFileSync(jsPath, 'utf-8')
      expect(content).toContain("'logo':")
      expect(content).toContain("'arrow':")
    })

    it('uses metroConfig.projectRoot when options.projectRoot is not passed', () => {
      writeFile(tmpDir, 'src/assets/images/only.png')

      const metroConfig = {resolver: {}, projectRoot: tmpDir}
      withRottAssets(metroConfig)

      const jsPath = path.join(tmpDir, '.rott/consumer-assets.js')
      expect(fs.existsSync(jsPath)).toBe(true)
      expect(fs.readFileSync(jsPath, 'utf-8')).toContain("'only':")
    })

    it('generates empty images/icons when no assets exist', () => {
      withRottAssets({resolver: {}}, {projectRoot: tmpDir})

      const jsPath = path.join(tmpDir, '.rott/consumer-assets.js')
      const content = fs.readFileSync(jsPath, 'utf-8')
      expect(content).toContain('images: {')
      expect(content).toContain('icons: {')
      expect(content).not.toMatch(/'[a-z-]+':\s*require/)
    })
  })

  describe('module augmentation .d.ts', () => {
    it('generates ConsumerImageKeys and ConsumerIconKeys in .d.ts when assets exist', () => {
      writeFile(tmpDir, 'src/assets/images/my-logo.png')
      writeFile(tmpDir, 'src/assets/icons/svg/my-icon.svg')

      withRottAssets({resolver: {}}, {projectRoot: tmpDir})

      const dtsPath = path.join(tmpDir, '.rott/consumer-assets.d.ts')
      expect(fs.existsSync(dtsPath)).toBe(true)

      const content = fs.readFileSync(dtsPath, 'utf-8')
      expect(content).toContain("declare module '@tansuk/rott-ui'")
      expect(content).toContain("'my-logo': true")
      expect(content).toContain("'my-icon': true")
    })

    it('does not add ConsumerImageKeys/ConsumerIconKeys when no assets', () => {
      withRottAssets({resolver: {}}, {projectRoot: tmpDir})

      const dtsPath = path.join(tmpDir, '.rott/consumer-assets.d.ts')
      const content = fs.readFileSync(dtsPath, 'utf-8')
      expect(content).toContain("declare module '@tansuk/rott-ui'")
      expect(content).not.toContain('ConsumerImageKeys {')
      expect(content).not.toContain('ConsumerIconKeys {')
    })
  })

  describe('resolver', () => {
    it('adds resolveRequest that maps @rott-consumer-assets to generated file', () => {
      writeFile(tmpDir, 'src/assets/images/x.png')
      const config = withRottAssets({resolver: {}}, {projectRoot: tmpDir})

      const mockContext = {resolveRequest: () => ({type: 'empty'})}
      const resolved = config.resolver.resolveRequest(
        mockContext,
        '@rott-consumer-assets',
        'ios',
      )

      expect(resolved.type).toBe('sourceFile')
      expect(resolved.filePath).toBe(path.join(tmpDir, '.rott/consumer-assets.js'))
    })

    it('passes through to original resolver for other modules', () => {
      const originalResolver = jest.fn(() => ({type: 'original'}))
      const config = withRottAssets(
        {resolver: {resolveRequest: originalResolver}},
        {projectRoot: tmpDir},
      )

      const mockContext = {}
      config.resolver.resolveRequest(mockContext, 'some-other-module', 'ios')

      expect(originalResolver).toHaveBeenCalledWith(
        mockContext,
        'some-other-module',
        'ios',
      )
    })
  })

  describe('collision detection', () => {
    it('throws when two images produce the same key', () => {
      writeFile(tmpDir, 'src/assets/images/a/dup.png')
      writeFile(tmpDir, 'src/assets/images/b/dup.jpg')

      expect(() =>
        withRottAssets({resolver: {}}, {projectRoot: tmpDir}),
      ).toThrow(/Asset name collision in images/)
    })

    it('throws when two icons produce the same key', () => {
      writeFile(tmpDir, 'src/assets/icons/svg/x/dup.svg')
      writeFile(tmpDir, 'src/assets/icons/svg/y/dup.svg')

      expect(() =>
        withRottAssets({resolver: {}}, {projectRoot: tmpDir}),
      ).toThrow(/Asset name collision in icons/)
    })
  })

  describe('retina variants', () => {
    it('skips @2x and @3x image variants', () => {
      writeFile(tmpDir, 'src/assets/images/logo.png')
      writeFile(tmpDir, 'src/assets/images/logo@2x.png')
      writeFile(tmpDir, 'src/assets/images/logo@3x.png')

      withRottAssets({resolver: {}}, {projectRoot: tmpDir})

      const content = fs.readFileSync(
        path.join(tmpDir, '.rott/consumer-assets.js'),
        'utf-8',
      )
      expect(content).toContain("'logo':")
      expect(content).not.toContain('logo@2x')
      expect(content).not.toContain('logo@3x')
    })
  })
})

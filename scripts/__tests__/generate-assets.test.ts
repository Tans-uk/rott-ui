import {
  buildEntries,
  deriveKey,
  detectCollisions,
  generateRequireBlock,
  isRetinaVariant,
  replaceMarkerSection,
  scanDirectory,
} from '../generate-assets'

import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

function createTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'gen-assets-'))
}

function writeFile(dir: string, relativePath: string, content = ''): void {
  const full = path.join(dir, relativePath)
  fs.mkdirSync(path.dirname(full), {recursive: true})
  fs.writeFileSync(full, content)
}

describe('deriveKey', () => {
  it('strips extension from a png file', () => {
    expect(deriveKey('/some/path/cindoruk.png')).toBe('cindoruk')
  })

  it('strips extension from an svg file', () => {
    expect(deriveKey('/icons/arrow-left.svg')).toBe('arrow-left')
  })

  it('preserves hyphens and mixed case', () => {
    expect(deriveKey('/images/HGS-Logo.png')).toBe('HGS-Logo')
  })
})

describe('isRetinaVariant', () => {
  it('detects @2x variant', () => {
    expect(isRetinaVariant('logo@2x.png')).toBe(true)
  })

  it('detects @3x variant', () => {
    expect(isRetinaVariant('logo@3x.png')).toBe(true)
  })

  it('returns false for base file', () => {
    expect(isRetinaVariant('logo.png')).toBe(false)
  })

  it('returns false for normal names containing numbers', () => {
    expect(isRetinaVariant('onboarding-2.png')).toBe(false)
  })
})

describe('scanDirectory', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = createTempDir()
  })

  afterEach(() => {
    fs.rmSync(tmpDir, {recursive: true, force: true})
  })

  it('finds files matching extensions in nested directories', () => {
    writeFile(tmpDir, 'logo/hgs-logo.png')
    writeFile(tmpDir, 'entry/phone-icon.png')
    writeFile(tmpDir, 'deep/nested/image.jpg')

    const results = scanDirectory(tmpDir, ['.png', '.jpg'])
    expect(results).toHaveLength(3)
  })

  it('skips @2x/@3x retina variants', () => {
    writeFile(tmpDir, 'logo.png')
    writeFile(tmpDir, 'logo@2x.png')
    writeFile(tmpDir, 'logo@3x.png')

    const results = scanDirectory(tmpDir, ['.png'])
    expect(results).toHaveLength(1)
    expect(results[0]).toContain('logo.png')
  })

  it('ignores files with non-matching extensions', () => {
    writeFile(tmpDir, 'readme.txt')
    writeFile(tmpDir, 'icon.svg')
    writeFile(tmpDir, 'image.png')

    const results = scanDirectory(tmpDir, ['.png'])
    expect(results).toHaveLength(1)
  })

  it('returns empty array for non-existent directory', () => {
    const results = scanDirectory('/non/existent/path', ['.png'])
    expect(results).toEqual([])
  })
})

describe('detectCollisions', () => {
  it('does not throw when all keys are unique', () => {
    const entries = [
      {key: 'logo', requirePath: '../assets/images/logo.png'},
      {key: 'icon', requirePath: '../assets/images/icon.png'},
    ]
    expect(() => detectCollisions(entries)).not.toThrow()
  })

  it('throws when duplicate keys exist', () => {
    const entries = [
      {key: 'close', requirePath: '../assets/images/logo/close.png'},
      {key: 'close', requirePath: '../assets/images/commonIcon/close.png'},
    ]
    expect(() => detectCollisions(entries)).toThrow(/Name collision: "close"/)
  })
})

describe('buildEntries', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = createTempDir()
  })

  afterEach(() => {
    fs.rmSync(tmpDir, {recursive: true, force: true})
  })

  it('returns entries sorted alphabetically by key', () => {
    writeFile(tmpDir, 'zebra.png')
    writeFile(tmpDir, 'alpha.png')
    writeFile(tmpDir, 'middle.png')

    const entries = buildEntries(tmpDir, ['.png'], tmpDir)
    expect(entries.map((e) => e.key)).toEqual(['alpha', 'middle', 'zebra'])
  })

  it('produces correct relative require paths', () => {
    writeFile(tmpDir, 'sub/image.png')

    const relativeFrom = path.join(tmpDir, 'providers')
    const entries = buildEntries(tmpDir, ['.png'], relativeFrom)
    expect(entries[0]?.requirePath).toContain('sub')
    expect(entries[0]?.requirePath).toContain('image.png')
  })
})

describe('generateRequireBlock', () => {
  it('generates require lines for entries', () => {
    const entries = [
      {key: 'arrow-left', requirePath: '../assets/icons/svg/interface/arrow-left.svg'},
      {key: 'euro', requirePath: '../assets/icons/svg/currency/euro.svg'},
    ]
    const block = generateRequireBlock(entries)
    expect(block).toContain("'arrow-left': require('../assets/icons/svg/interface/arrow-left.svg')")
    expect(block).toContain("euro: require('../assets/icons/svg/currency/euro.svg')")
  })

  it('returns empty string for empty entries', () => {
    expect(generateRequireBlock([])).toBe('')
  })
})

describe('replaceMarkerSection', () => {
  const template = [
    'before content',
    '  images: {',
    '    // @generated-start:images',
    "    'old': require('old.png'),",
    '    // @generated-end:images',
    '  },',
    'after content',
  ].join('\n')

  it('replaces content between markers', () => {
    const newContent = "    'new': require('new.png'),"
    const result = replaceMarkerSection(template, 'images', newContent)

    expect(result).toContain('// @generated-start:images')
    expect(result).toContain("'new': require('new.png')")
    expect(result).toContain('// @generated-end:images')
    expect(result).not.toContain("'old': require('old.png')")
  })

  it('preserves content outside markers', () => {
    const result = replaceMarkerSection(template, 'images', "    'x': require('x.png'),")
    expect(result).toContain('before content')
    expect(result).toContain('after content')
  })

  it('throws when start marker is missing', () => {
    expect(() => replaceMarkerSection('no markers', 'images', 'new')).toThrow(
      /Missing marker.*@generated-start:images/
    )
  })

  it('throws when end marker is missing', () => {
    const partial = '// @generated-start:images\nsome content'
    expect(() => replaceMarkerSection(partial, 'images', 'new')).toThrow(
      /Missing marker.*@generated-end:images/
    )
  })

  it('handles empty replacement content', () => {
    const result = replaceMarkerSection(template, 'images', '')
    expect(result).toContain('// @generated-start:images')
    expect(result).toContain('// @generated-end:images')
    expect(result).not.toContain("'old'")
  })
})

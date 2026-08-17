import * as fs from 'fs'
import * as path from 'path'

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
const ICON_EXTENSIONS = ['.svg']
const DENSITY_SUFFIX_PATTERN = /@[234]x$/

interface AssetEntry {
  key: string
  requirePath: string
}

export function deriveKey(filePath: string): string {
  return path.basename(filePath, path.extname(filePath))
}

export function isRetinaVariant(filePath: string): boolean {
  const stem = path.basename(filePath, path.extname(filePath))

  return DENSITY_SUFFIX_PATTERN.test(stem)
}

export function scanDirectory(dir: string, extensions: string[]): string[] {
  const results: string[] = []

  if (!fs.existsSync(dir)) {
    return results
  }

  const entries = fs.readdirSync(dir, {withFileTypes: true})

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      results.push(...scanDirectory(fullPath, extensions))
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      if (extensions.includes(ext) && !isRetinaVariant(entry.name)) {
        results.push(fullPath)
      }
    }
  }

  return results
}

export function detectCollisions(entries: AssetEntry[]): void {
  const seen = new Map<string, string>()

  for (const entry of entries) {
    const existing = seen.get(entry.key)
    if (existing) {
      throw new Error(
        `[generate-assets] Name collision: "${entry.key}" is produced by both:\n` +
          `  - ${existing}\n` +
          `  - ${entry.requirePath}\n` +
          'Rename one of the files to resolve this.'
      )
    }
    seen.set(entry.key, entry.requirePath)
  }
}

export function buildEntries(
  dir: string,
  extensions: string[],
  relativeFrom: string
): AssetEntry[] {
  const files = scanDirectory(dir, extensions)

  const entries: AssetEntry[] = files.map((filePath) => ({
    key: deriveKey(filePath),
    requirePath: path.relative(relativeFrom, filePath),
  }))

  // Pinned locale: the default collator follows LANG/LC_ALL, which would make the
  // committed generated file depend on the machine that ran `yarn generate:assets`.
  // Note this only fixes the emitted line order. At runtime JavaScript still
  // enumerates integer-like keys ('2') before all others, whatever order they
  // appear in here, so callers must not rely on iteration order.
  entries.sort((a, b) => a.key.localeCompare(b.key, 'en-US'))

  return entries
}

// `__proto__` is special in an object literal: quoted or not, it assigns the
// prototype instead of defining a property, so the asset would silently vanish.
// The other names below would need escaping, and getting that byte-identical to
// Prettier's own quoting means predicting Prettier — the thing this generator
// must not do, since CI now format-checks its output. Reject instead of guess.
export function assertEmittable(entries: AssetEntry[]): void {
  for (const entry of entries) {
    if (entry.key === '__proto__') {
      throw new Error(
        `[generate-assets] Unusable asset name: "${entry.key}" (${entry.requirePath}).\n` +
          "`__proto__` sets an object's prototype rather than becoming a key, so the " +
          'asset would be silently unreachable. Rename the file.'
      )
    }

    for (const [label, value] of [
      ['name', entry.key],
      ['path', entry.requirePath],
    ] as const) {
      const offender = /['"\\\r\n\t]/.exec(value)
      if (offender) {
        throw new Error(
          `[generate-assets] Unusable asset ${label}: ${JSON.stringify(value)}.\n` +
            `It contains ${JSON.stringify(offender[0])}, which cannot be emitted into the ` +
            'generated module without escaping. Rename the file.'
        )
      }
    }
  }
}

// ECMAScript's own IdentifierName grammar, spelled with the Unicode property
// escapes it is defined in terms of (plus ZWNJ/ZWJ, which the grammar allows in
// continuations). An ASCII-only `[a-zA-Z_$]` version quotes names Prettier leaves
// bare — `ödeme`, `işlem`, `café`, `日本語` — and CI now format-checks this file, so
// the mismatch would break the build. Verified against the repo's real Prettier
// across those cases plus `2`, `2x`, `card-check`, `class` and `064-check`.
// TypeScript's ts.isIdentifierText does the same job but is not in its public
// typings, so it cannot be called without casting away the API contract.
const IDENTIFIER_NAME = /^[\p{ID_Start}$_][\p{ID_Continue}$‌‍]*$/u

// Mirrors Prettier's quoteProps: 'as-needed' — quote only if the key is not a
// valid identifier.
function quoteKeyIfNeeded(key: string): string {
  return IDENTIFIER_NAME.test(key) ? key : `'${key}'`
}

export function generateRequireBlock(entries: AssetEntry[]): string {
  if (entries.length === 0) return ''

  const lines = entries.map(
    (e) => `    ${quoteKeyIfNeeded(e.key)}: require('${e.requirePath.replace(/\\/g, '/')}'),`
  )

  return lines.join('\n')
}

const MARKER_START_PREFIX = '// @generated-start:'
const MARKER_END_PREFIX = '// @generated-end:'

export function replaceMarkerSection(
  content: string,
  markerName: string,
  newContent: string
): string {
  const startMarker = `${MARKER_START_PREFIX}${markerName}`
  const endMarker = `${MARKER_END_PREFIX}${markerName}`

  const startIdx = content.indexOf(startMarker)
  if (startIdx === -1) {
    throw new Error(`[generate-assets] Missing marker: "${startMarker}" in target file.`)
  }

  const endIdx = content.indexOf(endMarker)
  if (endIdx === -1) {
    throw new Error(`[generate-assets] Missing marker: "${endMarker}" in target file.`)
  }

  const startLineEnd = content.indexOf('\n', startIdx)
  const endLineStart = content.lastIndexOf('\n', endIdx)

  const before = content.slice(0, startLineEnd + 1)
  const after = content.slice(endLineStart)

  const replacement = newContent ? `${newContent}\n` : ''

  return `${before}${replacement}${after}`
}

export function main(): void {
  const rootDir = path.resolve(__dirname, '..')
  const providersDir = path.join(rootDir, 'src', 'providers')
  const configPath = path.join(providersDir, 'defaultThemeConfig.ts')
  const imagesDir = path.join(rootDir, 'src', 'assets', 'images')
  const iconsDir = path.join(rootDir, 'src', 'assets', 'icons', 'svg')

  const relativeFrom = providersDir

  const imageEntries = buildEntries(imagesDir, IMAGE_EXTENSIONS, relativeFrom)
  const iconEntries = buildEntries(iconsDir, ICON_EXTENSIONS, relativeFrom)

  detectCollisions(imageEntries)
  detectCollisions(iconEntries)

  assertEmittable(imageEntries)
  assertEmittable(iconEntries)

  const imagesBlock = generateRequireBlock(imageEntries)
  const iconsBlock = generateRequireBlock(iconEntries)

  let content = fs.readFileSync(configPath, 'utf-8')
  content = replaceMarkerSection(content, 'images', imagesBlock)
  content = replaceMarkerSection(content, 'icons', iconsBlock)

  fs.writeFileSync(configPath, content, 'utf-8')

  console.log(
    `[generate-assets] Done. Registered ${imageEntries.length} images and ${iconEntries.length} icons.`
  )
}

if (require.main === module) {
  main()
}

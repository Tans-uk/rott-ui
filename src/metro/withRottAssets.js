/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
const ICON_EXTENSIONS = ['.svg']
const DENSITY_SUFFIX = /@[234]x$/
const CONSUMER_ASSETS_MODULE = '@rott-consumer-assets'

function deriveKey(filePath) {
  return path.basename(filePath, path.extname(filePath))
}

function isRetinaVariant(filePath) {
  const stem = path.basename(filePath, path.extname(filePath))

  return DENSITY_SUFFIX.test(stem)
}

function scanDirectory(dir, extensions) {
  const results = []
  if (!fs.existsSync(dir)) return results

  const entries = fs.readdirSync(dir, { withFileTypes: true })
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

function detectCollisions(entries, type) {
  const seen = new Map()
  for (const { key, filePath } of entries) {
    const existing = seen.get(key)
    if (existing)
    {throw new Error(
      '[rott-ui] Asset name collision in ' + type + ': "' + key + '" is produced by both:\n' +
        '  - ' + existing + '\n' +
        '  - ' + filePath + '\n' +
        'Rename one of the files to resolve this.'
    )}
    seen.set(key, filePath)
  }
}

function buildEntries(dir, extensions) {
  const files = scanDirectory(dir, extensions)
  const entries = files.map(function (filePath) {
    return { key: deriveKey(filePath), filePath: filePath }
  })
  entries.sort(function (a, b) { return a.key.localeCompare(b.key) })

  return entries
}

function generateConsumerAssetsFile(projectRoot, imageEntries, iconEntries) {
  const outputDir = path.join(projectRoot, '.rott')
  fs.mkdirSync(outputDir, { recursive: true })

  const lines = ['module.exports = {']

  lines.push('  images: {')
  for (const entry of imageEntries) {
    const relPath = path.relative(outputDir, entry.filePath).replace(/\\/g, '/')
    lines.push('    \'' + entry.key + '\': require(\'./' + relPath + '\'),')
  }
  lines.push('  },')

  lines.push('  icons: {')
  for (const entry of iconEntries) {
    const relPath = path.relative(outputDir, entry.filePath).replace(/\\/g, '/')
    lines.push('    \'' + entry.key + '\': require(\'./' + relPath + '\'),')
  }
  lines.push('  },')

  lines.push('}')

  const outputPath = path.join(outputDir, 'consumer-assets.js')
  const content = lines.join('\n') + '\n'

  const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf-8') : ''
  if (existing !== content) {
    fs.writeFileSync(outputPath, content, 'utf-8')
  }

  // Generate module augmentation for TypeScript autocomplete
  var dtsLines = ['import \'@tansuk/rott-ui\';']
  dtsLines.push('')
  dtsLines.push('declare module \'@tansuk/rott-ui\' {')
  if (imageEntries.length > 0) {
    dtsLines.push('  interface ConsumerImageKeys {')
    for (var i = 0; i < imageEntries.length; i++) {
      dtsLines.push('    \'' + imageEntries[i].key + '\': true;')
    }
    dtsLines.push('  }')
  }
  if (iconEntries.length > 0) {
    dtsLines.push('  interface ConsumerIconKeys {')
    for (var j = 0; j < iconEntries.length; j++) {
      dtsLines.push('    \'' + iconEntries[j].key + '\': true;')
    }
    dtsLines.push('  }')
  }
  dtsLines.push('}')

  const dtsPath = path.join(outputDir, 'consumer-assets.d.ts')
  const dtsContent = dtsLines.join('\n') + '\n'
  const existingDts = fs.existsSync(dtsPath) ? fs.readFileSync(dtsPath, 'utf-8') : ''
  if (existingDts !== dtsContent) {
    fs.writeFileSync(dtsPath, dtsContent, 'utf-8')
  }

  return outputPath
}

/**
 * Wraps a Metro config to enable automatic asset discovery for Rott-UI.
 *
 * Scans the consumer project's asset directories, generates require() mappings,
 * and injects a Metro resolver so the library can pick them up at bundle time.
 *
 * @param {object} metroConfig - The final Metro configuration object
 * @param {object} [options]
 * @param {string} [options.projectRoot] - Defaults to process.cwd()
 * @param {string} [options.imagesDir]   - Relative to projectRoot. Defaults to 'src/assets/images'
 * @param {string} [options.iconsDir]    - Relative to projectRoot. Defaults to 'src/assets/icons/svg'
 * @returns {object} Modified Metro config
 */
function withRottAssets(metroConfig, options) {
  options = options || {}
  const projectRoot = options.projectRoot || metroConfig.projectRoot || process.cwd()
  const imagesDir = path.resolve(projectRoot, options.imagesDir || 'src/assets/images')
  const iconsDir = path.resolve(projectRoot, options.iconsDir || 'src/assets/icons/svg')

  const imageEntries = buildEntries(imagesDir, IMAGE_EXTENSIONS)
  const iconEntries = buildEntries(iconsDir, ICON_EXTENSIONS)

  detectCollisions(imageEntries, 'images')
  detectCollisions(iconEntries, 'icons')

  const generatedFilePath = generateConsumerAssetsFile(projectRoot, imageEntries, iconEntries)

  const imageCount = imageEntries.length
  const iconCount = iconEntries.length
  if (imageCount > 0 || iconCount > 0)
  {console.log(
    '[rott-ui] Auto-discovered ' + imageCount + ' image(s) and ' + iconCount + ' icon(s) from consumer project.'
  )}

  const originalResolver = metroConfig.resolver && metroConfig.resolver.resolveRequest

  return Object.assign({}, metroConfig, {
    resolver: Object.assign({}, metroConfig.resolver, {
      resolveRequest: function (context, moduleName, platform) {
        if (moduleName === CONSUMER_ASSETS_MODULE)
        {return {
          type: 'sourceFile',
          filePath: generatedFilePath,
        }}

        if (originalResolver) {
          return originalResolver(context, moduleName, platform)
        }

        return context.resolveRequest(context, moduleName, platform)
      },
    }),
  })
}

module.exports = { withRottAssets: withRottAssets }

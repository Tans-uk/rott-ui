const path = require('path')

// The FlashList 1.x run (jest.flashlist-v1.config.ts) keeps its snapshots next to the
// default ones, in their own folder: __tests__/__snapshots__/flashlist-v1/<name>.snap.
// Both runs use this resolver, so each recognizes the other's snapshot files instead of
// reporting them as obsolete.
const V1_DIR = 'flashlist-v1'
const isFlashListV1Run = process.env.ROTT_FLASHLIST_V1 === 'true'

module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    path.join(
      path.dirname(testPath),
      '__snapshots__',
      ...(isFlashListV1Run ? [V1_DIR] : []),
      path.basename(testPath) + snapshotExtension
    ),

  resolveTestPath: (snapshotPath, snapshotExtension) => {
    const snapshotDir = path.dirname(snapshotPath)
    const testsDir =
      path.basename(snapshotDir) === V1_DIR
        ? path.join(snapshotDir, '..', '..')
        : path.join(snapshotDir, '..')

    return path.join(testsDir, path.basename(snapshotPath, snapshotExtension))
  },

  testPathForConsistencyCheck: path.join('src', 'features', 'List', '__tests__', 'List.test.tsx'),
}

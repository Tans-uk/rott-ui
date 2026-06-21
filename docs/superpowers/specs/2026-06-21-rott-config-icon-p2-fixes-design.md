# Design: rott.config & Icon runtime-resolution P2 fixes (0.6.1)

**Date:** 2026-06-21
**Target release:** 0.6.1 (patch — bug fixes + docs)
**Source:** `HANDOFF-IMPROVEMENTS-FROM-VETASIST.md` (the three P2 items)

## Problem

Three runtime-resolution issues found while integrating `@tansuk/rott-ui` into
the VetAsist app. All three were originally reported against the published
0.2.0; current 0.6.0 source has changed, so each is re-scoped below against
what the code actually does today.

1. **`theme.ts` silently falls back to the default theme** when
   `require('rott.config')` fails. Under Expo (`babel-preset-expo`), the babel
   `module-resolver` alias is not applied inside `node_modules`, so the bare
   `require('rott.config')` in the compiled `lib/module/theme/theme.js` never
   resolves; the `catch` silently uses `defaultThemeConfig`. The consumer's
   custom palette is ignored with no error.
2. **`./config` subpath export.** Already fixed in source — `package.json`
   exports `./config` → `src/rott-config-entry.ts`, and that file exists. Only
   the docs are stale: `rott-config.md` Step-1 still imports `defineRottConfig`
   from the package root, which risks the require-cycle.
3. **`Icon` ignores `RottProvider config.icons`.** `Icon.tsx` reads only
   `theme?.icons?.[name]` (from `rott.config`) and returns `null` for icons
   registered at runtime via `<RottProvider config={{icons}} />` (which populate
   `themeConfig.icons`, a different object).

## Guiding principle

`rott.config` is the **primary** source of theming and icons. All fixes keep
`rott.config` first; the `RottProvider` runtime config is only a fallback, and
docs continue to recommend `rott.config` as the canonical channel.

## Scope

In scope:
- P2-#3: `Icon` falls back to `themeConfig.icons` after `theme.icons`.
- P2-#1: `__DEV__`-gated `console.warn` on the silent fallback + an Expo Metro
  `resolveRequest` docs section. Plus a small correctness cleanup in the catch.
- P2-#2: fix `rott-config.md` (EN + TR) Step-1 imports to `@tansuk/rott-ui/config`;
  add a Jest regression guard for the `./config` export.

Out of scope:
- P3 items.
- Any change to how `RottProvider` stores `themeConfig` or how `theme.ts`
  merges assets beyond the catch cleanup.
- Creating brand-new TR translations for components that have no TR mirror
  (only files that already have a TR mirror are updated — rott-config.md does).

## Design

### 1. Icon runtime fallback (P2-#3)

**`src/features/Icon/components/Icon.tsx`**

- Add import of the runtime config: `import {themeConfig} from '../../../providers'`
  (or the narrowest path `../../../providers/RottProvider` if the barrel import
  introduces a require-cycle — verify at implementation time).
- Change the lookup (line 24):
  ```ts
  // before
  const IconComponent = theme?.icons?.[name]
  // after
  const IconComponent = theme?.icons?.[name] ?? themeConfig?.icons?.[name]
  ```
- `theme.icons` (rott.config) stays primary; `themeConfig.icons` (RottProvider)
  is the fallback. The null-guard on line 25 and `IconComponent.default` render
  are unchanged.

**Tests** (`src/features/Icon/__tests__/Icon.test.tsx`, pattern-matching the
existing Input tests):
- renders when the name exists only in `themeConfig.icons` (the fixed case)
- renders when the name exists in `theme.icons` (rott.config primary, unchanged)
- when present in both, the `theme.icons` (rott.config) component wins
- unknown name → returns `null`

Implementation note: tests will need to populate `themeConfig.icons` (it's an
exported mutable `let` on `RottProvider.tsx:24`) and/or mock `theme`. Confirm the
exact mocking approach against the existing test utils when implementing.

### 2. Silent fallback: dev-warn + Expo docs (P2-#1)

**`src/theme/theme.ts`** — the `try/catch`:
```ts
let userConfig: Partial<ThemeConfig> = {}
try {
  userConfig = require('rott.config').config as Partial<ThemeConfig>
} catch {
  if (__DEV__) {
    console.warn(
      "[rott-ui] 'rott.config' could not be resolved at runtime; using the default theme. " +
        'If you use a custom rott.config.ts, ensure runtime resolution is configured ' +
        '(Metro resolveRequest under Expo — see the rott.config docs). ' +
        'If you are not using a custom config, you can ignore this warning.'
    )
  }
  userConfig = {}
}
```
Two changes:
- Add the `__DEV__`-gated `console.warn` (A1 wording: states it as a
  possibility, so the no-config case is not a false alarm; silent in production).
- Change `userConfig = defaultThemeConfig` → `userConfig = {}`. Behaviorally
  identical because the next line is
  `const baseConfig = {...defaultThemeConfig, ...userConfig}` — defaults already
  supply everything; `{}` removes the confusing defaults-over-defaults spread.

**Docs — `docs/docs/getting-started/installation.md`:** under the existing
"Optional: rott.config.ts Runtime Resolution" section (around line 142), add an
**Expo** subsection explaining that `babel-preset-expo` does not apply
`module-resolver` inside `node_modules`, so Expo apps must add a Metro
`resolveRequest`:
```js
// metro.config.js
const path = require('path')
// ...
const defaultResolveRequest = config.resolver.resolveRequest
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'rott.config') {
    return {type: 'sourceFile', filePath: path.resolve(__dirname, 'rott.config.ts')}
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform)
}
```

**Testing:** no new unit test for the warn — `theme.ts` runs its `require` at
module-load, making the warn path brittle to isolate, and it is a dev-only
diagnostic. The `= {}` change is covered indirectly by existing theme consumers.

### 3. ./config docs + regression guard (P2-#2)

**Docs — `docs/docs/theming/rott-config.md`** (EN) and its TR mirror
`docs/i18n/tr/docusaurus-plugin-content-docs/current/theming/rott-config.md`:
- Change the `rott.config.ts` example imports (EN lines 25, 261, 275) from
  `import { defineRottConfig } from '@tansuk/rott-ui'` to
  `import { defineRottConfig } from '@tansuk/rott-ui/config'`.
- Line 275 imports both `defaultThemeConfig` (from the root) and
  `defineRottConfig`; split it into two imports — `defaultThemeConfig` stays from
  the root, `defineRottConfig` moves to `/config`.
- Add a short note: importing `defineRottConfig` from the package root can
  re-enter the index mid-initialization (require-cycle
  `index → theme → require('rott.config') → index`); the `/config` entry avoids
  it. Translate the note in the TR mirror; keep code blocks identical.

**Regression guard — `src/__tests__/configExport.test.ts`** (confirm exact path
and require style against existing test setup):
```ts
it('exposes the ./config subpath export pointing at rott-config-entry', () => {
  const pkg = require('../../package.json')
  expect(pkg.exports['./config']).toBeDefined()
  expect(pkg.exports['./config'].source).toBe('./src/rott-config-entry.ts')
})

it('rott-config-entry exports defineRottConfig', () => {
  const entry = require('../rott-config-entry')
  expect(typeof entry.defineRottConfig).toBe('function')
})
```
Catches both failure modes: the export map dropping `./config`, and the entry no
longer exporting `defineRottConfig`.

## Version

Bump `package.json` 0.6.0 → 0.6.1 (patch — bug fixes + docs, no breaking change).

## Risks

- **Require-cycle (P2-#3):** importing `themeConfig` into `Icon` may form a
  cycle. Mitigation: import from the narrowest path; verify at implementation.
- **`= {}` cleanup (P2-#1):** must stay behaviorally identical; verified by the
  `{...defaultThemeConfig, ...userConfig}` line that follows.
- **TR doc parity (P2-#2):** the TR mirror must receive the same import edits as
  EN, or the locales drift.

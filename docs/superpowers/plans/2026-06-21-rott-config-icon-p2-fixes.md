# rott.config & Icon Runtime-Resolution P2 Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three rott.config/Icon runtime-resolution issues and ship as 0.6.1.

**Architecture:** A React Native UI library. `Icon` gains a fallback to the RottProvider runtime icon registry (rott.config stays primary). `theme.ts` gets a dev-only warning when `rott.config` fails to resolve, plus a catch cleanup. Docs gain an Expo Metro section and corrected `/config` imports; a Jest test guards the `./config` export.

**Tech Stack:** TypeScript, React Native 0.81, Jest, @testing-library/react-native, Docusaurus docs.

## Global Constraints

- Target version: **0.6.1** (patch — bug fixes + docs, no breaking change).
- Commit messages in **English**, Conventional Commits / commitlint compliant (enforced by lefthook commit-msg hook; `.cursor/rules` requires English).
- **`rott.config` is the primary source** of theming and icons everywhere. The RottProvider runtime config is only a fallback; docs keep recommending rott.config.
- Test util import: `import {render} from '<relative>/__tests__/utils/testUtils'`.
- Single-file test run: `yarn jest <path>`; snapshot update: `yarn jest -u <path>`.
- Docs EN/TR sync (`.cursor/rules/docs-translation-sync.mdc`): when a doc with an existing TR mirror changes, update both. `rott-config.md` HAS a TR mirror; `installation.md` does NOT (so EN only). Code blocks stay identical between locales; only prose is translated.

---

### Task 1: Icon falls back to RottProvider icons (rott.config primary)

**Files:**
- Modify: `src/features/Icon/components/Icon.tsx`
- Modify (add tests): `src/features/Icon/__tests__/Icon.test.tsx`

**Interfaces:**
- Consumes: `theme` from `../../../theme` (already imported); `themeConfig` (a mutable `let` exported from `src/providers/RottProvider.tsx:24`, shape `{icons?: Record<string, {default: ...}>, ...}`).
- Produces: `Icon` resolves `name` from `theme.icons` first, then `themeConfig.icons`.

- [ ] **Step 1: Add failing tests for the fallback (append to the existing describe block)**

In `src/features/Icon/__tests__/Icon.test.tsx`, the existing file mocks `../../../theme`. Add a mock for the RottProvider module near the other `jest.mock` calls (after the `jest.mock('../../../theme', ...)` block, around line 27):

```tsx
// Mock RottProvider runtime icon registry (themeConfig)
jest.mock('../../../providers/RottProvider', () => ({
  themeConfig: {
    icons: {
      'runtime-only-icon': {
        default: jest.fn().mockImplementation((props) => {
          const React = require('react')
          return React.createElement('MockSvgIcon', {testID: 'mock-runtime-svg', ...props})
        }),
      },
      // present in BOTH theme and themeConfig — theme (rott.config) must win
      'arrow-left': {
        default: jest.fn().mockImplementation((props) => {
          const React = require('react')
          return React.createElement('MockSvgIcon', {testID: 'mock-runtime-arrow', ...props})
        }),
      },
    },
  },
}))
```

Then add these test cases inside the top-level `describe('Icon -> Custom Component', ...)` block (e.g. after the existing "icon bulunamadığında null dönmeli" test, around line 98):

```tsx
describe('Icon -> RottProvider fallback (rott.config primary)', () => {
  const {themeConfig} = require('../../../providers/RottProvider')

  it('rott.config (theme.icons) içinde olmayan ad themeConfig.icons üzerinden render edilmeli', async () => {
    const {getByTestId} = await render(
      <Icon name={'runtime-only-icon' as IconKeys} testID={testIds.iconTestId} />
    )

    const iconElement = getByTestId(testIds.iconTestId)
    expect(iconElement).toBeOnTheScreen()
    expect(themeConfig.icons['runtime-only-icon'].default).toHaveBeenCalled()
  })

  it('ad hem theme hem themeConfig içindeyse theme (rott.config) önceliklidir', async () => {
    await render(<Icon name='arrow-left' testID={testIds.iconTestId} />)

    expect(theme.icons['arrow-left'].default).toHaveBeenCalled()
    expect(themeConfig.icons['arrow-left'].default).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run the tests to verify the fallback test fails**

Run: `yarn jest src/features/Icon/__tests__/Icon.test.tsx`
Expected: FAIL — `rott.config ... themeConfig.icons üzerinden render edilmeli` fails because `Icon` currently reads only `theme?.icons?.[name]`, so `runtime-only-icon` resolves to `undefined` and the component returns `null` (no `icon-test-id` on screen). The precedence test passes already (it only checks theme).

- [ ] **Step 3: Implement the fallback in Icon.tsx**

In `src/features/Icon/components/Icon.tsx`, add the import after the existing `import {theme} from '../../../theme'` (line 3):

```tsx
import {themeConfig} from '../../../providers/RottProvider'
```

Then change line 24 from:

```tsx
const IconComponent = theme?.icons?.[name]
```

to:

```tsx
const IconComponent = theme?.icons?.[name] ?? themeConfig?.icons?.[name]
```

Leave the `if (!IconComponent) return null` guard and everything below unchanged.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `yarn jest src/features/Icon/__tests__/Icon.test.tsx`
Expected: PASS — all existing Icon tests plus the two new fallback tests green. If the run errors on a require-cycle from importing `RottProvider` (rather than a normal assertion failure), the mock added in Step 1 should prevent it; if it still cycles, change the import to the providers barrel `'../../../providers'` and update the `jest.mock` path to match. The `themeConfig` value is read inside the component body (render time), so the cycle is not evaluated at module load.

- [ ] **Step 5: Typecheck**

Run: `yarn typecheck`
Expected: PASS — `themeConfig` is typed `ThemeConfig` with `icons`, so `themeConfig?.icons?.[name]` is well-typed.

- [ ] **Step 6: Commit**

```bash
git add src/features/Icon/components/Icon.tsx src/features/Icon/__tests__/Icon.test.tsx
git commit -m "fix(icon): fall back to RottProvider icons after rott.config

Icon resolved names only from theme.icons (rott.config) and returned null
for icons registered via <RottProvider config={{icons}} />. Fall back to
themeConfig.icons when a name is absent from rott.config; rott.config stays
the primary source."
```

---

### Task 2: theme.ts dev-warn + catch cleanup, and Expo Metro docs

**Files:**
- Modify: `src/theme/theme.ts` (the `try/catch` around the `require('rott.config')`)
- Modify: `docs/docs/getting-started/installation.md` (Expo subsection)

**Interfaces:**
- Consumes: `__DEV__` (React Native runtime global). NOTE: this repo's `tsconfig.json` uses `"types": ["jest", "node"]` and does NOT include react-native types, so `__DEV__` is not declared for TypeScript. The implementation must declare it locally to typecheck (see Step 1).
- Produces: no exported API change; behavior is identical except for a dev-only `console.warn` on the fallback path.

- [ ] **Step 1: Update the try/catch in theme.ts**

First, add a local declaration of `__DEV__` so it typechecks (this repo's tsconfig
does not include react-native types). Place it near the top of `src/theme/theme.ts`,
after the existing imports and before the first `type` declaration:

```ts
declare const __DEV__: boolean
```

Then replace the existing block:

```ts
let userConfig: Partial<ThemeConfig> = {}
try {
  userConfig = require('rott.config').config as Partial<ThemeConfig>
} catch {
  userConfig = defaultThemeConfig
}
```

with:

```ts
let userConfig: Partial<ThemeConfig> = {}
try {
  userConfig = require('rott.config').config as Partial<ThemeConfig>
} catch {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
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

Three changes: the local `declare const __DEV__: boolean`; the
`typeof __DEV__ !== 'undefined' && __DEV__` guard (so it is safe in the Jest/node
environment where `__DEV__` is undefined — the warn simply won't fire in tests);
and `userConfig = defaultThemeConfig` → `userConfig = {}` (behaviorally identical —
the next line `const baseConfig = {...defaultThemeConfig, ...userConfig}` already
supplies all defaults).

- [ ] **Step 2: Typecheck and run the full suite (no behavior regression)**

Run: `yarn typecheck`
Expected: PASS.

Run: `yarn jest`
Expected: PASS — the full suite stays green. `theme.ts` runs its `require` at module load; in the test environment `rott.config` is absent, so the catch runs with `userConfig = {}`, which produces the same `baseConfig` as before. No new test is added for the dev-only warn (brittle to isolate at module load).

- [ ] **Step 3: Add the Expo subsection to installation.md**

In `docs/docs/getting-started/installation.md`, immediately AFTER the closing of the babel `module-resolver` code block and its `:::tip` (the "Optional: rott.config.ts Runtime Resolution" section, which ends around line 172), insert a new subsection:

````markdown
#### Expo (babel-preset-expo)

Under Expo, `babel-preset-expo` does **not** apply project babel plugins (including `module-resolver`) to files inside `node_modules`. The `require('rott.config')` compiled into `@tansuk/rott-ui` is therefore never rewritten and fails to resolve at runtime — rott-ui silently falls back to the default theme.

For Expo, resolve `rott.config` through Metro instead, in `metro.config.js`:

```js title="metro.config.js"
const path = require('path')

// ...your existing config setup...

const defaultResolveRequest = config.resolver.resolveRequest
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'rott.config') {
    return {type: 'sourceFile', filePath: path.resolve(__dirname, 'rott.config.ts')}
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform)
}
```

:::warning
If your custom theme is not being applied under Expo (colors render as the rott-ui defaults), this missing Metro `resolveRequest` is the usual cause. In development you will also see a `[rott-ui] 'rott.config' could not be resolved at runtime` warning.
:::
````

- [ ] **Step 4: Commit**

```bash
git add src/theme/theme.ts docs/docs/getting-started/installation.md
git commit -m "fix(theme): warn in dev when rott.config fails to resolve

Add a __DEV__-only console.warn on the silent fallback to the default
theme so the failure is visible while developing, and document the Metro
resolveRequest required under Expo. Simplify the catch to userConfig = {}
(behaviour unchanged — defaults are spread regardless)."
```

---

### Task 3: Fix /config import docs (EN + TR) and add a regression guard

**Files:**
- Modify: `docs/docs/theming/rott-config.md` (EN)
- Modify: `docs/i18n/tr/docusaurus-plugin-content-docs/current/theming/rott-config.md` (TR)
- Create: `src/__tests__/configExport.test.ts`

**Interfaces:**
- Consumes: `package.json` `exports['./config']`; `src/rott-config-entry.ts` (exports `defineRottConfig`).
- Produces: a Jest guard that the `./config` subpath export stays wired to `rott-config-entry`.

- [ ] **Step 1: Write the failing regression-guard test**

Create `src/__tests__/configExport.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it passes (guard for already-correct state)**

Run: `yarn jest src/__tests__/configExport.test.ts`
Expected: PASS — the `./config` export and `defineRottConfig` already exist in the current source; this test locks that in so a future build/refactor cannot silently drop it. (This task's test is a regression guard, not red-green TDD — the code it guards already exists.)

- [ ] **Step 3: Fix the EN docs imports in rott-config.md**

In `docs/docs/theming/rott-config.md`, the root `defineRottConfig` imports are at
lines 25, 261, 275, and 326. Change all of them:

(a) Every line `import { defineRottConfig } from '@tansuk/rott-ui';`
→ `import { defineRottConfig } from '@tansuk/rott-ui/config';`
(lines 25, 261, 326 — a `replace_all` of this exact string is safe and covers all three).

(b) The combined import (line 275):
```ts
import { defaultThemeConfig, defineRottConfig } from '@tansuk/rott-ui';
```
becomes two imports (`defaultThemeConfig` stays at the root; `defineRottConfig` moves to `/config`):
```ts
import { defaultThemeConfig } from '@tansuk/rott-ui';
import { defineRottConfig } from '@tansuk/rott-ui/config';
```

(c) After the replacements, confirm none remain:
Run: `grep -n "defineRottConfig.*from '@tansuk/rott-ui'" docs/docs/theming/rott-config.md`
Expected: no output (all four converted to `/config` or split).

(d) Immediately after the first example's code block (line 25 area), add a note:
```markdown
:::note
Import `defineRottConfig` from `@tansuk/rott-ui/config`, not the package root.
The root entry can re-enter mid-initialization (require cycle
`index → theme → require('rott.config') → index`); the dedicated `/config`
subpath avoids it.
:::
```

- [ ] **Step 4: Mirror the same import fixes in the TR doc**

In `docs/i18n/tr/docusaurus-plugin-content-docs/current/theming/rott-config.md`,
change EVERY occurrence of an import of `defineRottConfig` from the package root
to the `/config` subpath. The TR mirror has these at lines 25, 261, 275, and 326
(one more than EN). Concretely:

- Every line `import { defineRottConfig } from '@tansuk/rott-ui';`
  → `import { defineRottConfig } from '@tansuk/rott-ui/config';`
  (lines 25, 261, 326 — a `replace_all` of this exact string is safe).
- The combined import (line 275)
  `import { defaultThemeConfig, defineRottConfig } from '@tansuk/rott-ui';`
  → split into:
  ```ts
  import { defaultThemeConfig } from '@tansuk/rott-ui';
  import { defineRottConfig } from '@tansuk/rott-ui/config';
  ```

Then add the Turkish note immediately after the FIRST example's code block
(matching the position of EN Step 3 (d)):
```markdown
:::note
`defineRottConfig` fonksiyonunu paket kökünden değil `@tansuk/rott-ui/config`
üzerinden import edin. Kök girişi başlatma sırasında tekrar girilebilir
(require döngüsü `index → theme → require('rott.config') → index`); özel
`/config` alt yolu bunu önler.
:::
```

Code blocks stay identical across locales; only the note prose is Turkish.

- [ ] **Step 5: Run the regression-guard test once more**

Run: `yarn jest src/__tests__/configExport.test.ts`
Expected: PASS — docs changes do not affect it; this confirms nothing regressed.

- [ ] **Step 6: Commit**

```bash
git add src/__tests__/configExport.test.ts \
        docs/docs/theming/rott-config.md \
        docs/i18n/tr/docusaurus-plugin-content-docs/current/theming/rott-config.md
git commit -m "docs(rott-config): import defineRottConfig from /config subpath

Update EN and TR rott.config examples to import defineRottConfig from
@tansuk/rott-ui/config instead of the package root (avoids the init-time
require cycle), and add a Jest guard that the ./config export stays wired
to rott-config-entry."
```

---

### Task 4: Bump version to 0.6.1

**Files:**
- Modify: `package.json:3`

**Interfaces:**
- Consumes: nothing.
- Produces: `version: "0.6.1"`.

- [ ] **Step 1: Run the full test suite**

Run: `yarn jest`
Expected: PASS — entire suite green (Icon fallback, configExport guard, and unchanged tests).

- [ ] **Step 2: Bump the version**

In `package.json`, change line 3 from `"version": "0.6.0",` to:

```json
  "version": "0.6.1",
```

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: bump version to 0.6.1"
```

---

## Post-plan (handled outside task execution)

After all tasks pass and are committed, the release (build via `yarn prepare`,
`npm publish --access public --otp=<code>`, push, tag `v0.6.1`, GitHub release)
is performed separately — same flow as the 0.6.0 release. Note `npm publish`
requires an OTP (2FA), so it is run interactively by the user.

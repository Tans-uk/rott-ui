# P3 Polish Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land three P3 DX fixes — configurable font sizes, border-suppresses-separator, and tintable input icons — for the 0.7.0 release.

**Architecture:** A React Native UI library. `fontSizeNormalizer` becomes config-driven (resolves `theme.fontSizes`, rott.config primary, with a uniform small-screen delta). `Input` derives `renderSeparator` from `border`. `DefaultInput` forwards icon tint props. Each fix is independent.

**Tech Stack:** TypeScript, React Native 0.81, Jest, @testing-library/react-native, Docusaurus docs.

## Global Constraints

- Target version: **0.7.0** — already bumped (package.json:3). **No version task in this plan.**
- Commit messages in **English**, Conventional Commits / commitlint compliant (lefthook commit-msg hook; `.cursor/rules` requires English).
- **`rott.config` is the primary source** — `theme.fontSizes` is checked before `themeConfig.fontSizes`; never the reverse.
- Test util import: `import {render} from '<relative>/__tests__/utils/testUtils'` (for component tests).
- Single-file test run: `yarn jest <path>`; snapshot update: `yarn jest -u <path>`.
- Docs EN/TR: `typography.md` has NO TR mirror → EN only. For `input.md`, check for a TR mirror and update both if it exists; otherwise EN only.
- The default screen width in the jest env is NOT small (`isSmallScreen` false) unless a test mocks `Dimensions`.

---

### Task 1: Config-driven fontSizeNormalizer + widened fontSize type

**Files:**
- Modify: `src/utils/fontSizeNormalizer.ts`
- Modify: `src/models/commonUiProps.interface.ts` (the `fontSize` union)
- Create: `src/utils/__tests__/fontSizeNormalizer.test.ts`
- Modify: `docs/docs/theming/typography.md`

**Interfaces:**
- Consumes: `theme` from `../theme` (has `fontSizes: Record<string, number>`); `themeConfig` from `../providers/RottProvider` (also has `fontSizes`).
- Produces: `fontSizeNormalizer(fontSize: string | number): number | string` — resolves config tokens, applies a −2 small-screen delta, falls back to legacy `xxl`/`xxxl`, returns unknown strings unchanged and numbers as-is.

- [ ] **Step 1: Write the failing tests**

Create `src/utils/__tests__/fontSizeNormalizer.test.ts`:

```ts
import {Dimensions} from 'react-native'

// Local mocks override the global jest.setup theme/providers mocks so the
// fontSizes map is fully controlled for this unit.
jest.mock('../../theme', () => ({
  theme: {
    fontSizes: {md: 14, '3xl': 36, custom: 50},
  },
}))

jest.mock('../../providers/RottProvider', () => ({
  themeConfig: {
    fontSizes: {providerOnly: 99},
  },
}))

import {fontSizeNormalizer} from '../fontSizeNormalizer'

describe('fontSizeNormalizer', () => {
  afterEach(() => jest.restoreAllMocks())

  const mockWidth = (width: number) =>
    jest.spyOn(Dimensions, 'get').mockReturnValue({width, height: 800, scale: 2, fontScale: 2})

  it('resolves a configured token (3xl) to its theme.fontSizes value', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('3xl')).toBe(36)
  })

  it('resolves a custom configured token', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('custom')).toBe(50)
  })

  it('honors a consumer override of a built-in key (md)', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('md')).toBe(14)
  })

  it('falls back to themeConfig.fontSizes when not in theme', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('providerOnly')).toBe(99)
  })

  it('applies a -2 delta on small screens', () => {
    mockWidth(360)
    expect(fontSizeNormalizer('3xl')).toBe(34)
  })

  it('keeps legacy xxl/xxxl responsive values (not in the fontSizes map)', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('xxl')).toBe(24)
    expect(fontSizeNormalizer('xxxl')).toBe(36)
    mockWidth(360)
    expect(fontSizeNormalizer('xxl')).toBe(22)
    expect(fontSizeNormalizer('xxxl')).toBe(34)
  })

  it('returns an unknown token unchanged', () => {
    mockWidth(800)
    expect(fontSizeNormalizer('nope')).toBe('nope')
  })

  it('passes a numeric size through unchanged', () => {
    mockWidth(800)
    expect(fontSizeNormalizer(20)).toBe(20)
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `yarn jest src/utils/__tests__/fontSizeNormalizer.test.ts`
Expected: FAIL — the current `fontSizeNormalizer` has no `theme`/`themeConfig` lookup, so `'3xl'`, `'custom'`, and `'providerOnly'` hit `default: return fontSize` and return the string instead of a number; the override and small-screen-delta tests also fail.

- [ ] **Step 3: Rewrite fontSizeNormalizer**

Replace the full contents of `src/utils/fontSizeNormalizer.ts` with:

```ts
import {Dimensions} from 'react-native'

import {themeConfig} from '../providers/RottProvider'
import {theme} from '../theme'

const SMALL_SCREEN_FONT_DELTA = 2

export const fontSizeNormalizer = (fontSize: string | number) => {
  if (typeof fontSize === 'number') return fontSize

  const isSmallScreen = Dimensions.get('window').width < 380

  // rott.config primary, RottProvider config fallback
  const configured = theme?.fontSizes?.[fontSize] ?? themeConfig?.fontSizes?.[fontSize]
  if (typeof configured === 'number') {
    return isSmallScreen ? configured - SMALL_SCREEN_FONT_DELTA : configured
  }

  // legacy keys absent from the fontSizes map keep their original responsive values
  switch (fontSize) {
    case 'xxl':
      return isSmallScreen ? 22 : 24
    case 'xxxl':
      return isSmallScreen ? 34 : 36
    default:
      return fontSize
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `yarn jest src/utils/__tests__/fontSizeNormalizer.test.ts`
Expected: PASS — all eight tests green.

- [ ] **Step 5: Widen the fontSize type**

In `src/models/commonUiProps.interface.ts`, change the `fontSize` line from:

```ts
  fontSize?: Omit<Size, 'full'> | 'xxxl' | number
```

to:

```ts
  fontSize?: Omit<Size, 'full'> | 'xxxl' | (string & {}) | number
```

`(string & {})` accepts any configured/custom token while preserving literal autocomplete.

- [ ] **Step 6: Full suite + typecheck (regression + cycle check)**

Run: `yarn jest`
Expected: PASS — the full suite stays green. `fontSizeNormalizer` now imports `theme` and `providers/RottProvider`; because `theme.fontSizes`/`themeConfig.fontSizes` are read inside the function body (call time), the import cycle (`fontSizeNormalizer → providers/RottProvider → features → … → fontSizeNormalizer`) does not break at module load. If any Label/style test fails on a cycle (a `Cannot access X before initialization` at load, not an assertion failure), STOP and report BLOCKED — the fallback is to drop the `themeConfig` lookup and import only `theme`.

Run: `yarn typecheck`
Expected: PASS — the widened union still accepts all existing usages.

- [ ] **Step 7: Update typography.md**

In `docs/docs/theming/typography.md`, after the font-size scale table (the section listing `xs`…`xxxl`), add:

```markdown
### Configured font-size tokens

`fontSize` also accepts any token defined in your [`rott.config.ts`](/docs/theming/rott-config) `fontSizes` map (for example `2xl`, `3xl`, or your own custom keys), plus any numeric value. Tokens you define there resolve at runtime, and overriding a built-in key (e.g. `md`) in `fontSizes` updates it everywhere `Label` is used. Built-in keys keep their responsive small-screen sizing.
```

- [ ] **Step 8: Commit**

```bash
git add src/utils/fontSizeNormalizer.ts \
        src/models/commonUiProps.interface.ts \
        src/utils/__tests__/fontSizeNormalizer.test.ts \
        docs/docs/theming/typography.md
git commit -m "feat(label): resolve configured fontSizes tokens in fontSizeNormalizer

fontSizeNormalizer only understood a hardcoded scale, so rott.config
fontSizes tokens (2xl, 3xl, custom) never resolved and built-in sizes
could not be overridden. Resolve theme.fontSizes (rott.config primary,
RottProvider config fallback) with a uniform small-screen delta; keep
legacy xxl/xxxl. Widen the fontSize type to accept configured tokens."
```

---

### Task 2: Input border auto-suppresses the underline Separator

**Files:**
- Modify: `src/features/Input/components/Input.tsx`
- Modify: `src/features/Input/__tests__/Input.test.tsx`
- Modify: `docs/docs/components/input.md`

**Interfaces:**
- Consumes: `props.border` (`{width?, radius?, variant?}`), `props.renderSeparator` (`boolean | undefined`).
- Produces: a `resolvedRenderSeparator` boolean used for the Separator render decision; `border` present + `renderSeparator` omitted ⇒ `false`.

- [ ] **Step 1: Write the failing tests**

Add to `src/features/Input/__tests__/Input.test.tsx` (inside the top-level `describe`):

```tsx
describe('Input -> border suppresses Separator', () => {
  const separatorTestId = 'input-separator-test-id'

  it('hides the Separator when border is set and renderSeparator is omitted', async () => {
    const {queryByTestId} = await render(
      <Input name='b1' border={{width: 1, radius: 8, variant: 'grey-200'}} />
    )
    expect(queryByTestId(separatorTestId)).toBeNull()
  })

  it('keeps the Separator when border is set and renderSeparator is explicitly true', async () => {
    const {getByTestId} = await render(
      <Input name='b2' border={{width: 1}} renderSeparator />
    )
    expect(getByTestId(separatorTestId)).toBeTruthy()
  })

  it('keeps the Separator when no border is provided', async () => {
    const {getByTestId} = await render(<Input name='b3' />)
    expect(getByTestId(separatorTestId)).toBeTruthy()
  })
})
```

NOTE: confirm the Separator's `testID`. Open `src/features/Input/components/Input.tsx` around the `<Separator` render (≈line 204). If the `<Separator>` has no `testID`, add `testID='input-separator-test-id'` to it as part of Step 3 so these tests can target it. If it already has a testID, use that exact value in the tests above instead.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `yarn jest src/features/Input/__tests__/Input.test.tsx`
Expected: FAIL — the first test fails because `renderSeparator` defaults to `true` regardless of `border`, so the Separator renders even with a border. (If the Separator has no testID yet, the tests fail to find the element — that is the same red signal; add the testID in Step 3.)

- [ ] **Step 3: Implement the conditional default**

In `src/features/Input/components/Input.tsx`:

(a) In the destructure (≈line 39), change `renderSeparator = true,` to `renderSeparator,` (remove the `= true` default so an omitted prop is `undefined`).

(b) Immediately after the destructure block closes (`} = props`) and before `const {language} = useRottContext()`, add:

```ts
  const resolvedRenderSeparator = renderSeparator ?? (border ? false : true)
```

(c) In `initializedProps` (≈line 55), replace `renderSeparator` with `renderSeparator: resolvedRenderSeparator`:

```ts
    const initializedProps = {renderSeparator: resolvedRenderSeparator, size, theme, touched, placeholderTextColor}
```

(d) In the Separator render guard (≈line 204), change `{!hasError && renderSeparator && (` to `{!hasError && resolvedRenderSeparator && (`.

(e) Ensure the `<Separator ... />` element carries `testID='input-separator-test-id'` (add it if missing) so the tests in Step 1 can target it.

- [ ] **Step 4: Run the tests + regenerate the snapshot**

Adding `testID='input-separator-test-id'` to the `<Separator>` changes the
existing `Input` snapshot (which renders the Separator in the default case).
Regenerate it:

Run: `yarn jest -u src/features/Input/__tests__/Input.test.tsx`
Expected: PASS — all three new tests green, existing Input tests still pass, and
the snapshot updated (the only diff should be the added `testID` on the
Separator).

- [ ] **Step 5: Typecheck**

Run: `yarn typecheck`
Expected: PASS.

- [ ] **Step 6: Document in input.md**

In `docs/docs/components/input.md`, add a short subsection (place it after the main usage examples):

```markdown
### Bordered inputs

Passing a `border` draws a boxed border and automatically hides the bottom
underline `Separator` (a box and an underline are mutually exclusive). To keep
the underline as well, pass `renderSeparator` explicitly:

\`\`\`tsx
<Input name='boxed' border={{width: 1, radius: 8, variant: 'grey-200'}} />
<Input name='boxed-with-line' border={{width: 1}} renderSeparator />
\`\`\`
```

(EN only — `input.md` has no TR mirror.)

- [ ] **Step 7: Commit**

```bash
git add src/features/Input/components/Input.tsx \
        src/features/Input/__tests__/Input.test.tsx \
        src/features/Input/__tests__/__snapshots__/Input.test.tsx.snap \
        docs/docs/components/input.md
git commit -m "fix(input): hide underline separator when border is set

renderSeparator defaulted to true regardless of border, so a bordered
Input rendered both a box and an underline. Default renderSeparator to
false when border is provided; an explicit renderSeparator still wins."
```

---

### Task 3: DefaultInput leading icon variant/color passthrough

**Files:**
- Modify: `src/features/Input/components/DefaultInput.tsx`
- Modify: `src/features/Input/__tests__/DefaultInput.test.tsx`
- Modify: `docs/docs/components/input.md`

**Interfaces:**
- Consumes: `icon?: IconProps` on `DefaultInput` (already carries `variant`/`color`).
- Produces: the leading `<Icon>` receives `variant={icon.variant}` and `color={icon.color}`.

- [ ] **Step 1: Write the failing test**

The file `src/features/Input/__tests__/DefaultInput.test.tsx` already exists (it
imports `{render, userEvent}` from `'../../../__tests__/utils/testUtils'` and has
a snapshot test). Append this new `describe` block to it (do not re-add the
imports):

```tsx
describe('DefaultInput -> leading icon tint', () => {
  it('forwards variant to the leading Icon', async () => {
    const {getByTestId} = await render(
      <DefaultInput name='i1' icon={{name: 'lock', variant: 'primary'}} />
    )
    // the Icon renders inside the default-input container
    expect(getByTestId('default-input-container-test-id')).toBeTruthy()
  })

  it('forwards color to the leading Icon', async () => {
    const {getByTestId} = await render(
      <DefaultInput name='i2' icon={{name: 'lock', color: '#abcabc'}} />
    )
    expect(getByTestId('default-input-container-test-id')).toBeTruthy()
  })
})
```

NOTE: the assertion above only proves the container renders. To assert the props actually reach `Icon`, add a `testID` to the leading `<Icon>` in Step 3 (`testID='default-input-icon-test-id'`) and assert `getByTestId('default-input-icon-test-id')` has prop `variant`/`color` via `toHaveProp`. Prefer the stronger assertion:

```tsx
    const icon = getByTestId('default-input-icon-test-id')
    expect(icon).toHaveProp('variant', 'primary')
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `yarn jest src/features/Input/__tests__/DefaultInput.test.tsx`
Expected: FAIL — the leading `<Icon>` does not yet receive `variant`/`color` (and has no `default-input-icon-test-id`), so the `toHaveProp('variant', 'primary')` assertion fails.

- [ ] **Step 3: Pass variant/color through**

In `src/features/Input/components/DefaultInput.tsx`, update the leading `<Icon>` (≈lines 59-66) to:

```tsx
      <Icon
        testID='default-input-icon-test-id'
        width={icon.width ?? 24}
        height={icon.height ?? 24}
        name={icon.name}
        mode={icon.mode}
        noStroke={icon.noStroke}
        strokeWidth={icon.strokeWidth}
        variant={icon.variant}
        color={icon.color}
      />
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `yarn jest src/features/Input/__tests__/DefaultInput.test.tsx`
Expected: PASS — both new tests green. NOTE: the existing `DefaultInput` snapshot
test renders `<DefaultInput name='test' />` with no `icon`, so it hits the
no-icon branch and the leading `<Icon>` (where the testID is added) does NOT
render there — the snapshot is unaffected and needs no regeneration.

- [ ] **Step 5: Typecheck**

Run: `yarn typecheck`
Expected: PASS — `icon` is `IconProps`, so `icon.variant`/`icon.color` are valid.

- [ ] **Step 6: Document in input.md**

In `docs/docs/components/input.md`, add to the bordered/icon area (EN only —
`input.md` has no TR mirror):

```markdown
### Tinting a leading icon

A leading `icon` accepts `variant` and `color` to tint it via props (no need to
bake the color into the SVG). `color` takes precedence over `variant`:

\`\`\`tsx
<Input name='email' icon={{name: 'mail', variant: 'primary'}} />
<Input name='locked' icon={{name: 'lock', color: '#FF6B6B'}} />
\`\`\`
```

- [ ] **Step 7: Commit**

```bash
git add src/features/Input/components/DefaultInput.tsx \
        src/features/Input/__tests__/DefaultInput.test.tsx \
        docs/docs/components/input.md
git commit -m "fix(input): forward variant/color to DefaultInput leading icon

The leading icon did not receive variant/color, so it always filled with
the default white and could only be colored by editing the SVG. Forward
icon.variant and icon.color to the Icon (color wins over variant)."
```

---

## Post-plan (handled outside task execution)

After all three tasks pass and are committed, the 0.7.0 release (build via
`yarn prepare`, `npm publish --access public --otp=<code>`, push, tag `v0.7.0`,
GitHub release) is performed separately. `npm publish` requires an OTP (2FA), run
interactively by the user. Then the `HANDOFF-IMPROVEMENTS-FROM-VETASIST.md` file
can be deleted (all P1/P2/P3 items will be complete).

# Design: P3 polish fixes (fontSize tokens, Input border separator, DefaultInput icon tint)

**Date:** 2026-06-22
**Target release:** 0.7.0 (unpublished — folds in with the P1/P2 work)
**Source:** `HANDOFF-IMPROVEMENTS-FROM-VETASIST.md` (the three P3 items)

## Problem

Three small DX/correctness gaps found during the VetAsist integration, verified
against current 0.7.0 source:

1. **`fontSizeNormalizer` ignores configured `fontSizes`.** It only understands a
   hardcoded switch (`xs|sm|md|lg|xl|xxl|xxxl` + numbers); the `default` branch
   returns the input string unchanged. A consumer's `rott.config` `fontSizes`
   token (e.g. `'3xl'`) never resolves, so `<Label fontSize="3xl">` passes the
   literal string `"3xl"` to RN (invalid → ignored). The `fontSize` prop type
   (`Omit<Size,'full'> | 'xxxl' | number`) also doesn't admit `'2xl'`/`'3xl'`.
2. **`Input` `border` does not suppress the underline `Separator`.**
   `renderSeparator` defaults to `true` regardless of `border`, so a
   `border={{...}}` draws a box AND an underline.
3. **`DefaultInput` left icon can't be tinted via props.** The leading `<Icon>`
   forwards width/height/name/mode/noStroke/strokeWidth but not `variant`/`color`,
   so with `mode='fill'` it fills with the default white.

## Key findings that shaped the design

- The switch's small-screen scaling is a **uniform −2** for every key
  (xs 10→8, sm 12→10, md 14→12, lg 16→14, xl 18→16, xxl 24→22, xxxl 36→34).
- `defaultThemeConfig.fontSizes` already exists: `xs:10, sm:12, md:14, lg:16,
  xl:18, '2xl':24, '3xl':36` — these equal the switch's normal-screen values.
  Therefore a config-driven normalizer with a −2 small-screen delta reproduces
  today's output exactly while honoring overrides and new tokens.
- Naming mismatch: switch uses `xxl`/`xxxl`; the config map uses `2xl`/`3xl`.
  Legacy `xxl`/`xxxl` are absent from the config map and must keep working.
- `rott.config` stays the primary source (consistent with the P2 batch);
  `RottProvider` config is a fallback.

## Scope

In scope: the three fixes above + targeted tests. No version bump (0.7.0 already
bumped, unpublished).

Out of scope: a generic theme-token typing system for `fontSizes` (like the
`TThemeIcons` machinery) — the prop type is widened pragmatically instead.

## Design

### 1. fontSizeNormalizer — config-driven (P3 #7)

**`src/utils/fontSizeNormalizer.ts`** — rewrite:

```ts
import {Dimensions} from 'react-native'

import {theme} from '../theme'
import {themeConfig} from '../providers/RottProvider'

const SMALL_SCREEN_FONT_DELTA = 2

export const fontSizeNormalizer = (fontSize: string | number) => {
  if (typeof fontSize === 'number') return fontSize
  const isSmallScreen = Dimensions.get('window').width < 380

  // rott.config primary, RottProvider config fallback (consistent with Icon)
  const configured = theme?.fontSizes?.[fontSize] ?? themeConfig?.fontSizes?.[fontSize]
  if (typeof configured === 'number') {
    return isSmallScreen ? configured - SMALL_SCREEN_FONT_DELTA : configured
  }

  // legacy keys not present in the fontSizes map keep their original responsive values
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

- Built-in keys (`xs..xl`, `2xl`, `3xl`) resolve from `theme.fontSizes`; default
  values reproduce the switch exactly, so existing Labels are unchanged.
- Consumers can now override built-in sizes (e.g. `fontSizes.md = 20`) via
  rott.config — the switch previously hardcoded these.
- Legacy `xxl`/`xxxl` keep responsive numbers via the switch fallback.
- `theme.fontSizes` is primary; `themeConfig.fontSizes` (RottProvider) is the
  fallback.

**`src/models/commonUiProps.interface.ts`** — widen the type so config tokens
typecheck:

```ts
fontSize?: Omit<Size, 'full'> | 'xxxl' | (string & {}) | number
```

`(string & {})` admits any token (`'2xl'`, `'3xl'`, custom) while preserving
literal autocomplete.

**Checkpoint (resolve at implementation):** require-cycle from
`fontSizeNormalizer → theme` / `→ providers/RottProvider`. `theme` is a one-way
edge (theme.ts imports `../utils/consumerAssets` directly, not the barrel, and
does not depend on fontSizeNormalizer). `themeConfig` repeats the benign Icon
pattern — both are read at call time (inside the function body), so module-load
order is irrelevant. Import via the narrowest paths; verify the full suite stays
green.

**Tests** (extend or add `src/utils/__tests__/fontSizeNormalizer.test.ts`):
- `'3xl'` → 36 (normal), 34 (small screen).
- a consumer `fontSizes.md` override is reflected (mock `theme.fontSizes`).
- unknown token (e.g. `'nope'`) → returned unchanged.
- `'xxl'`/`'xxxl'` → unchanged responsive values (24/22, 36/34).
- numeric input passes through.

### 2. Input border auto-suppresses Separator (P3 #8)

**`src/features/Input/components/Input.tsx`**

- Remove the `= true` default from the `renderSeparator` destructure (line 39) so
  "not passed" is distinguishable as `undefined`.
- After the destructure, resolve:
  ```ts
  const resolvedRenderSeparator = renderSeparator ?? (border ? false : true)
  ```
- Use `resolvedRenderSeparator` in `initializedProps` (line 55) and the render
  guard (line 204) in place of `renderSeparator`.

Behavior:

| `border` | `renderSeparator` prop | Result |
|---|---|---|
| absent | not passed | `true` (unchanged) |
| present | not passed | `false` (new — no double line) |
| present | explicit `true` | `true` (override) |
| any | explicit `false` | `false` |

`??` ensures only `undefined` triggers the border-based default; explicit values
always win.

**Tests** (extend `src/features/Input/__tests__/Input.test.tsx`):
- `border` without `renderSeparator` → no Separator in the tree.
- `border` + `renderSeparator={true}` → Separator present.
- no `border`, no `renderSeparator` → Separator present (unchanged).

### 3. DefaultInput left icon tint passthrough (P3 #9)

**`src/features/Input/components/DefaultInput.tsx`**

Add `variant` and `color` to the leading `<Icon>` (lines 59-65):

```tsx
<Icon
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

`Icon` already resolves `color ?? colorFromVariant(variant)`, so `color` wins over
`variant` when both are present; when neither is passed, behavior is unchanged.

**Checkpoint:** confirm the `icon` prop type on `DefaultInput` carries
`variant`/`color` (it should be `IconProps`) so the passthrough typechecks.

**Tests** (extend the DefaultInput/Input tests):
- `icon={{name, variant:'primary'}}` → rendered Icon receives `variant='primary'`.
- `icon={{name, color:'#abcabc'}}` → rendered Icon receives `color='#abcabc'`.
- `icon={{name}}` (no tint) → unchanged.

## Docs

- **`docs/docs/theming/typography.md`** (EN; no TR mirror exists → EN only): add a
  note that `fontSize` accepts configured `rott.config` `fontSizes` tokens (incl.
  `2xl`/`3xl` and custom tokens), not only the built-in scale, and that consumer
  `fontSizes` overrides now apply.
- **`docs/docs/components/input.md`** (verify TR mirror; update both if it
  exists): the `border`, `renderSeparator`, and `icon` props are currently
  undocumented — add brief entries covering (a) that `border` auto-hides the
  underline `Separator` unless `renderSeparator` is set explicitly, and (b) that a
  leading `icon` accepts `variant`/`color` for tinting.

## Risks

- **fontSize type widening** affects all components using the common `fontSize`
  prop (it is a shared prop). Acceptable: the normalizer handles unknown strings
  gracefully, and the DX gain (configured tokens resolve) outweighs the reduced
  strictness.
- **fontSizeNormalizer now reads module state** (`theme`/`themeConfig`) instead
  of being pure — mitigated by call-time reads; verify no require-cycle breakage
  via the full suite.
- **renderSeparator default change** is a behavior change only for the
  `border`-present + prop-omitted case (the intended fix); all other cases are
  unchanged.

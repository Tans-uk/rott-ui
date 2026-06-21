# Rott-UI Improvement Handoff (discovered while integrating into VetAsist mobile)

> **Audience:** an engineer/agent working in the **Rott-UI source repo** (`@tansuk/rott-ui`).
> **Origin:** Real runtime bugs and DX gaps found while building the VetAsist Expo (SDK 54) mobile app's auth/onboarding screens against rott-ui **0.2.0** (the version published to npm; this source repo is newer, ~0.5.x). Each item lists the file, the current behavior, why it's a problem, a repro, and a recommended change.
> **Priority:** **P1 (must-fix, blocks consumers)**, then P2 (DX/correctness), then P3 (docs/polish).
> **Verification:** all behaviors were observed on a real iOS build, not inferred from types.

---

## P1 — `PasswordInput` only accepts digits (breaks text passwords)

**File:** `src/features/Input/components/PasswordInput.tsx`

**Current behavior:**
```ts
const handleTextChange = (inputText: string) => {
  onChangeText!(inputText.replace(/[^0-9]/g, ''))   // strips every non-digit
}
// ...
<TextInput keyboardType='number-pad' secureTextEntry={isSecure} ... />
```
The component **strips all non-numeric characters** and uses a `number-pad` keyboard.

**Why it's a problem:** `type="password"` is the natural choice for a login/registration password field, but real passwords contain letters and symbols (e.g. `B56_*016`). With this component the user literally cannot type them — letters/symbols are deleted on input. This silently breaks every login/registration/reset-password screen that uses `type="password"`. (In VetAsist it made the login password field unusable.) It behaves like a numeric PIN field, not a password field.

**Recommended change:** make text the default; keep numeric behavior as an opt-in.

1. `src/features/Input/models/passwordInputProps.interface.ts`:
```ts
import type {IconProps} from '../../Icon'
import type {BaseInputProps} from './baseInputProps.interface'

export interface PasswordInputProps extends BaseInputProps {
  type?: 'password'
  /** When true, restrict input to digits and use a numeric keyboard (PIN-style). Default: false. */
  numericOnly?: boolean
  /** Optional leading icon rendered inside the field (e.g. a lock). */
  icon?: IconProps
}
```
2. `PasswordInput.tsx`:
```tsx
// destructure: numericOnly = false, icon, ...
const handleTextChange = (t: string) =>
  onChangeText!(numericOnly ? t.replace(/[^0-9]/g, '') : t)
// TextInput:
keyboardType={numericOnly ? 'number-pad' : 'default'}
autoCapitalize='none'
autoCorrect={false}
```
> Note: if any existing consumer relies on the current digit-only behavior, this is a behavior change — gate it behind `numericOnly` and bump a minor version + changelog. The digit-strip-by-default is almost certainly the original bug.

---

## P1 — `Label` ignores its documented `text` prop (renders only `children`)

**Files:** `src/features/Label/components/Label.tsx`, `src/features/Label/models/labelProps.ts`

**Current behavior:** `LabelProps` declares `text?: string`, but the component renders only `{children}`:
```tsx
// Label.tsx
return <Text ... {...props}>{children}</Text>   // `text` is never read; it just spreads into <Text> via ...props and is ignored
```

**Why it's a problem:** `Button` accepts a `text` prop and renders it, so consumers naturally assume `<Label text="Hello" />` works. It compiles (the prop is in the type) but renders **nothing** — invisible text with no error. In VetAsist this caused invisible headings/subtitles on onboarding, splash wordmark, and the entire login screen until every call site was switched to children. It's a silent, hard-to-debug trap.

**Recommended change (pick one):**
- **Render it:** `{text ?? children}` (or `{children ?? text}`) in `Label.tsx`. Backwards-compatible, makes the prop honour its type. **Preferred.**
- Or **remove `text` from `LabelProps`** so misuse is a compile error instead of silent failure.

**Repro:** `<Label text="Görünmez" />` renders empty; `<Label>Görünür</Label>` renders.

---

## P2 — `rott.config` does not resolve at runtime under Expo / monorepo (falls back to default theme)

**Files:** `src/theme/theme.ts`, docs `docs/docs/getting-started/installation.md`, `docs/docs/theming/rott-config.md`

**Current behavior:** `theme.ts` resolves the consumer config via a bare `require('rott.config')` inside a `try/catch`:
```ts
try { userConfig = require('rott.config').config } catch { userConfig = defaultThemeConfig }
export const theme = { ...userConfig }
```
The docs tell consumers that the **babel `module-resolver` alias** (`'rott.config': './rott.config.ts'`) is sufficient for runtime resolution.

**Why it's a problem:** Under **Expo (`babel-preset-expo`)**, the project babel plugins (incl. `module-resolver`) are **not applied to files inside `node_modules`**, so the `require('rott.config')` baked into the **compiled** `lib/module/theme/theme.js` is never rewritten → the bare specifier reaches Metro, fails to resolve → the `catch` silently falls back to `defaultThemeConfig`. Result: the consumer's entire custom palette is ignored at runtime. `variant="primary"` renders the rott-ui default blue, and custom tokens (`surface-alt`, `button-fill-bg`, etc.) don't resolve at all. This is silent (no error) and very hard to diagnose.

**Workaround the consumer had to discover (works):** add a Metro `resolveRequest` (this is what `examples/consumer-app/metro.config.js` already does, but the installation docs don't mention it for Expo):
```js
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'rott.config') {
    return { type: 'sourceFile', filePath: path.resolve(__dirname, 'rott.config.ts') }
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform)
}
```

**Recommended changes:**
- **Docs:** in `installation.md` / `rott-config.md`, add an **Expo section** that documents the Metro `resolveRequest` approach as the required runtime resolution for Expo (the babel alias alone is insufficient there).
- **Resilience (optional):** if `require('rott.config')` throws, consider a `console.warn('[rott-ui] rott.config could not be resolved at runtime; using defaultThemeConfig. See <docs link>.')` so the silent fallback becomes visible.

---

## P2 — Require cycle when `rott.config.ts` imports from the package root

**Files:** `src/rott-config-entry.ts` (exists), package `exports` `./config`

**Current behavior:** `rott-config-entry.ts` already exists to break the cycle (`index → … → theme → require('rott.config') → index`) and is exported as `@tansuk/rott-ui/config`. But the **published 0.2.0 does not include the `./config` export** (only `.`). The docs' Step-1 example still shows `import { defineRottConfig } from '@tansuk/rott-ui'` (root), which re-enters the index mid-initialization and can leave `defineRottConfig` undefined → the consumer's `rott.config.ts` throws → `catch` → default theme.

**Why it's a problem:** consumers on the published version can't import from `@tansuk/rott-ui/config` (doesn't exist), and importing from the root risks the cycle. VetAsist had to drop `defineRottConfig` entirely and inline `export const config = {...} as const`.

**Recommended changes:**
- Ensure the `./config` subpath export ships in the **published** package (verify the build/publish includes `lib/module/rott-config-entry.js` + types).
- Update `docs/docs/theming/rott-config.md` **Step 1** to import from `@tansuk/rott-ui/config`, not the root, and add a note explaining the cycle.

---

## P2 — `Icon` resolves names only from `theme.icons` (rott.config), not `RottProvider config.icons`

**File:** `src/features/Icon/components/Icon.tsx`

**Current behavior:**
```ts
const IconComponent = theme?.icons?.[name]
if (!IconComponent) return null
```
`Icon` reads `theme.icons` (from `rott.config`). Icons passed at runtime via `<RottProvider config={{ icons }} />` populate `themeConfig.icons` (a **different** object) and are **never consulted** by `Icon`.

**Why it's a problem:** It's natural to register custom icons through `RottProvider config.icons` (the runtime config), and it type-checks, but `Icon` silently returns `null` for those names (empty grid / invisible logo). VetAsist registered all icons via `RottProvider` and nothing rendered until they were moved into `rott.config.ts` `icons`. The two config channels (`theme` from rott.config vs `themeConfig` from RottProvider) are easy to confuse.

**Recommended change:** have `Icon` fall back across both sources, e.g. `theme?.icons?.[name] ?? themeConfig?.icons?.[name]`, OR clearly document that **icons must be declared in `rott.config.ts`** (Asset Auto-Discovery / `icons` map), not in `RottProvider config`. At minimum, document the distinction prominently.

---

## P3 — `fontSizeNormalizer` ignores the configured `fontSizes` map

**File:** `src/utils/fontSizeNormalizer.ts` (used by `Label`, etc.)

**Current behavior:** the normalizer only understands hardcoded keys `xs|sm|md|lg|xl|xxl|xxxl` (+ raw numbers); anything else hits `default: return fontSize` (returns the string as-is). The `fontSizes` map a consumer defines in `rott.config.ts` (e.g. `'3xl'`, `'2xl'`) **never reaches** this normalizer, so `<Label fontSize="3xl">` passes the literal string `"3xl"` to RN as a font size (invalid → ignored/fallback).

**Why it's a problem:** consumers reasonably expect `fontSize` token keys from their `rott.config` `fontSizes` to work on `Label`. They don't; only the built-in scale or numeric values work. VetAsist had to use numeric `fontSize={22}`.

**Recommended change:** wire `fontSizeNormalizer` (or `Label`) to look up `theme.fontSizes[key]` before falling back to the hardcoded switch, so configured tokens resolve. Otherwise document that `Label.fontSize` only accepts the built-in scale or a number.

---

## P3 — `Input`: `border` does not auto-suppress the underline `Separator`

**File:** `src/features/Input/components/Input.tsx`

**Current behavior:** `renderSeparator` defaults to `true`. Passing a `border={{ width, radius, variant }}` draws the boxed border but the bottom `<Separator>` still renders, so consumers get both a box **and** an underline unless they also pass `renderSeparator={false}`.

**Recommended change:** when `border` is provided, default `renderSeparator` to `false` (a bordered box and an underline are mutually exclusive styles). Keep the explicit prop as an override. Minor, but removes a foot-gun.

---

## P3 — `DefaultInput` left `icon` renders with the default fill (no `variant`/`color` passthrough)

**File:** `src/features/Input/components/DefaultInput.tsx`

**Current behavior:** when `icon` is provided it renders `<Icon name=... width=... height=... mode=... noStroke=... strokeWidth=... />` but does **not** pass `icon.variant` / `icon.color`. With `mode='fill'` the icon fills with `colorFromVariant('white')` (white) unless the SVG has its own explicit fills. Consumers wanting a colored leading icon must bake the color into the SVG.

**Recommended change:** pass `variant={icon.variant}` and `color={icon.color}` through to the `<Icon>` so a leading input icon can be tinted via props (e.g. a coral mail/lock icon) without editing the SVG.

---

## Suggested validation for the agent

- Add/extend unit tests:
  - `PasswordInput`: typing `"B56_*016"` keeps the full string when `numericOnly` is unset; only digits when `numericOnly`.
  - `Label`: `text="x"` renders `"x"` (if you choose to render it).
  - `Icon`: resolves a name present only in `RottProvider config.icons` (if you add the fallback).
- After fixing P1 PasswordInput, bump a minor version and publish so consumers (VetAsist) can adopt `type="password" icon={{ name: 'lock' }}` for text passwords with a leading lock icon.

## Consumer context (for reference)

- VetAsist mobile: Expo SDK 54, `@tansuk/rott-ui` 0.2.0, colors/icons defined in `apps/mobile/rott.config.ts`, runtime resolution fixed via Metro `resolveRequest`.
- The login/onboarding screens are the first heavy rott-ui usage; the items above are the gaps that cost the most debugging time. P1 items are blocking correctness bugs; the rest are DX/clarity.

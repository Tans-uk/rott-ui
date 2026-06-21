# Design: PasswordInput & Label P1 fixes (0.6.0)

**Date:** 2026-06-21
**Target release:** 0.6.0 (minor — PasswordInput changes default behavior)
**Source:** `HANDOFF-IMPROVEMENTS-FROM-VETASIST.md` (P1 items #1 and #2)

## Problem

Two P1, consumer-facing bugs found while integrating `@tansuk/rott-ui` into the
VetAsist mobile app:

1. **`PasswordInput` strips all non-digit characters** and forces a `number-pad`
   keyboard, so real text passwords (e.g. `B56_*016`) cannot be typed — every
   login/registration/reset-password screen using `type="password"` is broken.
2. **`Label` declares a `text?: string` prop but never renders it** — it renders
   only `children`. `<Label text="Hi" />` compiles but shows nothing, a silent,
   hard-to-debug trap.

Context that shaped the design:
- A dedicated `PinPasswordInput` component already exists (routed via
  `type="pinPassword"` in `Input.tsx`). Numeric PIN entry has its own component,
  which confirms `PasswordInput`'s digit-stripping was a bug, not an intended
  PIN feature.
- `Button.tsx` already renders its label with `{children ?? text}` (line 142) and
  renders icons by spreading `{...icon}` then supplying fallbacks. Both fixes
  follow these established conventions.

## Scope

In scope:
- Fix `PasswordInput` default to accept text; add opt-in `numericOnly` prop.
- Add an optional leading `icon` prop to `PasswordInput`.
- Fix `Label` to render its `text` prop.
- Update/add tests for both (existing `PasswordInput` tests assert the old buggy
  behavior and must be rewritten; snapshot regenerated).

Out of scope:
- P2/P3 items from the handoff doc.
- Changing the Android paste-prevention behavior.
- Refactoring or deprecating `PinPasswordInput`.

## Design

### 1. PasswordInput

**`src/features/Input/models/passwordInputProps.interface.ts`**

```ts
import type {IconProps} from '../../Icon'
import type {BaseInputProps} from './baseInputProps.interface'

export interface PasswordInputProps extends BaseInputProps {
  type?: 'password'
  /** When true, restrict input to digits and use a numeric keyboard (PIN-style). Default: false. */
  numericOnly?: boolean
  /** Optional leading icon rendered inside the field. */
  icon?: IconProps
}
```

**`src/features/Input/components/PasswordInput.tsx`**

- Destructure `numericOnly = false` and `icon`.
- `handleTextChange`:
  ```ts
  const handleTextChange = (inputText: string) =>
    onChangeText!(numericOnly ? inputText.replace(/[^0-9]/g, '') : inputText)
  ```
- `<TextInput>`:
  - `keyboardType={numericOnly ? 'number-pad' : 'default'}`
  - add `autoCapitalize='none'`
  - add `autoCorrect={false}`
- Leading icon, following the `Button.tsx` idiom, rendered inside `<Item row>`
  before the `<TextInput>`:
  ```tsx
  {icon && (
    <Icon
      {...icon}
      testID='password-leading-icon-test-id'
      name={icon.name}
      variant={icon.variant}
      width={icon.width ?? 24}
      height={icon.height ?? 24}
    />
  )}
  ```
- Add a `leadingIcon` style (absolute, `left: 10`) mirroring the existing
  `showPasswordIcon` (absolute, `right: 10`) in `PasswordInput.style.ts`. When
  `icon` is present, apply `paddingLeft: 34` to the input (icon width 24 +
  `left: 10`) so typed text clears the icon; no left padding when `icon` is
  absent, preserving the current layout exactly.

**Unchanged:** `secureTextEntry` toggle + eye icon; iOS/Android paste-prevention
(`contextMenuHidden`, `onSelectionChange`/`handleSelectionChange`).

### 2. Label

**`src/features/Label/components/Label.tsx`**

- Add `text` to the destructured props (so it no longer leaks into `...props` and
  onto the native `<Text>`).
- Render `{children ?? text}` instead of `{children}` — same convention as
  `Button.tsx`.

**`src/features/Label/models/labelProps.ts`** — no change; `text?: string`
already exists. The bug was purely that the component never read it.

Behavior after fix:
- `<Label>Hi</Label>` → `Hi` (unchanged)
- `<Label text="Hi" />` → `Hi` (was blank)
- `<Label text="A">B</Label>` → `B` (children win — backward-compatible)

## Testing

Targeted tests for both components.

**PasswordInput** (rewrite `src/features/Input/__tests__/PasswordInput.test.tsx`
— current tests assert the old buggy behavior; snapshot regenerated):
- accepts text unchanged by default (`'aaA*a123'` → `'aaA*a123'`)
- strips to digits only when `numericOnly` (`'aaA*a123'` → `'123'`)
- `keyboardType` is `'default'` by default, `'number-pad'` when `numericOnly`
- renders the leading icon when `icon` is provided
- preserves: `secureTextEntry` default true, eye-toggle flips it,
  `contextMenuHidden`, `onSelectionChange` present

**Label** (add a test file):
- renders `text` when no children
- renders `children` when both `text` and `children` are passed
- renders `children` when no `text`

## Migration note (for changelog / release notes)

`PasswordInput` now accepts text by default. Consumers that relied on the old
digit-only behavior must pass `numericOnly` (or switch to `PinPasswordInput` for
PIN entry). This is why the release is a minor (0.6.0), not a patch.

## Risks

- Breaking the three existing PasswordInput tests is expected; they encode the
  bug and will be rewritten to match corrected behavior.
- The leading-icon left-padding must not regress the existing right-side eye icon
  layout — verify the snapshot diff after regeneration.

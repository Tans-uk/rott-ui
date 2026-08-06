---
id: release-notes
title: Release Notes
description: What changed in every published release of @tansuk/rott-ui.
---

# Release Notes

Every published release of `@tansuk/rott-ui`, newest first.

Versions follow [semantic versioning](https://semver.org). While the library is
in `0.x`, a **minor** bump may carry breaking changes; a **patch** bump never
does. Breaking changes are always listed first, with the migration step next to
them.

---

## 0.9.0

**Button prop contract.** Two props that the public surface declared but the
renderer ignored, and one size token that was not the size it claimed to be.
Both defects were silent: the code type-checked, rendered, and warned about
nothing while producing the wrong style.

### Breaking changes

**`size="full"` is now relative to its container, not a fixed width.**

It previously resolved to a fixed `342px`, scaled from a 390pt reference device,
with no parent width anywhere in the path — so it tracked the screen rather than
the container and overflowed any parent narrower than the reference content box.
It now resolves to `100%` of the parent.

On a full-width page the two are the same pixels, so page-level buttons are
unchanged. Only nested cases move — which were the broken ones.

```tsx
// Was: a fixed 342, spilling out of the card's padding.
// Now: fills the card's content box.
<Item paddingHorizontal={24}>
  <Button size="full">Continue</Button>
</Item>
```

If a call site deliberately relied on `full` being a fixed width, pass it
explicitly:

```tsx
<Button size="full" width={342}>Continue</Button>
```

**`xl` and `xxl` are distinct sizes.**

They previously shared a branch with `full` and the default, making all four
indistinguishable. They now resolve their widths from `sizeToPercentage`, the
same table every other component uses, and carry their own heights.

| Size | Width | Height |
|------|-------|--------|
| `xs` | 85.5 | 36 |
| `sm` | 114 | 40 |
| `md` | 171 | 48 |
| `lg` | 228 | 56 |
| `xl` | 85% of parent | 64 |
| `xxl` | 92.5% of parent | 72 |
| `full` | 100% of parent | 56 |

`xs` through `lg` remain fixed widths, expressed against a 390pt reference
device and scaled to the actual screen width.

:::note
Percentage widths need a parent with a resolved width. Inside a parent that
sizes to its content — a column with `alignItems: center` and no width, for
instance — a percentage resolves against that shrunken box. The old fixed width
was indifferent to this; the new one is not.
:::

**A button with no `size` prop is now full width.**

The default is `{height: 'lg'}`, which previously fell through to the same fixed
`342px`. It now resolves to `100%` of the parent, with an unchanged height of
`56`.

### Fixed

- **`borderWidth` and `borderColor` are honored on every variant.**
  ([#8](https://github.com/Tans-uk/rott-ui/issues/8))
  Both props were declared on the public surface but never read — the border was
  derived solely from the variant name, so a caller passing them got no warning
  and no effect. Explicit props now win, with the `*-outline` border kept as the
  fallback when neither is passed.

  This matters for controls whose fill is fixed by a brand guideline. The border
  is then the only thing separating the control from the page, and
  [WCAG 2.1 SC 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast)
  asks for at least 3:1 contrast on that boundary. A white button on a
  near-white page previously shipped with no border at all.

  ```tsx
  <Button backgroundColor="#FFFFFF" color="#1F1F1F" borderWidth={1} borderColor="#747775">
    Sign in with Google
  </Button>
  ```

- **Non-outline variants no longer carry a hardcoded white border colour.**
  ([#8](https://github.com/Tans-uk/rott-ui/issues/8))
  `borderColor` defaulted to `'white'` on every non-outline variant. It was
  invisible only because `borderWidth` happened to be undefined, and it silently
  overwrote any colour a caller supplied. The default is now unset.

  If you were relying on that white edge by passing only `borderWidth`, pass
  `borderColor="white"` explicitly — an unset colour renders in React Native's
  default black.

- **`size="full"` no longer overflows padded parents.**
  ([#9](https://github.com/Tans-uk/rott-ui/issues/9))
  See the breaking-change note above.

### Documentation

- The Button page documents the border props, the full size table, and which
  widths are fixed versus parent-relative.
- Corrected: the props table gave the `size` default as `'md'`; it is
  `{height: 'lg'}`. `xxl` was missing from the documented sizes entirely.
- This release notes page.

### Still open

Both issues expose wider gaps that are **not** closed by this release:

- `commonUiStyleProperties` maps only the five `border*Radius` props. The
  remaining 14 border props declared on `CommonUiProps` — widths and colours —
  still have no path to a style on components other than Button.
- The fixed `342` reference-device width remains hardcoded in `Notification`,
  `ActionMenu`, `ActionMenuHeader`, and `ToggleInput`.

---

## Earlier releases

Releases up to and including `0.8.0` predate this page, and only `v0.6.0`,
`v0.5.2` and `v0.4.1` carry git tags — `0.7.0` and `0.8.0` were published to npm
without one, so there is no commit range to link for them. Every published
version is listed on
[npm](https://www.npmjs.com/package/@tansuk/rott-ui?activeTab=versions).

Summarised from the commits that carried each version bump:

- **`0.8.0`** — `leftIcon` / `rightIcon` slots across all input types
  (`amountInput`, `ibanInput`, `dateInput`, `selectInput`, `checkBoxInput`,
  `toggleInput`); optional-callback guards so `DateInput`, `SelectInput` and
  `ToggleInput` no longer throw when their handler is omitted.
- **`0.7.0`** — `rott.config` and `Icon` runtime-resolution fixes;
  `RottProvider` merges config into `themeConfig` deterministically per render.
- **`0.6.0` and earlier** — see the
  [tags](https://github.com/Tans-uk/rott-ui/tags).

Tagging resumes with this release.

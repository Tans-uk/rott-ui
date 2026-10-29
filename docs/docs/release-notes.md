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

## 0.12.0

**Borders that were never drawn, and Input label options.** Border props passed to `Item`
and the components built on the same styles were silently dropped; they now render, and
their colors accept theme color names. `Button` resolves theme color names in its border
and fill. `Input` labels can keep their case and set their own spacing.

### Breaking changes

- **Border props now render.** `borderWidth` and `borderColor` never reached the style of
  `Item` and the other components that take the common UI props, and `Item` also dropped
  `borderRadius` and the corner radius props. These borders now appear, including ones the
  library's own components asked for: the `CheckBoxInput` box, the radio rings in
  `CommonItem` and `DateInput`, the `border` prop of `Input`, and the corner radii in
  `ActionMenu`, `Alert`, `AlertDialog`, `Modal`, `Notification` and `Skeleton`. If a screen
  passed these props without wanting a border, remove them.

### Added

- `Input` label options, on an object `label`: `uppercase` (default `true`; `false` keeps the
  text and `description` as written), `gap` (default `0`, the space between the label and
  its field) and `marginTop` (default `16`, the space above the label). The defaults keep
  today's look.

### Fixed

- `Button` resolves theme color names in `borderColor` and `backgroundColor`. It passed
  them on unchanged, so a name such as `"surface"` reached React Native as an invalid
  color; literal colors still pass through.
- `borderColor` accepts theme color names wherever the common UI props are accepted, the
  same way `backgroundColor` does.

### Documentation

- The Button page lists `backgroundColor` and says both colors take theme color names;
  the Item page has a bordered example; the Colors page shows `borderColor` with a theme
  color; the Input page lists the label options.

## 0.11.0

**FlashList 2.x support.** `List` works with `@shopify/flash-list` 1.x (from 1.8.0) and
2.x, and both are type-checked and tested on every change. FlashList 2.x runs only on the
New Architecture, so apps on the old architecture stay on 1.x. The peer range is
unchanged (`>=1.8.0`).

### Breaking changes

- **`headerSeparator` and `footerSeparator` draw next to your own header and footer.**
  When you passed `ListHeaderComponent` together with `headerSeparator`, your header
  replaced the separator. Now both render, in the order header, separator, items,
  separator, footer; the same goes for `ListFooterComponent` and `footerSeparator`. Your
  header keeps its state across renders. To keep only your header, drop
  `headerSeparator`.

### Added

- Support for FlashList 2.x in `List`, next to 1.x.
- `skeletonCount` on `List` sets how many skeleton rows render while `isLoading`. When
  unset, the count still falls back to `estimatedItemSize`, then to 1, so existing
  screens render the same. Set it wherever you pass `estimatedItemSize`. A loading list
  always renders at least one row, so a count of 0 no longer shows the empty state.

### Fixed

- `estimatedItemSize` on `List` type-checks with FlashList 2.x. It failed with TS2322
  because FlashList 2.x removed it from its props. FlashList 1.x uses it for layout;
  2.x measures items itself and ignores it.

### Documentation

- The List page no longer marks `estimatedItemSize` as required, and describes
  `itemsToShow` as the list height it sets rather than a skeleton count. Its loading
  examples rendered one skeleton row per pixel of `estimatedItemSize`; they now use
  `skeletonCount`. New sections cover header and footer separators and FlashList 1.x
  and 2.x.

### Tooling

- Development uses FlashList 2.3.3; 1.8.3 stays installed as `@shopify/flash-list-v1`.
  `yarn typecheck` checks both versions, and `yarn test:flashlist-v1` runs the suites
  that render a list against 1.x with their own snapshots, also in CI.

## 0.10.0

**Correctness fixes.** Crashes, money bugs and several silent failures found in a
review of 0.9.0. Every fix comes with a regression test, and the test setup no longer
mocks `React.useContext`, which had been hiding the crashes. Some fixes change behavior
an app may rely on, so this is a minor release.

### Breaking changes

- **Notifications no longer block the app.** While a toast was visible, every touch in
  the app was ignored. The app now stays interactive by default. To keep the old
  behavior, pass `blockTouchesWhileNotificationVisible` to `RottProvider`. In the default
  mode a toast now responds to touch: tapping it closes it and runs its `onPress`, and
  swiping it sideways dismisses it. Before, it could not be touched.
- **A loading `Button` ignores presses.** Pressing a button while `isLoading` no longer
  calls `onPress`, so a slow request cannot be submitted twice. It looks the same. If a
  loading button doubled as a cancel control, render a separate control for that.
- **`EmailInput` follows its `value` prop.** When you pass `value`, the field shows it,
  so form resets work. A `value` without `onChangeText` now makes the field read-only,
  as with any controlled React input. An app that passed `value` only as an initial
  value, while `onChangeText` updated other state, now gets a field that does not accept
  typing. Feed the typed text back through `value`, or leave `value` unset. Setting
  `value` back to `undefined` clears the field.
- **A missing `rott.config` keeps the default assets.** When `rott.config` cannot be
  resolved at runtime, the built-in icons and images are used instead of disappearing.
  An explicitly empty config still means consumer-scanned assets only.
- **`AmountInput` now shows its currency icon.** In 0.9.0 the icon was looked up under
  the upper-case currency code (`'TL'`), which matches no built-in icon, so no glyph was
  drawn. It is now looked up under the built-in keys `tl`, `usd` and `euro`, so an
  `AmountInput` shows its glyph: `TL` by default, or `USD` or `EUR` through
  `currencyType`. An icon your app registered under the currency code itself (`TL`)
  still takes precedence. An app whose `rott.config` leaves out the built-in icons and
  registers no such icon shows no glyph. To hide the glyph, pass `currencyType={null}`.
- **`AmountInput` reports nothing when it mounts without a value.** It reported `"0.00"`
  through `onChangeText` before the user typed anything. If your form relied on that
  report, set its initial amount yourself.
- **`Header` calls `goBackFunction` on back press.** Before, `goBackFunction` was
  ignored and the theme's `goBack` always ran. Now, when `goBackFunction` is passed, it
  runs instead of the theme's `goBack`. To keep the theme navigation, drop the prop, or
  navigate from the function.
- **`formatMessage` no longer re-renders its caller when the language changes.** It
  reads the active language when it is called. The library's own components still follow
  a runtime language change, but text you render with `formatMessage` in your components
  keeps the old language until that component re-renders for another reason. Components
  that must follow a runtime language change should use `useTranslator`.

### Added

- **`Footer` is exported from the package root.** It is a container for a screen's
  bottom actions that renders a `Content`, so it takes every `Content` prop. Its
  defaults, all overridable, are `minHeight` 128, `paddingTop` 24, `gap` 16 and
  `useBottomInset` on, which reserves the device's bottom safe-area inset. It has no
  background of its own. See the [Footer](./components/footer.md) page.

### Fixed

- The CVC info button and every `modal-*` mode of `DateInput` crashed with "Invalid hook
  call". `formatMessage` is no longer a hook and works anywhere.
- `AmountInput` multiplied its value by 100 when it mounted with a value it had emitted
  (`"1234.50"` became `"123450.00"`). It now reads a dot decimal with any number of
  decimals (`"1234.5000"` is 1234.50; decimals beyond the second are cut), the Turkish
  format (`"1.234,50"`), comma-grouped thousands (`"1,234.50"`) and values with
  surrounding spaces. A value it cannot read leaves the field empty instead of becoming
  another amount.
- Clearing an `AmountInput` reports `"0.00"` through the current `onChangeText`; it used
  the handler from the first render.
- Two `DateInput`s on one screen no longer overwrite each other's date.
- A `DateInput` whose `value` changes after it mounts confirms the new value; confirming
  without scrolling committed the date it had at mount.
- A date-only `DateInput` value such as `"2026-01-10"` is that calendar day in every time
  zone. Behind UTC it became the previous day, and the input reported that day on mount.
- A disabled `DateInput` with `viewType="button"` no longer opens the picker.
- An `EmailInput` whose `value` goes back to `undefined` clears; it showed stale text.
- `Notification.hideAll()` hides the toasts; it did nothing before.
- `Notification` calls work from a component's first-mount effect; they threw a
  `TypeError`. With `blockTouchesWhileNotificationVisible`, blocking follows the toasts
  on screen, so a toast that never appears or closes twice no longer leaves the app
  blocked or releases it while another toast is visible.
- The `onPress` passed to `Notification.success`, `warning`, `danger` and `info`, or to
  `Notification.show` with one of those variants, runs when the toast is tapped.
- `Button` applies its `fontFamily` prop.
- `Image` renders local `require()` sources and source arrays. It keeps the `cache` policy
  a remote source sets, and no longer adds `cache: 'reload'` to `file://` or `data:` uris.
- `List` no longer throws a `RangeError` when `isLoading` is set with a fractional
  `estimatedItemSize`.
- `TabWidget` keeps tab content mounted across re-renders.
- Colors added through `RottProvider config` resolve as variants. Changing or removing
  `config` no longer leaves the previous config's values in effect.
- The library's `Array` and `String` helpers are no longer enumerable, so `for...in` over
  your arrays and strings stops listing them.

### Documentation

- The Notification page documented `Notification.error` and `Notification.custom`, which
  do not exist; it now lists the real methods. The Notification README that ships in the
  package listed `error` and `custom` too and is corrected.
- The Container page listed `showStatusBar` as defaulting to `true`; the status bar is
  hidden unless you set it.
- The Internationalization guide showed `const { t } = useTranslator()`; the hook returns
  `translator`.
- The Button, Amount input, Email input, Image, Header, Configuration, Installation,
  Notification and rott.config pages describe the behavior above.

### Tooling

- The `publish` script is now `release:npm`. npm runs a package's `publish` script after
  every `npm publish`, even `--dry-run`, so the old name started a second, nested
  publish.

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

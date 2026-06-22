# Design: theme config merge regression fixes

**Date:** 2026-06-22
**Target release:** 0.7.x patch
**Source:** code review of the last 9 commits on `development`

## Problem

The recent `rott.config` and `RottProvider` work introduced three related
configuration regressions:

1. When `require('rott.config')` fails, `theme.ts` now sets `userConfig = {}`.
   The asset merge logic treats that like an intentionally empty config, so
   built-in `defaultThemeConfig.images` and `defaultThemeConfig.icons` are
   removed for consumers who do not use `rott.config.ts`.
2. `RottProvider` merges runtime config into the previous module-level
   `themeConfig`. Keys from one provider render can survive later renders with a
   different config, so provider config becomes additive forever.
3. The docs say `rott.config.ts` wins on any collision, but top-level fields in
   `RottProvider config` can still override `rott.config.ts` because the merge
   spreads `...config` after `...themeConfig`.

The chosen product contract is:

> `rott.config.ts` is authoritative on every collision. `RottProvider config`
> supplements only missing values.

## Goals

- Preserve built-in images/icons when no `rott.config.ts` is configured.
- Preserve the existing intentional behavior for a present-but-empty
  `rott.config.ts`: assets can be consumer-assets-only.
- Make provider config derivation deterministic and non-accumulating.
- Apply `rott.config.ts` precedence consistently to nested maps, options, and
  top-level fields.
- Add regression tests that exercise the missing-vs-empty config distinction
  and provider config replacement behavior.

## Non-Goals

- Moving all theme state into React context.
- Reworking the public `ThemeConfig` type.
- Changing asset auto-discovery semantics beyond restoring the missing-config
  fallback.
- Broad refactors of components that currently import module-level
  `themeConfig`.

## Architecture

Add a small pure helper under `src/theme`, for example
`src/theme/mergeThemeConfig.ts`.

The helper owns the precedence rule:

```ts
effective = mergeThemeConfig({
  baseTheme: theme,
  providerConfig: config,
})
```

For every key, values from `baseTheme` win over `providerConfig` when both are
defined. For record-like sections (`colors`, `icons`, `images`, `fontSizes`,
`fontFamilies`, `fontWeights`, and `options`), merge per key:

```ts
mergedRecord = {...providerRecord, ...baseThemeRecord}
```

For top-level non-record fields (`referenceDevice`, `goBack`), use the
`baseTheme` value when it exists and only fall back to `providerConfig` when the
base value is missing.

`theme.ts` should separately track whether `rott.config` was resolved:

- Missing/unresolved `rott.config`: use `defaultThemeConfig` assets as the
  asset base, plus consumer assets.
- Present `rott.config` with no `icons`/`images`: keep the current
  consumer-assets-only behavior.
- Present `rott.config` with `icons`/`images`: merge user assets with consumer
  assets, preserving the existing consumer override order.

## Data Flow

`theme.ts` produces the immutable active theme for module-level defaults. It is
responsible for the missing-vs-empty `rott.config` decision.

`RottProvider.tsx` initializes exported `themeConfig` from `theme`. On each
render, if `config` is provided, it assigns:

```ts
themeConfig = mergeThemeConfig({baseTheme: theme, providerConfig: config})
```

If `config` is not provided, it assigns the base `theme` shape for that render.
Every assignment must be derived from `theme` and the current `config`; it must
never spread or otherwise depend on the previous `themeConfig`.

Provider language resolution should read from the effective `themeConfig`
instead of `config?.options?.language`, so `rott.config.ts` also wins for
language collisions.

## Error Handling

Keep the existing development warning when `rott.config` cannot be resolved.
Adjust the implementation so the warning text remains true: the runtime should
actually use the default theme when no config is resolved.

Production behavior remains silent.

## Tests

Add or update focused Jest tests:

- `theme.ts` missing `rott.config` preserves default icons/images.
- `theme.ts` present-but-empty `rott.config` still uses only consumer-scanned
  assets for images/icons.
- Provider config supplements missing keys in `themeConfig`.
- Provider config does not override `rott.config` keys for nested records,
  `options.language`, `goBack`, or `referenceDevice`.
- Rendering/remounting with a different provider config does not retain old
  provider-only keys.

Run:

```bash
yarn typecheck
yarn test --runInBand
```

## Risks

- Existing tests globally mock `theme` and `providers`, so new tests must isolate
  modules carefully enough to exercise real merge behavior.
- Keeping a mutable exported `themeConfig` is still a legacy constraint. This
  design limits the damage by making every assignment deterministic, but it does
  not remove the module-level mutable export.
- The exact asset merge rules are subtle. Tests must cover both missing config
  and intentionally empty config because they now have different meanings.

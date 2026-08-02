# Verifiable Theme Contract — Design

**Date:** 2026-08-02
**Status:** Approved (design), pending implementation plan
**Target release:** 0.9.0
**Supersedes:** nothing

---

## Goal

Rott-UI should be the library an AI agent reaches for first when building React
Native UI, and it should absorb an arbitrary customer design system — one that
arrived from Figma, Claude Design, or any other tool — without touching library
source.

Two things block that today. Documentation an agent would read is demonstrably
wrong, and the theme surface is too narrow to express a design system. This spec
fixes both, in that order.

## Acceptance criterion

A new design system can be applied by editing `rott.config.ts` only. Colors,
typography, spacing, radii and shadows all come from config. **Zero component
patches.**

The criterion is falsifiable: a second demo config that looks nothing like the
default must produce a visibly different app, with no library component file in
the diff.

## Non-goals

Explicitly out of scope, each deferred to its own spec:

- **Project C** — machine-readable layer: component manifest, `llms.txt`,
  `AGENTS.md`, JSDoc coverage, the 21 unexported prop interfaces.
- **Project D** — visual verification loop: React Native Web preview so an agent
  can screenshot its own output.

Phase 1's canonical-block rule below prepares the ground for C, but C is not
built here.

---

## Measured baseline

Every number below was verified against the codebase on 2026-08-02, not
estimated.

| Fact | Value |
|---|---|
| `tsx` code blocks across `docs/docs/**` | 330 |
| ...of which carry an `import` line | 88 |
| ...of which reference undefined identifiers (`date`, `setDate`, `handleSubmit`) | 72 |
| Invalid icon/logo references in docs (`MENU`, `PLUS`, `COMPANY_LOGO`, …) | 58, across 15 files |
| Real icon keys | kebab-case (`burgermenu`, `arrow-right`), never SCREAMING_SNAKE |
| `Markpro` font-family literals in `src/features/**/*.tsx` | 17 (`Markpro-Medium` ×9, `Markpro-Bold` ×7, `Markpro` ×1) |
| Hardcoded `borderRadius` values in component JSX | 4, 8, 13, 16, 24 |
| Hardcoded padding/margin props in component JSX | 51 |
| Style files routing through `commonUiStyleProperties` | 16 (all of them) |
| Components with no test file | 6 — `Container`, `Item`, `Footer`, `FormContainer`, `ImageBackground`, `TabWidget` |

The official Quick Start snippet does not compile. Reproduced by extracting
`docs/docs/getting-started/quick-start.md` lines 36–96 into the consumer app and
running `tsc`:

```
error TS2322: Type '"COMPANY_LOGO"' is not assignable to type 'ImageTypes | undefined'
error TS2322: Type '"MENU"' is not assignable to type 'IconKeys'
```

This is the failure that matters most. An agent reads the docs, copies the
example, the code does not build, and the agent concludes the library is broken.

---

## Phase 1 — Correctness net

Phase 1 builds the safety net. Phase 2 is the change the net exists to guard.
Building them together would leave no clean green baseline, so a Phase 2 failure
could not be distinguished from a pre-existing documentation error.

### Architecture

A new unit at `scripts/docs-verify/`: three pure functions plus a runner,
invoked as `yarn docs:verify`.

```
extract  →  generate  →  tsc --noEmit  →  jest render
```

### 1.1 Extractor (`extract.ts`)

Walks `docs/docs/**/*.md` and `docs/i18n/**/*.md`, collecting every `tsx` fenced
block together with its source file and line number. Pure function, unit tested
independently.

### 1.2 Generator (`generate.ts`)

Writes each block as a `.tsx` file under `.docs-verify/` (gitignored). Blocks are
classified **automatically** — nobody hand-tags 330 blocks.

Classification has two independent axes. The first decides imports:

| Class | Detection | Treatment |
|---|---|---|
| Complete | Contains `import … from '@tansuk/rott-ui'` | Written verbatim |
| Fragment | No import line | JSX component names matched against the Rott-UI export map; explicit named imports generated |

The second is an orthogonal flag that applies to complete and fragment blocks
alike: a block referencing identifiers it never declares (`date`, `setDate`,
`handleSubmit` — 72 blocks) additionally receives generated stubs for them, and
is excluded from render per §1.4.

A useful side effect of matching against the export map: a JSX component name
that does not exist in Rott-UI fails the build with "no such export". Invented
components are caught alongside invalid props.

### 1.3 Typecheck

`tsc --noEmit` over `.docs-verify/`, using a dedicated tsconfig that aliases
`@tansuk/rott-ui → src` and `rott.config → ` a fixture config. This is the step
that produces today's `Type '"MENU"' is not assignable to type 'IconKeys'`.

### 1.4 Render

A Jest suite renders each generated file inside `RottProvider`.

The 72 unresolved-reference blocks are **compile-only, excluded from render**.
The stubs generated for `setDate` do not represent real runtime behavior, and a
green result built on them would be false assurance. The remaining 258 blocks are
both compiled and rendered.

This exclusion is a deliberate coverage limit, so the runner **reports the
excluded count on every run**. A silently truncated scope reads as full coverage.

### 1.5 Canonical block rule

The **first** `tsx` block on every component page must be complete and must pass
render. The harness enforces this.

Rationale: that block is what a reader copies, and it is the block Project C will
lift into `llms.txt`. It is the one that has to be right.

### 1.6 Error mapping

Every generated file carries a header comment with its source `file.md:line`, and
the runner translates `tsc` and Jest failures back to markdown coordinates.
Without this a 330-block harness is unusable in practice.

### 1.7 Testing the harness

`extract` and `generate` are pure and unit tested. In addition, a **deliberately
broken fixture markdown** is committed, with a test asserting the harness catches
it. A check that cannot fail is a ritual, not a check.

### 1.8 Repair work in scope

The 58 invalid icon and logo references across 15 files are corrected to real
kebab-case keys, Turkish mirrors included.

### 1.9 Definition of done

`yarn docs:verify` passes with zero errors and runs as a required CI gate on pull
requests.

---

## Phase 2a — Token scales and font family

`commonUiStyleProperties` is the single choke point for every spacing, radius and
dimension prop; all 16 style files route through it. Token resolution therefore
lands in **one function**, not 66 components.

### 2a.1 ThemeConfig extension

Three additive scales:

```ts
spacing: Record<string, number>   // xs:4, sm:8, md:16, lg:24, xl:32
radii:   Record<string, number>   // xs:4, sm:8, md:16, lg:24, full:9999
shadows: Record<string, ShadowToken>
```

Default values are derived from the constants already present in the code, not
invented. The single `borderRadius: 13` occurrence is an outlier and is
normalized to the nearest scale step during migration.

### 2a.2 Token resolution

One pre-step inside `commonUiStyleProperties`:

```
resolve(scale, value) = scale[value] ?? value
```

Stated precisely: **the scale is consulted first; anything not found passes
through as a raw value.** So `paddingHorizontal='md'` is a token,
`paddingHorizontal='50%'` is a percentage, and `paddingHorizontal={16}` is a raw
number — all three work. The prop types are already `number | string`; only
autocomplete gains the token keys.

**Design constraint:** scale keys must not collide with CSS keywords such as
`auto`. On collision the token would win and shadow the keyword.

### 2a.3 Font family: from name to weight

`fontFamilies` changes meaning. Today it is a useless identity map
(`{Markpro: 'Markpro'}`). It becomes a weight-to-family map:

```ts
fontFamilies: {
  400: 'Inter-Regular', 500: 'Inter-Medium',
  600: 'Inter-SemiBold', 700: 'Inter-Bold',
}
```

The `switch` in `src/features/Label/utils/fontFamilyNormalizer.ts` reads this map
instead of hardcoding names. The 17 literals in component JSX are converted to
`fontWeight` values. The `fontFamily` prop survives as a free-string escape
hatch.

This also serves the agent goal: typography now has exactly one obvious path
(`fontWeight`), so there is one fewer choice for a model to get wrong.

### 2a.4 Weight ladder normalization

The current ladder is non-standard: `400→Light`, `500→Book`, `600→Medium`. Since
breaking changes are permitted, it moves to the conventional ladder:
`400→Regular`, `500→Medium`, `600→SemiBold`, `700→Bold`.

**Known consequence:** text in existing apps renders slightly heavier. This is
intended, and is documented in the migration notes so it does not arrive as a
surprise.

The conversion is **not mechanical.** `src/features/AlertDialog/components/AlertDialogComponent.tsx:110`
sets `fontFamily='Markpro'` and `fontWeight={500}` simultaneously, while the
normalizer maps 500 to `Markpro-Book` — the codebase already disagrees with
itself. Each of the 17 call sites is decided individually. The implementation
plan carries this as its own reviewed step.

### 2a.5 Acceptance test

A demo config `inter-theme` is added under `examples/`, deliberately unlike the
default: different font family, different radius scale, different colors. The
test renders the same screen under both configs and asserts the snapshots differ
**and** that no library component file appears in the diff.

---

## Phase 2b — Component override map

Scale tokens alone move every component together. They cannot express "pill
buttons but 8px cards" without patching a component or repeating a prop at every
call site — either of which defeats the acceptance criterion.

### 2b.1 Config shape

```ts
components?: {
  Button?: Partial<CommonUiProps>
  Input?:  Partial<CommonUiProps>
  Header?: Partial<CommonUiProps>
  // mapped type over the known ComponentName union
}
```

Values are constrained to `Partial<CommonUiProps>` rather than 29 per-component
interfaces. `CommonUiProps` already covers every visual constant — radius,
spacing, color, typography, shadow — and is already exported and documented.
Behavioral props such as `Button.circle` stay out of the theme; they belong to
the call site.

Keys are a mapped type over a `ComponentName` union, so an unknown component name
in config is a **compile error**, and autocomplete works. That directly serves
the Project C agent goal.

### 2b.2 Resolution

Components already read `themeConfig` at module level — for example
`src/features/Button/components/Button.tsx:148` reads `themeConfig.colors.white`.
The same pattern is reused: no new context, no new hook.

One pure helper:

```ts
resolveComponentTheme(name, props, defaults)
```

**Precedence, in exact order:**

| Priority | Source |
|---|---|
| 1 (highest) | Call-site prop |
| 2 | `config.components.<Name>` |
| 3 | Component's internal default (a scale token) |

So `borderRadius={8}` in component JSX becomes a resolved value whose internal
default is a token such as `'sm'`.

### 2b.3 Scope

The override mechanism is applied to **components that hardcode a visual constant
today** — a measurable, verifiable set covering the 13 radius and 51 spacing call
sites. Components that already pass everything through props are left alone.
Adding the layer to all 29 before the need is demonstrated would be speculative.

### 2b.4 Silent-failure guard

This is the most dangerous part of the design. Because
`resolve(scale, value) = scale[value] ?? value`, a typo such as
`borderRadius: 'meduim'` passes through as a raw string and produces broken
styling **silently**.

Therefore, under `__DEV__`: when a string value is absent from the scale and does
not look like a percentage or a number, emit `console.warn` naming the component,
the prop, the invalid token, and the list of valid keys. A silent landmine
becomes a monitored one.

### 2b.5 Tests

- **Unit** — a precedence table for `resolveComponentTheme`: three cases per axis
  (default only, override present, prop present). The function is pure and tested
  in isolation.
- **Integration** — `inter-theme` gains `components: {Button: {borderRadius: 'full'}}`;
  the snapshot shows pill buttons and `Button.tsx` does not appear in the diff.
  This test *is* the acceptance criterion.
- **Negative** — a mistyped token triggers the dev warning, proving the check can
  fail.

---

## Testing strategy

### Characterization before change

Six components have no tests at all: `Container`, `Item`, `Footer`,
`FormContainer`, `ImageBackground`, `TabWidget` — precisely the layout primitives
most exposed to a spacing and radius change.

**Rule: any component touched in Phase 2 that lacks a test gets a
characterization test first.** Record current behavior, then change it. Without
that there is no baseline against which regression can be measured.

### Verification layers

| Layer | What it catches |
|---|---|
| `resolveComponentTheme` unit tests | Precedence logic |
| Token resolution unit tests | The `scale[v] ?? v` rule; percentage and raw-number passthrough |
| Characterization and snapshot tests | Component regression |
| `inter-theme` acceptance test | The zero-component-patch criterion |
| `yarn docs:verify` | Every doc snippet Phase 2 makes stale |

The last row is what ties the phases together. When Phase 2 changes the API, 46
documentation pages and their Turkish mirrors go stale, and Phase 1's gate lists
every one of them. That is the payoff for doing Phase 1 first.

### Phase gate

Before the first line of Phase 2 is written: **`yarn docs:verify` passes with
zero errors and runs as a required CI gate.**

---

## Release and migration

**Version: 0.9.0.** Within `0.x`, a minor bump is already understood to permit
breaking changes. Projects C and D may still move the API, so a 1.0.0 stability
promise is premature.

`MIGRATION.md` documents three breaking changes, each with before/after code:

1. `fontFamilies` semantics changed — a weight-to-family map, no longer an
   identity map.
2. The weight ladder was normalized — text renders slightly heavier; a visible
   difference is expected.
3. `FontFamily` is no longer a narrow union — `fontWeight` is the primary path,
   `fontFamily` is a free-string escape hatch.

Adding `spacing`, `radii`, `shadows` and the `components` map is **additive**.
Existing raw-number usage keeps working and is not a breaking change.

---

## Known risks

- **The weight ladder shift is a visual regression by design.** Snapshot tests
  will report it as failure. The bulk snapshot update must be its own separate,
  reviewable commit; folded into a larger commit, a genuine regression would hide
  in the noise.
- **72 blocks are excluded from render.** A deliberate limit, reported by count on
  every harness run so it cannot be mistaken for full coverage.
- **Scale keys can shadow CSS keywords.** Handled by the naming constraint in
  §2a.2, but the constraint has to be honored when scales are extended later.
- **The 17-site font conversion requires judgment, not a codemod.** The codebase
  is internally inconsistent about weight and family today; a mechanical
  transform would preserve the inconsistency.

---

## Open questions

None. All design decisions above are settled.

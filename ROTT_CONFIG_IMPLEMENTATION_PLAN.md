# ROTT Config – Implementation Plan (Tailwind-style `rott.config.ts`)

This plan describes how to add a compile-time/theming configuration system for `@tansuk/rott-ui` using a consumer-side `rott.config.ts`. The goals are:

- Configure once in the host app, get autocomplete everywhere for theme-driven props (e.g., variant).
- Keep current runtime behavior working (fallback to `defaultThemeConfig`).
- Provide a gradual, low-risk rollout with backwards compatibility and a clear migration path.

---

## 0) Constraints & Design Principles

- Library already has a rich `ThemeConfig` and `defaultThemeConfig` with many keys (colors, images, icons, fonts).
- External consumer wants to define custom colors/keys and have TypeScript autocomplete for those keys across components.
- No per-component theme param; configure once at app-level.
- Keep `defaultThemeConfig` as the canonical fallback.

---

## 1) High-level Architecture

We will adopt a Tailwind-like pattern:

- Consumer app defines a root-level `rott.config.ts` file that exports a typed configuration.
- The library “theme loader” attempts to load `rott.config.ts` at runtime (via an alias `rott.config`). If found, its values are merged over `defaultThemeConfig` to form `theme`.
- Types: we offer a typed helper (`defineRottConfig`) that the consumer uses to build their config with editor hints and early validation.
- Autocomplete: we expose a library-level type alias `Variant = keyof ThemeConfig['colors']` and migrate components’ `variant`-like props to reference this alias. Consumers get autocomplete when their `rott.config.ts` adds color keys and the app’s TS understands module path `rott.config`.

Notes:

- We keep `defaultThemeConfig` as source-of-truth defaults.
- We DO NOT force immediate component edits; we plan a phased migration so the ecosystem remains stable.

---

## 2) Deliverables (Library)

Add the following library artifacts (filenames are suggestions; adapt to project style):

1. `src/utils/defineRottConfig.ts`
   - Purpose: Provide a helper the consumer imports to author `rott.config.ts` with type-safety and light runtime checks in dev.
   - API:

     ```ts
     import {ThemeConfig} from '../models/themeConfig.interface'

     export function defineRottConfig<T extends Partial<ThemeConfig>>(config: T): T {
       if (process.env.NODE_ENV === 'development') {
         if (!config.colors) throw new Error('[rott-ui] Missing "colors" in rott.config.ts')
       }
       return config
     }
     ```

2. `src/theme/index.ts`
   - Purpose: Theme loader that merges consumer config over `defaultThemeConfig`.
   - Behavior:
     - Try `require('rott.config').config` (consumer adds a tsconfig path alias `"rott.config": ["./rott.config.ts"]`).
     - Deep-merge `colors` and shallow-merge the rest over `defaultThemeConfig`.
     - Export `theme` and `Variant = keyof ThemeConfig['colors']`.
   - Example (pseudocode):

     ```ts
     import type {ThemeConfig} from '../models/themeConfig.interface'
     import {defaultThemeConfig} from '../providers/defaultThemeConfig'

     let userConfig: Partial<ThemeConfig> = {}
     try {
       userConfig = require('rott.config').config as Partial<ThemeConfig>
     } catch {}

     export const theme = {
       ...defaultThemeConfig,
       ...userConfig,
       colors: {...defaultThemeConfig.colors, ...(userConfig.colors ?? {})},
     } as ThemeConfig

     export type Variant = keyof ThemeConfig['colors']
     ```

3. `src/index.tsx` exports
   - Export the new helper and theme types:
     ```ts
     export * from './utils/defineRottConfig'
     export * from './theme' // re-exports theme and Variant
     ```

4. Documentation updates (README)
   - Add a section: "Using `rott.config.ts` for type-safe theming" with setup steps and examples (see Section 5 below).

---

## 3) Phased Component Typing Migration

We will migrate component props gradually to use the shared `Variant` type and the runtime `theme` value.

Phase A (Non-breaking prep):

- Keep all current typings intact.
- Introduce `Variant` in `src/theme/index.ts`.
- Add the new exports and docs. Release as a minor version.

Phase B (Opt-in components):

- For selected components (start with `Pressable`, `Button`, `Label`, `Icon`), change variant-like prop typings:
  - From: `variant?: keyof TTheme['colors'] | string` (varies per file)
  - To: `variant?: Variant`
- Where default values are strings (e.g., `'grey-900'`), annotate as `as Variant` to keep defaults typed.
- Keep internal color utilities sourcing from the central theme (or context, if already unified). If a util imports `themeConfig` directly, evaluate if it should reference `theme`.
- Release as a minor version and call out beta nature of the new Variant typing.

Phase C (Broad migration):

- Apply the same change to other features (Inputs, Lists, etc.).
- Where types collide (e.g., union of string + `keyof`), prefer `Variant` to push consumers towards typed color keys.
- Validate and fix any downstream model interfaces to reference `Variant` only when appropriate.

Risk controls:

- If an interface becomes too restrictive, consider temporary alias `VariantLike = Variant | string` and migrate incrementally.
- Maintain existing default values to avoid runtime regressions.

---

## 4) Consumer App Setup

1. Create `rott.config.ts` at the project root:

   ```ts
   import {defineRottConfig} from '@tansuk/rott-ui'

   export const config = defineRottConfig({
     colors: {
       brandPrimary: '#123456',
       brandAccent: '#ff00aa',
     },
   } as const)
   ```

2. Add tsconfig path mapping:

   ```json
   {
     "compilerOptions": {
       "paths": {
         "rott.config": ["./rott.config.ts"]
       }
     }
   }
   ```

3. Use the library normally:
   - If a provider is used for other concerns, keep it; `theme` still resolves from `rott.config.ts` for typing/runtime merge.
   - Components that reference `Variant` will show autocomplete for the custom color keys.

---

## 5) README Section (to add)

Add a new section "Setting up `rott.config.ts`":

````md
### Setting up `rott.config.ts`

Create `rott.config.ts` in your app root:

```ts
import {defineRottConfig} from '@tansuk/rott-ui'

export const config = defineRottConfig({
  colors: {
    brandPrimary: '#123456',
    brandAccent: '#ff00aa',
  },
} as const)
```
````

Add to your `tsconfig.json` so the library can resolve the config:

```json
{
  "compilerOptions": {
    "paths": {
      "rott.config": ["./rott.config.ts"]
    }
  }
}
```

Now, components that accept a `variant` prop will autocomplete the keys defined in your `colors`.

```

--------------------------------------------------------------------------------

## 6) Testing & Validation

- Unit tests: add TS type tests to ensure `defineRottConfig` requires `colors` and that `Variant` reflects merged keys (smoke test via d.ts checks).
- Example app: add a sample `rott.config.ts` and verify autocomplete for `variant` in editors.
- CI: add a build job that compiles an "example consumer" workspace using the new config to catch resolution issues.

--------------------------------------------------------------------------------

## 7) Release & Migration Guidance

- Ship in 2 steps:
  1) Introduce `defineRottConfig`, theme loader, docs (no component type changes). Minor release.
  2) Start migrating selected components to `Variant` type. Minor release(s) with changelog notes.

- Migration notes for users:
  - Add `rott.config.ts` + tsconfig path mapping for best DX.
  - If not ready, everything continues to work using `defaultThemeConfig` (no breaking runtime changes).
  - When upgrading across phases, fix any type errors by updating custom components or using literal `as const` where defaults are strings (e.g., `const myVariant = 'primary' as const`).

--------------------------------------------------------------------------------

## 8) Rollback Plan

- If consumers experience editor/type issues, they can temporarily remove `rott.config.ts`. The library will fall back to `defaultThemeConfig`.
- Internally, keep component typings permissive (`Variant | string`) during transition if needed, and reduce to `Variant` only after adoption stabilizes.

--------------------------------------------------------------------------------

## 9) Open Questions

- Should we also surface `ImageKey = keyof ThemeConfig['images']` and `IconKey = keyof ThemeConfig['icons']` for stronger typing elsewhere?
- Do we want an optional codegen step to emit augmented d.ts for extremely rich autocomplete (beyond colors)?
- How much of the provider/context should be unified with the `theme` loader vs. remain orthogonal?

--------------------------------------------------------------------------------

## 10) Summary of File Changes (when implementing)

- Add: `src/utils/defineRottConfig.ts`
- Add: `src/theme/index.ts`
- Edit: `src/index.tsx` to export the new helper/types
- Docs: Update `README.md` with `rott.config.ts` setup
- Phase B/C (later): change `variant` prop typings in selected components to use `Variant` from `src/theme`

This plan supports a safe, incremental path to Tailwind-style configuration with strong TypeScript DX while maintaining current runtime behavior.

```

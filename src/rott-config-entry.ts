/**
 * Entry used by consumer `rott.config.ts` only.
 * Import from `@tansuk/rott-ui/config` — not the package root — to avoid a
 * require cycle: index → … → theme → rott.config → index.
 */
export { defineRottConfig } from './utils/defineRottConfig'
export { defaultThemeConfig } from './providers/defaultThemeConfig'

import type {ThemeConfig} from '../models/themeConfig.interface'
import {defaultThemeConfig} from '../providers/defaultThemeConfig'

type DefaultColors = typeof defaultThemeConfig.colors

// When consumer provides a path alias to their rott.config.ts, TS will resolve
// literal keys here. Otherwise, our ambient fallback keeps types permissive.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - this module may not exist in this repository, it's provided by consumers
type UserConfig = typeof import('rott.config').config
type ExtractUserColors<T> = T extends {colors: infer C} ? C : never
type UserColors = ExtractUserColors<UserConfig>
type StringKeys<T> = Extract<keyof T, string>

export type TThemeVariant = StringKeys<DefaultColors> | StringKeys<UserColors>

let userConfig: Partial<ThemeConfig> | Record<string, unknown> = {}
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  userConfig = require('rott.config').config as Partial<ThemeConfig>
} catch {
  userConfig = {}
}

const mergedColors = {
  ...defaultThemeConfig.colors,
  ...(((userConfig as any)?.colors as Record<string, string>) ?? {}),
}

export const theme = {
  ...defaultThemeConfig,
  ...(userConfig ?? {}),
  colors: mergedColors,
} as any

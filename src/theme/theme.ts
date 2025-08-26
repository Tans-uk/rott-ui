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

type DefaultIcons = typeof defaultThemeConfig.icons
type ExtractUserIcons<T> = T extends {icons: infer C} ? C : never
type UserIcons = ExtractUserIcons<UserConfig>

export type TThemeVariant = NoInfer<StringKeys<DefaultColors>> | NoInfer<StringKeys<UserColors>>
export type TThemeIcons = NoInfer<StringKeys<DefaultIcons>> | NoInfer<StringKeys<UserIcons>>

let userConfig: Partial<ThemeConfig> = {}
try {
  userConfig = require('rott.config').config as Partial<ThemeConfig>
} catch {
  userConfig = defaultThemeConfig
}

export const theme = {
  ...userConfig,
} as any

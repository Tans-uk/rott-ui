import type {ConsumerIconKeys, ConsumerImageKeys} from '../models/consumerKeys.interface'
import type {ThemeConfig} from '../models/themeConfig.interface'
import {defaultThemeConfig} from '../providers/defaultThemeConfig'
import {consumerAssets} from '../utils/consumerAssets'

declare const __DEV__: boolean

type StringKeys<T> = Extract<keyof T, string>

// When consumer provides a path alias to their rott.config.ts, TS will resolve
// literal keys here. Otherwise, our ambient fallback keeps types permissive.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - this module may not exist in this repository, it's provided by consumers
type UserConfig = typeof import('rott.config').config
type ExtractUserKey<T, K extends keyof ThemeConfig> = T extends {[P in K]: infer C} ? C : never

type DefaultColors = typeof defaultThemeConfig.colors
type UserColors = ExtractUserKey<UserConfig, 'colors'>
export type TThemeVariant = NoInfer<StringKeys<DefaultColors>> | NoInfer<StringKeys<UserColors>>

type DefaultIcons = typeof defaultThemeConfig.icons
type UserIcons = ExtractUserKey<UserConfig, 'icons'>
type SafeUserIcons = string extends keyof UserIcons ? never : StringKeys<UserIcons>
/** Empty config: only consumer icons. Non-empty: default + user + consumer */
export type TThemeIcons = [UserIcons] extends [never]
  ? NoInfer<keyof ConsumerIconKeys>
  : NoInfer<StringKeys<DefaultIcons>> | NoInfer<SafeUserIcons> | NoInfer<keyof ConsumerIconKeys>

type DefaultImages = typeof defaultThemeConfig.images
type UserImages = ExtractUserKey<UserConfig, 'images'>
type SafeUserImages = string extends keyof UserImages ? never : StringKeys<UserImages>
/** Empty config: only consumer images. Non-empty: default + user + consumer */
export type TThemeImages = [UserImages] extends [never]
  ? NoInfer<keyof ConsumerImageKeys>
  : NoInfer<StringKeys<DefaultImages>> | NoInfer<SafeUserImages> | NoInfer<keyof ConsumerImageKeys>

let userConfig: Partial<ThemeConfig> = {}
let userConfigResolved = false
try {
  userConfig = require('rott.config').config as Partial<ThemeConfig>
  userConfigResolved = true
} catch {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.warn(
      "[rott-ui] 'rott.config' could not be resolved at runtime; using the default theme. " +
        'If you use a custom rott.config.ts, ensure runtime resolution is configured ' +
        '(Metro resolveRequest under Expo — see the rott.config docs). ' +
        'If you are not using a custom config, you can ignore this warning.'
    )
  }
  userConfig = {}
}

/** Base = defaults + user overrides (colors, goBack, etc.). */
const baseConfig = {...defaultThemeConfig, ...userConfig}

/**
 * Asset bases, merged with the consumer-scanned assets below:
 * - rott.config cannot be resolved: the library defaults, as if no custom config existed.
 * - rott.config without images/icons (the documented empty config): none.
 * - rott.config with images/icons: the user's.
 */
const userProvidedImages = userConfig && 'images' in userConfig && userConfig.images != null
const userProvidedIcons = userConfig && 'icons' in userConfig && userConfig.icons != null
const imagesBase = !userConfigResolved
  ? defaultThemeConfig.images
  : userProvidedImages
    ? baseConfig.images
    : undefined
const iconsBase = !userConfigResolved
  ? defaultThemeConfig.icons
  : userProvidedIcons
    ? baseConfig.icons
    : undefined

function mergeAssets<T extends Record<string, unknown>>(base: T | undefined, consumer: T): T {
  return {...(base || ({} as T)), ...consumer} as T
}

export const theme = {
  ...baseConfig,
  images: mergeAssets(imagesBase, consumerAssets.images),
  icons: mergeAssets(iconsBase, consumerAssets.icons),
} as any

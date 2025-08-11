import {ThemeConfig} from '../models/themeConfig.interface'

export function defineRottConfig<T extends Partial<ThemeConfig>>(config: T): T {
  if (process.env.NODE_ENV === 'development') {
    if (!config || typeof config !== 'object') {
      throw new Error('[rott-ui] rott.config.ts must export an object via defineRottConfig')
    }
    if (!(config as Partial<ThemeConfig>).colors) {
      throw new Error('[rott-ui] Missing "colors" in rott.config.ts')
    }
  }
  return config
}

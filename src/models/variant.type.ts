import type {themeConfig} from '@providers'

export type Variant = Keyof<typeof themeConfig.colors> | string

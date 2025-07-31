import {themeConfig} from '../providers'

export type Variant = keyof typeof themeConfig.colors | string

import type {PropsWithChildren} from 'react'

import type {TextProps} from 'react-native'

import {ThemeConfig, type CommonUiProps} from '../../../models'

export interface LabelProps<TTheme extends ThemeConfig>
  extends TextProps,
    CommonUiProps<TTheme>,
    PropsWithChildren {
  text?: string
  textCenter?: boolean
  fontWeight?: keyof TTheme['fontWeights']
  fontFamily?: keyof TTheme['fontFamilies']
  letterSpacing?: number
}

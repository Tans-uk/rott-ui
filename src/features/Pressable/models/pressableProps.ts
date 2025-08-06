import {type Ref} from 'react'

import {
  View,
  type PressableProps as RNPressableProps,
  type StyleProp,
  type TextStyle,
} from 'react-native'

import {ThemeConfig, type CommonUiProps, type Size} from '../../../models'

export interface PressableProps<TTheme extends ThemeConfig>
  extends CommonUiProps<TTheme>,
    RNPressableProps {
  ref?: Ref<View> | Ref<View | Ref<View>> | any
  row?: boolean
  text?: string
  textStyle?: StyleProp<TextStyle>
  textVariant?: keyof TTheme['colors']
  textSize?: Size
  textWeight?: keyof TTheme['fontWeights']
  animated?: boolean
  children?: any
}

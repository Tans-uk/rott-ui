import {type Ref} from 'react'

import {
  View,
  type PressableProps as RNPressableProps,
  type StyleProp,
  type TextStyle,
} from 'react-native'

import {type CommonUiProps, type Size, type Variant} from '../../../models'

export interface PressableProps extends CommonUiProps, RNPressableProps {
  ref?: Ref<View> | Ref<View | Ref<View>> | any
  row?: boolean
  text?: string
  textStyle?: StyleProp<TextStyle>
  textVariant?: Variant
  textSize?: Exclude<Size, 'full'>
  textWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'bold' | 'normal'
  animated?: boolean
  children?: any
}

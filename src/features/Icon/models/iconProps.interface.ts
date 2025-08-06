import {CommonUiProps} from '../../../models'
import {ThemeConfig} from './../../../models/themeConfig.interface'

import type {SvgProps} from 'react-native-svg'

export interface IconProps<TTheme extends ThemeConfig>
  extends Omit<
      SvgProps,
      | 'color'
      | 'fontFamily'
      | 'fontSize'
      | 'fontWeight'
      | 'width'
      | 'height'
      | 'stroke'
      | 'strokeWidth'
      | 'fill'
    >,
    CommonUiProps<TTheme> {
  name: keyof TTheme['icons']
  width?: number
  height?: number
  variant?: keyof TTheme['colors']
  strokeWidth?: number
  strokeLinecap?: 'round' | 'square' | 'butt'
  strokeLinejoin?: 'round' | 'miter' | 'bevel'
  noStroke?: boolean
  mode?: 'stroke' | 'fill'
  fill?: string
  stroke?: string
}

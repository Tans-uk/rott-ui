import {CommonUiProps, Variant} from '../../../models'
import type {IconKeys} from './iconKeys.type'

import type {SvgProps} from 'react-native-svg'

export interface IconProps
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
    CommonUiProps {
  name: IconKeys
  testID?: string
  width?: number
  height?: number
  variant?: Variant
  strokeWidth?: number
  strokeLinecap?: 'round' | 'square' | 'butt'
  strokeLinejoin?: 'round' | 'miter' | 'bevel'
  noStroke?: boolean
  mode?: 'stroke' | 'fill'
  fill?: string
  stroke?: string
}

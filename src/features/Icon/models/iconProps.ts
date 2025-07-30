import {CommonUiProps, Variant} from '../../../models'
import type {IconTypes} from './iconType.type'

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
  name: IconTypes
  width?: number
  height?: number
  variant?: Variant
  strokeWidth?: number
  noStroke?: boolean
  mode?: 'stroke' | 'fill'
}

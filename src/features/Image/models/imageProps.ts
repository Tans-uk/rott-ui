import type {ImageSourcePropType, ImageProps as RNImageProps} from 'react-native'

import {type CommonUiProps} from '../../../models'
import type {ImageTypes} from './imageTypes'

export interface ImageProps
  extends Omit<RNImageProps, 'name' | 'source'>,
    Omit<CommonUiProps, 'name' | 'borderRadius' | 'width' | 'height'> {
  name?: ImageTypes
  source?: ImageSourcePropType
}

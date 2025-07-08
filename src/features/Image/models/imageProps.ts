import type {ImageSourcePropType, ImageProps as RNImageProps} from 'react-native'

import type {ImageTypes} from './imageTypes'

import {type CommonUiProps} from '@models'

export interface ImageProps
  extends Omit<RNImageProps, 'name' | 'source'>,
    Omit<CommonUiProps, 'name' | 'borderRadius' | 'width' | 'height'> {
  name?: ImageTypes
  source?: ImageSourcePropType
}

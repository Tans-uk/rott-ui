import type {ImageSourcePropType, ImageProps as RNImageProps} from 'react-native'

import {ThemeConfig, type CommonUiProps} from '../../../models'

export interface ImageProps<TTheme extends ThemeConfig>
  extends Omit<RNImageProps, 'name' | 'source'>,
    Omit<CommonUiProps<TTheme>, 'name' | 'borderRadius' | 'width' | 'height'> {
  name?: keyof TTheme['images']
  source?: ImageSourcePropType
}

import {type ImageResizeMode} from 'react-native'

import {ThemeConfig} from '../../../models'

export interface ButtonImageProps<TTheme extends ThemeConfig> {
  name?: keyof TTheme['images']
  resizeMode?: ImageResizeMode
  tintColor?: string
  width?: number
  height?: number
  absolute?: boolean
}

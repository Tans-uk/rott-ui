import {type ImageResizeMode} from 'react-native'

import {type ImageTypes} from '../../Image'

export interface ButtonImageProps {
  name?: ImageTypes
  resizeMode?: ImageResizeMode
  tintColor?: string
  width?: number
  height?: number
  absolute?: boolean
}

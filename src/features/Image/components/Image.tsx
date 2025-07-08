import {type FC} from 'react'

import {
  Image as RNImage,
  StyleSheet,
  type ImageSourcePropType,
  type ImageURISource,
} from 'react-native'

import type {ImageProps} from '../models'
import {ImageStyles} from '../styles'

import {Images} from '@constants'

export const Image: FC<ImageProps> = ({variant, size, style, source, name, ...props}) => {
  const imageSource = Object.entries(Images).find(
    (image) => image[0]?.toLowerCase() === name?.toLowerCase()
  )

  const uriImageSource = {...(source as ImageURISource), cache: 'reload'} as ImageSourcePropType

  return (
    <RNImage
      style={StyleSheet.flatten([ImageStyles({variant, size, ...props}).defaultImageStyle, style])}
      source={source ? uriImageSource : Images[imageSource?.[0] as never]}
      {...props}
    />
  )
}

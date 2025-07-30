import type {FC} from 'react'

import {
  Image as RNImage,
  StyleSheet,
  type ImageSourcePropType,
  type ImageURISource,
} from 'react-native'

import {themeConfig} from '../../../providers'
import type {ImageProps} from '../models'
import {ImageStyles} from '../styles'

export const Image: FC<ImageProps> = ({variant, size, style, source, name, ...props}) => {
  const imageSource = Object.entries(themeConfig.images).find(
    (image) => image[0]?.toLowerCase() === (name as string)?.toLowerCase()
  )

  const uriImageSource = {...(source as ImageURISource), cache: 'reload'} as ImageSourcePropType

  return (
    <RNImage
      style={StyleSheet.flatten([ImageStyles({variant, size, ...props}).defaultImageStyle, style])}
      source={source ? uriImageSource : themeConfig.images[imageSource?.[0] as never]}
      {...props}
    />
  )
}

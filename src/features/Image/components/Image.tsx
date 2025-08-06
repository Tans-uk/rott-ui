import {useContext, type FC} from 'react'

import {
  Image as RNImage,
  StyleSheet,
  type ImageSourcePropType,
  type ImageURISource,
} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {ThemeConfig} from '../../../models'
import type {ImageProps} from '../models'
import {useImageStyles} from '../styles'

export const Image: FC<ImageProps<ThemeConfig>> = ({
  variant,
  size,
  style,
  source,
  name,
  ...props
}) => {
  const {defaultImageStyle} = useImageStyles({variant, size, ...props})
  const {images} = useContext(RottUiContext)
  const imageSource = Object.entries(images).find(
    (image) => image[0]?.toLowerCase() === (name as string)?.toLowerCase()
  )

  const uriImageSource = {...(source as ImageURISource), cache: 'reload'} as ImageSourcePropType

  return (
    <RNImage
      style={StyleSheet.flatten([defaultImageStyle, style])}
      source={source ? uriImageSource : images[imageSource?.[0] as never]}
      {...props}
    />
  )
}

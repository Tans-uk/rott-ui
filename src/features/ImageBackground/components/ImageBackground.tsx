import {type FC} from 'react'

import {
  ImageBackground as RNImageBackground,
  StyleSheet,
  type ImageBackgroundProps as RNImageBackgroundProps,
} from 'react-native'

import {ImageBackgroundStyles} from '../styles'
import React from 'react'

interface ImageBackgroundProps extends RNImageBackgroundProps {
  disableSafeAreaView?: boolean
  opacity?: number
}

export const ImageBackground: FC<ImageBackgroundProps> = ({source, style, children, ...props}) => {
  return (
    <RNImageBackground
      style={StyleSheet.flatten([ImageBackgroundStyles().defaultImageContainerStyle, style])}
      source={source}
      {...props}>
      {children}
    </RNImageBackground>
  )
}

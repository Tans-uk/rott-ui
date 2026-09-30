import React, {type FC} from 'react'

import {
  Image as RNImage,
  StyleSheet,
  type ImageSourcePropType,
  type ImageURISource,
} from 'react-native'

import {themeConfig} from '../../../providers'
import type {ImageProps} from '../models'
import {ImageStyles} from '../styles'

/** A single {uri} object — the only source shape that takes a cache policy. */
const isUriSource = (source: ImageSourcePropType): source is ImageURISource =>
  typeof source === 'object' && source !== null && !Array.isArray(source)

export const Image: FC<ImageProps> = ({variant, size, style, source, name, ...props}) => {
  const imageSource = Object.entries(themeConfig.images ?? {}).find(
    (image) => image[0]?.toLowerCase() === (name as string)?.toLowerCase()
  )

  const namedSource = (themeConfig.images ?? {})[imageSource?.[0] as never]
  // Local require() ids and multi-density arrays pass through unchanged; only a remote
  // {uri} object gets the reload cache policy it has always had.
  const resolvedSource =
    source === undefined || source === null
      ? namedSource
      : isUriSource(source)
        ? ({...source, cache: 'reload'} as ImageSourcePropType)
        : source

  return (
    <RNImage
      style={StyleSheet.flatten([ImageStyles({variant, size, ...props}).defaultImageStyle, style])}
      source={resolvedSource}
      {...props}
    />
  )
}

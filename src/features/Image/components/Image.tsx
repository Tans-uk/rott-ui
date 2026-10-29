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

/** A single {uri} object loaded over http(s), the only source that gets a default cache policy. */
const isRemoteUriSource = (source: ImageSourcePropType): source is ImageURISource =>
  typeof source === 'object' &&
  source !== null &&
  !Array.isArray(source) &&
  /^https?:\/\//i.test(source.uri ?? '')

export const Image: FC<ImageProps> = ({variant, size, style, source, name, ...props}) => {
  const imageSource = Object.entries(themeConfig.images ?? {}).find(
    (image) => image[0]?.toLowerCase() === (name as string)?.toLowerCase()
  )

  const namedSource = (themeConfig.images ?? {})[imageSource?.[0] as never]
  // Local require() ids, multi-density arrays and file/data uris pass through unchanged. A
  // remote {uri} object gets the reload cache policy it has always had, unless it sets its own.
  const resolvedSource =
    source === undefined || source === null
      ? namedSource
      : isRemoteUriSource(source)
        ? ({cache: 'reload', ...source} as ImageSourcePropType)
        : source

  return (
    <RNImage
      style={StyleSheet.flatten([ImageStyles({variant, size, ...props}).defaultImageStyle, style])}
      source={resolvedSource}
      {...props}
    />
  )
}

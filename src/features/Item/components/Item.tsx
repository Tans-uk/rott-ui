import {type FC} from 'react'

import {StyleSheet, View, type ViewProps} from 'react-native'

import {ItemStyles} from '../styles'

import {Skeleton, type SkeletonStyleProps} from '@features/Skeleton'
import {type CommonUiProps} from '@models'

interface ItemProps extends ViewProps, CommonUiProps {
  row?: boolean
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  skeletonShow?: boolean
  skeletonStyle?: SkeletonStyleProps
  skeletonTestID?: string
  skeletonNoAnimation?: boolean
  skeletonColors?: (string | number)[]
  skeletonBackgroundColor?: string
  opacity?: number
}

// TODO: Animated View sonra incelenecek
export const Item: FC<ItemProps> = ({
  row,
  size,
  gap,
  style,
  children,
  skeletonShow = false,
  skeletonStyle,
  skeletonTestID,
  skeletonNoAnimation = false,
  skeletonColors,
  skeletonBackgroundColor,
  flexWrap,
  ...props
}) => {
  return (
    <View
      {...props}
      style={StyleSheet.flatten([
        ItemStyles({
          row,
          includeAlignItems: true,
          includeJustifyContent: true,
          size,
          gap,
          flexWrap,
          ...props,
        }).defaultItemStyles,
        style,
      ])}>
      {skeletonShow && skeletonStyle ? (
        <Skeleton
          testID={skeletonTestID}
          show={skeletonShow}
          width={skeletonStyle.width}
          height={skeletonStyle.height}
          radius={skeletonStyle?.radius}
          noAnimation={skeletonNoAnimation}
          colors={skeletonColors}
          backgroundColor={skeletonBackgroundColor}
        />
      ) : (
        children
      )}
    </View>
  )
}

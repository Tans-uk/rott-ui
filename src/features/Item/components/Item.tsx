import {type FC} from 'react'

import {StyleSheet, View, type ViewProps} from 'react-native'

import {ThemeConfig, type CommonUiProps} from '../../../models'
import {Skeleton, type SkeletonStyleProps} from '../../Skeleton'
import {useItemStyles} from '../styles'

interface ItemProps<TTheme extends ThemeConfig> extends ViewProps, CommonUiProps<TTheme> {
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
export const Item: FC<ItemProps<ThemeConfig>> = ({
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
  const {defaultItemStyles} = useItemStyles({
    row,
    includeAlignItems: true,
    includeJustifyContent: true,
    size,
    gap,
    flexWrap,
    ...props,
  })

  return (
    <View {...props} style={StyleSheet.flatten([defaultItemStyles, style])}>
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

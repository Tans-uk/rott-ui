import {useContext, useEffect, type FC} from 'react'

import {StyleSheet} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {useDisplay} from '../../../hooks'
import {Item} from '../../Item'
import type {SkeletonStyleProps} from '../models'

import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface SkeletonProps extends SkeletonStyleProps {
  show: boolean
  noAnimation?: boolean
  testID?: string
  colors?: (string | number)[]
  backgroundColor?: string
}

/**
 *
 * @param width Genislik - **Zorunlu**
 * @param height Yukseklik - **Zorunlu**
 * @param radius Radius - `default: 4px`
 * @param show Renderlanma durumu - `default: false`
 * @return
 */
export const Skeleton: FC<SkeletonProps> = ({
  testID,
  width,
  height,
  radius = 4,
  noAnimation = false,
  show = false,
  colors,
  backgroundColor,
}) => {
  const {px} = useDisplay()
  const {colors: colorsContext} = useContext(RottUiContext)
  colors = [colorsContext['grey-100']!, colorsContext.white!, colorsContext['grey-100']!]
  backgroundColor = backgroundColor ?? colorsContext['grey-100']

  const animatedValue = useSharedValue(0)
  const animationWidth = px(width as number)

  const animatedGradientStyle = useAnimatedStyle(() => {
    return {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row' as const,
      transform: [
        {
          translateX: animatedValue.value * animationWidth * 2 - animationWidth,
        },
      ],
    }
  }, [])

  const getGradientProps = (_width: number) => ({
    start: {x: 0, y: 0},
    end: {x: 1, y: 0},
    style: {...StyleSheet.absoluteFillObject, _width},
  })

  useEffect(() => {
    if (!show) return

    if (!noAnimation) {
      animatedValue.value = withRepeat(
        withTiming(1, {
          duration: 1400,
          easing: Easing.ease,
        }),
        // -1 Verilme değerinin sebebi sonsuz bir animasyon yapmak için. Eğer değer 0 verilirse animasyon tek sefer çalışır. Birden fazla verilirse animasyon birden fazla kere çalışır. Örnek 5 verilirse animasyon 5 kere çalışır.
        -1,
        false
      )
    }
  }, [show])

  if (!show) return null
  return (
    <Item
      testID={testID}
      width={width}
      height={height}
      borderRadius={radius}
      overflowHidden
      backgroundColor={backgroundColor}>
      <Animated.View style={animatedGradientStyle}>
        <LinearGradient
          {...getGradientProps(width!)}
          style={{
            width: width ? px(width) : undefined,
            height: height ? px(height) : undefined,
          }}
          colors={colors}
        />
      </Animated.View>
    </Item>
  )
}

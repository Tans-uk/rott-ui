import React, {FC, useEffect} from 'react'

import {themeConfig} from '../../../providers'
import {Item} from '../../Item'
import {RippleProps} from '../models'

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {scheduleOnRN} from 'react-native-worklets'

const AnimatedView = Animated.createAnimatedComponent(Item)

export const Ripple: FC<RippleProps> = ({x, y, size, duration, onComplete}) => {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.set(
      withTiming(1, {duration}, () => {
        scheduleOnRN(onComplete)
      })
    )
  }, [])

  const rippleStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, 4], Extrapolation.CLAMP)
    const opacity = interpolate(progress.value, [0, 0.5, 1], [0.3, 0.1, 0], Extrapolation.CLAMP)

    return {
      position: 'absolute',
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: themeConfig.colors.white,
      opacity,
      transform: [{scale}],
      pointerEvents: 'none',
    }
  })

  return <AnimatedView style={rippleStyle} />
}

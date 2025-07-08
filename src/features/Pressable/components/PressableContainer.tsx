import {type FC, type PropsWithChildren} from 'react'

import {Animated, Pressable as RNPressable} from 'react-native'

import type {PressableProps} from '../models'

export const PressableContainer: FC<PropsWithChildren<PressableProps>> = ({
  children: containerChildren,
  ...containerProps
}) => {
  if (containerProps.animated) {
    const AnimatedPressable = Animated.createAnimatedComponent(RNPressable)

    return <AnimatedPressable {...containerProps}>{containerChildren}</AnimatedPressable>
  } else return <RNPressable {...containerProps}>{containerChildren}</RNPressable>
}

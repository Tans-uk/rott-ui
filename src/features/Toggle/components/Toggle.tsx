import {useEffect, useMemo, type FC} from 'react'

import {ToggleStyles} from '../style'

import {Item} from '@features/Item'
import {Pressable} from '@features/Pressable'
import {themeConfig} from '@providers'
import {display} from '@utils'

import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface ToggleProps {
  testID?: string
  isOn?: boolean
  onToggleChange?: (checked: boolean) => void
  disabled?: boolean
}

export const Toggle: FC<ToggleProps> = ({testID, isOn, onToggleChange, disabled}) => {
  const animatedValue = useSharedValue(isOn === true ? 1 : 0)
  const marginRange = useMemo(() => [display.px(4), display.px(36)], [])

  const moveToggleStyle = useAnimatedStyle(
    () => ({
      marginLeft: interpolate(animatedValue.value, [0, 1], marginRange, 'clamp'),
    }),
    []
  )

  const moveToggleBackgroundColorStyle = useAnimatedStyle(
    () => ({
      backgroundColor:
        animatedValue.value === 1 ? themeConfig.colors.primary : themeConfig.colors['grey-200'],
    }),
    []
  )

  const animateToggle = (isChecked: boolean) => {
    animatedValue.value = withTiming(isChecked ? 1 : 0, {
      duration: 100,
      easing: Easing.linear,
    })
  }

  const handleToggle = (isChecked: boolean) => {
    animateToggle(isChecked)
    onToggleChange && runOnJS(onToggleChange)(isChecked)
  }

  useEffect(() => {
    if (isOn === undefined) return
    animateToggle(isOn)
  }, [isOn])

  return (
    <Item testID={testID} row alignItemsCenter width={64} height={32} maxWidth={64} maxHeight={32}>
      <Pressable
        onPress={() => !disabled && handleToggle!(!isOn)}
        testID='toggle-container-test-id'>
        <Animated.View
          testID='toggle-test-id'
          style={[ToggleStyles().toggleContainer, moveToggleBackgroundColorStyle]}>
          <Animated.View style={[ToggleStyles().toggleWheelStyle, moveToggleStyle]} />
        </Animated.View>
      </Pressable>
    </Item>
  )
}

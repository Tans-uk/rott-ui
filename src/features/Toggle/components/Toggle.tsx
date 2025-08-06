import {useContext, useEffect, useMemo, type FC} from 'react'

import {RottUiContext} from '../../../contexts'
import {useDisplay} from '../../../hooks'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import {useToggleStyle} from '../style'

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
  const {px} = useDisplay()
  const {colors} = useContext(RottUiContext)
  const {toggleContainer, toggleWheelStyle} = useToggleStyle()
  const animatedValue = useSharedValue(isOn === true ? 1 : 0)
  const marginRange = useMemo(() => [px(4), px(36)], [])

  const moveToggleStyle = useAnimatedStyle(
    () => ({
      marginLeft: interpolate(animatedValue.value, [0, 1], marginRange, 'clamp'),
    }),
    []
  )

  const moveToggleBackgroundColorStyle = useAnimatedStyle(
    () => ({
      backgroundColor: animatedValue.value === 1 ? colors.primary : colors['grey-200'],
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
          style={[toggleContainer, moveToggleBackgroundColorStyle]}>
          <Animated.View style={[toggleWheelStyle, moveToggleStyle]} />
        </Animated.View>
      </Pressable>
    </Item>
  )
}

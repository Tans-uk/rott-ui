import {PanResponder} from 'react-native'

import {Easing, runOnJS, withTiming, type SharedValue} from 'react-native-reanimated'

export const PanResponderAnimation = (
  modalHeight: number,
  translateY: SharedValue<number>,
  animationCloseCallBack: any
) =>
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy < 0) return
      if (gestureState.dy > 10 || gestureState.vy < 0) translateY.value = gestureState.dy
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        translateY.value = withTiming(modalHeight, {duration: 250}, () => {
          !!animationCloseCallBack && runOnJS(animationCloseCallBack)()
        })
      } else translateY.value = withTiming(0, {easing: Easing.elastic()})
    },
  })

import {Dimensions, Platform} from 'react-native'

import {useSafeAreaFrame, useSafeAreaInsets, type EdgeInsets} from 'react-native-safe-area-context'

/**
 * useSafeArea
 * Removes the flicker caused by useSafeAreaInsets from react-native-safe-area-context
 * returning wrong values on the first render.
 *
 * For example, `const insets = useSafeAreaContext()` returns {top: 0, bottom: 0, left: 0,
 * right: 0} on the first render even when the real insets are non-zero. So the first
 * render's insets are computed from useSafeAreaFrame and the device dimensions, and
 * every render after that uses what useSafeAreaInsets returns.
 */
export const useSafeArea = (): EdgeInsets => {
  const {
    height: frameHeight,
    y: frameOffsetY,
    width: frameWidth,
    x: frameOffsetX,
  } = useSafeAreaFrame()

  const {height, width} = Dimensions.get('screen')

  const insets = useSafeAreaInsets()

  if (Platform.OS === 'android' && Platform.Version <= 27) return insets

  if (Math.abs(height - frameHeight) < 1 && Math.abs(width - frameWidth) < 1) return insets

  return {
    top: frameOffsetY,
    bottom: height - (frameHeight + frameOffsetY),
    left: frameOffsetX,
    right: width - (frameWidth + frameOffsetX),
  }
}

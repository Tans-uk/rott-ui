import {Dimensions, Platform} from 'react-native'

import {useSafeAreaFrame, useSafeAreaInsets, type EdgeInsets} from 'react-native-safe-area-context'

/**
 * useSafeArea
 * react-native-safe-area-context paketinin sunduğu useSafeAreaInsets hook'unun ilk render'da
 * döndürdüğü değerlerin hatalı olmasından kaynaklı yaşanan flicker sorununu ortadan kaldırmak
 * amacıyla geliştirilmiştir.
 *
 * Örneğin: const insets = useSafeAreaContext() insetler sıfırdan farklı olsa dahi ilk renderda
 * {top: 0, bottom: 0, left: 0, right: 0} döndürür. Dolayısıyla ilk render anındaki insetler
 * useSafeAreaFrame ve cihaz boyutları kullanılarak hesaplanır. Takip eden renderlarda useSafeAreaInsets'in
 * döndürdüğü değere geçilir.
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

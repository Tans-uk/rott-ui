import {Dimensions} from 'react-native'

import {themeConfig} from '../providers/RottProvider'
import {theme} from '../theme'

const SMALL_SCREEN_FONT_DELTA = 2

export const fontSizeNormalizer = (fontSize: string | number): number | string => {
  if (typeof fontSize === 'number') return fontSize

  const isSmallScreen = Dimensions.get('window').width < 380

  // rott.config primary, RottProvider config fallback
  const configured = theme?.fontSizes?.[fontSize] ?? themeConfig?.fontSizes?.[fontSize]
  if (typeof configured === 'number') {
    return isSmallScreen ? configured - SMALL_SCREEN_FONT_DELTA : configured
  }

  // legacy keys absent from the fontSizes map keep their original responsive values
  switch (fontSize) {
    case 'xxl':
      return isSmallScreen ? 22 : 24
    case 'xxxl':
      return isSmallScreen ? 34 : 36
    default:
      return fontSize
  }
}

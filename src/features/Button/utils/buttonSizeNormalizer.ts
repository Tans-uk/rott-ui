import type {Size} from '../../../models'
import {display, sizeToPercentage} from '../../../utils'

export const buttonSizeNormalizer = (buttonSize: Size | {width: string; height: string}) => {
  switch (buttonSize) {
    case 'xs':
      return {
        width: display.px(85.5),
        height: display.px(36),
        fontSize: display.fontPixel(12),
        icon: display.px(18),
      }
    case 'sm':
      return {
        width: display.px(114),
        height: display.px(40),
        fontSize: display.fontPixel(14),
        icon: display.px(20),
      }
    case 'md':
      return {
        width: display.px(171),
        height: display.px(48),
        fontSize: display.fontPixel(14),
        icon: display.px(24),
      }
    case 'lg':
      return {
        width: display.px(228),
        height: display.px(56),
        fontSize: display.fontPixel(16),
        icon: display.px(24),
      }
    // Relative widths come from sizeToPercentage so Button cannot drift from the
    // percentages every other component resolves for the same size token.
    case 'xl':
      return {
        width: sizeToPercentage('xl'),
        height: display.px(64),
        fontSize: display.fontPixel(18),
        icon: display.px(28),
      }
    case 'xxl':
      return {
        width: sizeToPercentage('xxl'),
        height: display.px(72),
        fontSize: display.fontPixel(20),
        icon: display.px(32),
      }
    case 'full':
    default:
      return {
        width: sizeToPercentage('full'),
        height: display.px(56),
        fontSize: display.fontPixel(16),
        icon: display.px(24),
      }
  }
}

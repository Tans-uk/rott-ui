import type {Size} from '@models'
import {display} from '@utils'

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
    case 'xl':
    case 'xxl':
    case 'full':
    default:
      return {
        width: display.px(342),
        height: display.px(56),
        fontSize: display.fontPixel(16),
        icon: display.px(24),
      }
  }
}

import {useDisplay} from '../../../hooks'
import type {Size} from '../../../models'

export const buttonSizeNormalizer = (buttonSize: Size | {width: string; height: string}) => {
  const {px, fontPixel} = useDisplay()

  switch (buttonSize) {
    case 'xs':
      return {
        width: px(85.5),
        height: px(36),
        fontSize: fontPixel(12),
        icon: px(18),
      }
    case 'sm':
      return {
        width: px(114),
        height: px(40),
        fontSize: fontPixel(14),
        icon: px(20),
      }
    case 'md':
      return {
        width: px(171),
        height: px(48),
        fontSize: fontPixel(14),
        icon: px(24),
      }
    case 'lg':
      return {
        width: px(228),
        height: px(56),
        fontSize: fontPixel(16),
        icon: px(24),
      }
    case 'xl':
    case 'xxl':
    case 'full':
    default:
      return {
        width: px(342),
        height: px(56),
        fontSize: fontPixel(16),
        icon: px(24),
      }
  }
}

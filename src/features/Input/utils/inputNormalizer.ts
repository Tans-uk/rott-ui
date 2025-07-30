import {type Size} from '../../../models'
import {display, fontSizeNormalizer} from '../../../utils'

interface InputStyleProps {
  height: number
  paddingHorizontal: number
  placeholderSize: number
  bottomElementPadding: number
  icon: {
    height: number
    width: number
    paddingBottom: number
  }
}

interface InputStyleNormalizerProps {
  size?: Size
  placeholderSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | number
}

export function InputStyleNormalizer({
  size = 'lg',
  placeholderSize,
}: InputStyleNormalizerProps): InputStyleProps {
  switch (size) {
    case 'xs':
    case 'sm':
      return {
        height: display.normalize(40),
        paddingHorizontal: display.normalize(16, 'height'),
        placeholderSize: fontSizeNormalizer(placeholderSize ?? 'md'),
        bottomElementPadding: display.normalize(6, 'height'),
        icon: {
          height: 18,
          width: 18,
          paddingBottom: 8,
        },
      }
    case 'lg':
    case 'xl':
    case 'xxl':
    case 'full':
      return {
        height: display.normalize(56, 'height'),
        paddingHorizontal: display.normalize(16, 'height'),
        placeholderSize: fontSizeNormalizer(placeholderSize ?? 'xl'),
        bottomElementPadding: display.normalize(12, 'height'),
        icon: {
          height: 24,
          width: 24,
          paddingBottom: 16,
        },
      }

    case 'md':
    default:
      return {
        height: display.normalize(48, 'height'),
        paddingHorizontal: display.normalize(16, 'height'),
        placeholderSize: fontSizeNormalizer(placeholderSize ?? 'lg'),
        bottomElementPadding: display.normalize(8, 'height'),
        icon: {
          height: 24,
          width: 24,
          paddingBottom: 12,
        },
      }
  }
}

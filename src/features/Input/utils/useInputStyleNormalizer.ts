import {useDisplay} from '../../../hooks'
import {type Size} from '../../../models'
import {fontSizeNormalizer} from '../../../utils'

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

export function useInputStyleNormalizer({
  size = 'lg',
  placeholderSize,
}: InputStyleNormalizerProps): InputStyleProps {
  const {normalize} = useDisplay()

  switch (size) {
    case 'xs':
    case 'sm':
      return {
        height: normalize(40),
        paddingHorizontal: normalize(16, 'height'),
        placeholderSize: fontSizeNormalizer(placeholderSize ?? 'md'),
        bottomElementPadding: normalize(6, 'height'),
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
        height: normalize(56, 'height'),
        paddingHorizontal: normalize(16, 'height'),
        placeholderSize: fontSizeNormalizer(placeholderSize ?? 'xl'),
        bottomElementPadding: normalize(12, 'height'),
        icon: {
          height: 24,
          width: 24,
          paddingBottom: 16,
        },
      }

    case 'md':
    default:
      return {
        height: normalize(48, 'height'),
        paddingHorizontal: normalize(16, 'height'),
        placeholderSize: fontSizeNormalizer(placeholderSize ?? 'lg'),
        bottomElementPadding: normalize(8, 'height'),
        icon: {
          height: 24,
          width: 24,
          paddingBottom: 12,
        },
      }
  }
}

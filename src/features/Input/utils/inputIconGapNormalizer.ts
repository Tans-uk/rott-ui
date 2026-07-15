import type {Size} from '../../../models'

/** Leading/trailing ikon ile içerik arası yatay boşluk (4'ün katları, size-based). */
export const inputIconGapNormalizer = (size?: Size): number => {
  switch (size) {
    case 'xs':
    case 'sm':
      return 4
    case 'lg':
    case 'xl':
    case 'xxl':
    case 'full':
      return 12
    case 'md':
    default:
      return 8
  }
}

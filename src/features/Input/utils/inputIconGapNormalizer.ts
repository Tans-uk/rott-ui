import type {Size} from '../../../models'

/** Horizontal gap between a leading/trailing icon and the content. Multiples of 4, size-based. */
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

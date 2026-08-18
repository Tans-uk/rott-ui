import type {Size} from '../models'

/**
 *
 * @param {string} size Width as a percentage of the screen. sm: 25%, md: 50%, lg: 75%, xl: 85%, xxl: 92.5%, full: 100%
 * @returns {string} The percentage the given size maps to. For example lg -> 75%
 */
export const sizeToPercentage = (size: Size) => {
  switch (size) {
    case 'xs':
      return '10%'
    case 'sm':
      return '25%'
    case 'md':
      return '50%'
    case 'lg':
      return '75%'
    case 'xl':
      return '85%'
    case 'xxl':
      return '92.5%'
    case 'full':
      return '100%'
  }
}

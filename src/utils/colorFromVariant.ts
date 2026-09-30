import {type Variant} from '../models'
import {themeConfig} from '../providers'

/**
 * Resolves a variant name to its color. The lookup uses the effective theme colors —
 * rott.config merged with RottProvider config, rott.config winning on collisions — and
 * returns the input unchanged when it is not a known name, so literal colors pass through.
 */
export const colorFromVariant = (variant: Variant = 'primary') => {
  const colors = themeConfig.colors

  return Object.prototype.hasOwnProperty.call(colors, variant)
    ? (colors[variant as string] as string)
    : variant
}

export const textcolorFromVariant = (variant: Variant = 'primary') => {
  switch (variant) {
    // OUTLINE MAIN
    case 'primary-outline':
      return themeConfig.colors.primary
    case 'secondary-outline':
      return themeConfig.colors.secondary
    case 'white':
    case 'grey-100':
    case 'info':
      return themeConfig.colors['grey-900']

    // OUTLINE SEMANTIC
    case 'danger-outline':
      return themeConfig.colors.danger
    case 'success-outline':
      return themeConfig.colors.success
    case 'info-outline':
      return themeConfig.colors.info
    case 'warning-outline':
      return themeConfig.colors.warning
    case 'transparent':
      return themeConfig.colors['grey-900']

    default:
      return themeConfig.colors.white
  }
}

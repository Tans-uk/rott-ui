import {type Variant} from '../models'
import {themeConfig} from '../providers'
import {theme} from '../theme'

export const colorFromVariant = (variant: Variant = 'primary') => {
  return Object.keys(theme.colors).includes(variant as string)
    ? theme.colors[variant as keyof typeof theme.colors]
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

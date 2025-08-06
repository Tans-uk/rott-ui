import {useContext} from 'react'

import {RottUiContext} from '../contexts'

export const useTextColorFromVariant = (variant: string): string => {
  const {colors} = useContext(RottUiContext)

  switch (variant) {
    // OUTLINE MAIN
    case 'primary-outline':
      return colors.primary!
    case 'secondary-outline':
      return colors.secondary!
    case 'white':
    case 'grey-100':
    case 'info':
      return colors['grey-900']!

    // OUTLINE SEMANTIC
    case 'danger-outline':
      return colors.danger!
    case 'success-outline':
      return colors.success!
    case 'info-outline':
      return colors.info!
    case 'warning-outline':
      return colors.warning!
    case 'transparent':
      return colors['grey-900']!

    default:
      return colors.white!
  }
}

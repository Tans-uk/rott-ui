import type {AlertDialogButtonProps} from './alertDialogButtonProps'

import type {EmptyStateProps} from '@features/EmptyState'
import type {IconProps} from '@features/Icon'

export interface AlertDialogModel {
  id?: number
  title?: string
  text?: string
  showActivityIndicator?: boolean
  emptyState?: EmptyStateProps
  icon?: IconProps
  buttons?:
    | Nullable<AlertDialogButtonProps>[]
    | {
        cancelButton?: AlertDialogButtonProps
        confirmButton?: AlertDialogButtonProps
      }

  /**
   * Time in milliseconds after which the AlertDialog will automatically close
   * If not provided, the AlertDialog will remain open until manually closed
   */
  autoClose?: number
}

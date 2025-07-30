import {EmptyStateProps} from '../../EmptyState'
import type {IconProps} from '../../Icon'
import type {AlertDialogButtonProps} from './alertDialogButtonProps'

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

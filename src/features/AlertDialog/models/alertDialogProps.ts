import type {AlertDialogButtonProps} from './alertDialogButtonProps'

import type {EmptyStateProps} from '@features/EmptyState'
import type {IconProps} from '@features/Icon'
import type {ModalProps} from '@features/Modal'

export interface AlertDialogProps
  extends Omit<
    ModalProps,
    | 'header'
    | 'headerTitle'
    | 'fullScreen'
    | 'headerLogo'
    | 'closeButton'
    | 'height'
    | 'backgroundColor'
    | 'panResponderBackgroundColor'
    | 'headerBackgroundColor'
    | 'slideToClose'
  > {
  id?: number
  title?: string
  text?: string
  emptyState?: EmptyStateProps
  icon?: IconProps
  buttons?:
    | Nullable<AlertDialogButtonProps>[]
    | {
        cancelButton?: AlertDialogButtonProps
        confirmButton?: AlertDialogButtonProps
      }
  showActivityIndicator?: boolean
}

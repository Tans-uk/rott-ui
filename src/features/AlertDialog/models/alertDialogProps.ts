import type {EmptyStateProps} from '../../EmptyState/models'
import type {IconProps} from '../../Icon/models'
import type {ModalProps} from '../../Modal/models'
import type {AlertDialogButtonProps} from './alertDialogButtonProps'

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

import {ThemeConfig} from '../../../models'
import type {EmptyStateProps} from '../../EmptyState/models'
import type {IconProps} from '../../Icon/models'
import type {ModalProps} from '../../Modal/models'
import type {AlertDialogButtonProps} from './alertDialogButtonProps'

export interface AlertDialogProps
  extends Omit<
    ModalProps<ThemeConfig>,
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
  icon?: IconProps<ThemeConfig>
  buttons?:
    | Nullable<AlertDialogButtonProps<ThemeConfig>>[]
    | {
        cancelButton?: AlertDialogButtonProps<ThemeConfig>
        confirmButton?: AlertDialogButtonProps<ThemeConfig>
      }
  showActivityIndicator?: boolean
}

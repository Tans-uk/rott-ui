import type {ReactNode} from 'react'

import type {IconKeys} from '../../../features/Icon/models'
import type {ImageTypes} from '../../../features/Image/models'
import type {ModalProps} from '../../../features/Modal/models'
import type {Size, Variant} from '../../../models'
import type {ResultActionModel} from './resultActionModel'

/**
 * Result Data Tipi
 *
 * @property {string} title - Heading text
 * @property {string} name - actionName, required by tests. *Example:* ```action-name```
 * @property {void} action - Called when the action is pressed
 *
 * Example:
 *```
 * const resultData: ResultDataProps[] = [
 *   {
 *     name: 'dekont-gonder',
 *     title: 'Dekont Gonder',
 *     action: () => {
 *       // eslint-disable-next-line no-console
 *       console.log('Dekont Gonder');
 *     },
 *   },
 *   {
 *     name: 'yeni-islem',
 *     title: 'Yeni Islem',
 *     action: () => {
 *       // eslint-disable-next-line no-console
 *       console.log('Yeni Islem');
 *     },
 *   },
 * ];
 * ```
 */
export interface ResultProps extends Omit<ModalProps, 'fullScreen'> {
  title?: string | ReactNode
  description?: string | ReactNode

  /*
   * ResultVariant describes the outcome of an operation.
   * It can be one of:
   * - 'success': the operation completed successfully.
   * - 'warning': the operation raised warnings.
   * - 'error': the operation failed.
   * - 'info': informational detail about the operation.
   */
  variant: Variant
  iconName: IconKeys

  actions?: ResultActionModel[]
  fontSize?: Size

  isShow?: boolean
}

export interface ResultScreenParamModel {
  header?: string
  state: ImageTypes
  title?: string
  description?: string
  actions?: ResultActionModel[]
  fontSize?: Size
  isFastTransfer?: boolean
}

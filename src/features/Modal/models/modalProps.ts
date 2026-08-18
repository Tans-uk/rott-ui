import type {PropsWithChildren, ReactNode} from 'react'

import type {ModalProps as RNModalProps} from 'react-native'

import type {Variant} from '../../../models'
import type {HeaderProps} from '../../Header'

export interface ModalProps
  extends PropsWithChildren, Omit<RNModalProps, 'transparent' | 'animated' | 'id'> {
  id?: number
  fullScreen?: boolean

  header?: ReactNode | HeaderProps
  closeButton?: boolean
  onClose?: () => void
  disableOutsideClick?: boolean

  /**
   * Must be between 0 and 100.
   */
  height?: number
  backgroundColor?: string
  panResponderBackgroundColor?: Variant
  headerBackgroundColor?: Variant
  slideToClose?: boolean

  alignItemsCenter?: boolean
  justifyContentCenter?: boolean

  /**
   * With transparent enabled the item can be swiped left and right freely.
   *
   * Added for InformationModal, which needed exactly this.
   * Without it, tapping the backdrop does not close the modal even when backgroundColor='transparent'.
   * */
  transparent?: boolean
  modals?: ModalProps[]

  modalContainerMarginBottom?: number
  children?: any

  /** Keeps the modal attached to the soft keyboard as it opens.
   * Ignored when the modal is taller than a set height.
   */
  sticksToKeyboard?: boolean
}

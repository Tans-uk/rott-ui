import {ThemeConfig} from '../../../models'
import type {ModalProps} from './modalProps'

export interface ModalContextModel {
  modals: ModalProps<ThemeConfig>[]
  showModal: (modalToRender: ModalProps<ThemeConfig>) => void
  updateModal: (modalToRender: ModalProps<ThemeConfig>, id?: number) => void
  hideModal: (id?: number) => void
  hasModalById: (id: number) => boolean
  hideAllModal: (
    predicate: (
      value: ModalProps<ThemeConfig>,
      index: number,
      array: ModalProps<ThemeConfig>[]
    ) => unknown
  ) => void
}

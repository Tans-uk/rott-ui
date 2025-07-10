import type {ModalProps} from './modalProps'

export interface ModalContextModel {
  modals: ModalProps[]
  showModal: (modalToRender: ModalProps) => void
  updateModal: (modalToRender: ModalProps, id?: number) => void
  hideModal: (id?: number) => void
  hasModalById: (id: number) => boolean
  hideAllModal: (
    predicate: (value: ModalProps, index: number, array: ModalProps[]) => unknown
  ) => void
}

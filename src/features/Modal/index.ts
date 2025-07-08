import {createRef} from 'react'

import {useModal} from './hooks'
import type {ModalProps} from './models'

export * from './components'
export * from './style'
export * from './models'
export * from './hooks'
export * from './providers'
export * from './contexts'
export * from './utils'

type ModalService = ReturnType<typeof useModal>

export const modalRef = createRef<ModalService>()

export const Modal: ModalService = {
  modals: modalRef.current?.modals ?? [],
  showModal: (modalOptions?: ModalProps) => modalRef.current?.showModal(modalOptions),
  updateModal: (modalToRender: ModalProps) => modalRef.current?.updateModal(modalToRender),
  hideModal: (id?: number) => modalRef.current?.hideModal(id),
  hasModalById: (id: number) => modalRef.current?.hasModalById(id) ?? false,
  hideAllModal: () => modalRef.current?.hideAllModal(),
}

import {useCallback, useMemo, useState, type FC, type PropsWithChildren} from 'react'

import {modalRef} from '..'
import {ModalComponent} from '../components'
import {ModalContext} from '../contexts'
import {useModal} from '../hooks'
import type {ModalProps} from '../models'

export const ModalProvider: FC<PropsWithChildren> = ({children}) => {
  const [modals, setModals] = useState<ModalProps[]>([])

  const showModal = useCallback(
    (modalToRender: ModalProps) =>
      setModals((prevState) => {
        const shouldUpdate = prevState.some((modal) => modal.id === modalToRender?.id)
        if (shouldUpdate) {
          let modalToUpdate = prevState.find((modal) => modal.id === modalToRender.id)

          modalToUpdate!.header = modalToRender!.header
          modalToUpdate!.children = modalToRender!.children
          modalToUpdate = modalToRender

          return [...prevState]
        } else
          return [...prevState, {...modalToRender, id: modalToRender?.id ?? prevState?.length + 1}]
      }),
    [modals, setModals]
  )

  const updateModal = useCallback(
    (modalToRender: ModalProps, id?: number) => {
      setModals((prevState) => {
        const modalToUpdate = prevState.find(
          (modal) => modal.id === id || modal.id === modalToRender?.id
        )

        if (modalToRender && modalToUpdate && modalToUpdate.children !== modalToRender.children) {
          modalToUpdate.header = modalToRender?.header ?? modalToUpdate?.header
          modalToUpdate.children = modalToRender?.children ?? modalToUpdate?.children
          modalToUpdate.height = modalToRender.height ?? modalToUpdate?.height
        }

        return [...prevState]
      })
    },
    [modals]
  )

  const hideModal = useCallback(
    (id?: number) => {
      const modalsAfterDelete = id
        ? modals?.filter((modal) => modal.id !== id)
        : modals?.slice(0, modals.length - 1)

      setModals(modalsAfterDelete)
    },
    [modals]
  )

  const hasModalById = useCallback(
    (id: number) => modals.some((modal) => modal.id === id),
    [modals]
  )

  const hideAllModal = useCallback(
    (predicate: (value: ModalProps, index: number, array: ModalProps[]) => unknown) => {
      const modalsAfterDelete = modals?.filter(predicate)
      setModals(modalsAfterDelete)
    },
    [modals]
  )

  const contextValues = useMemo(() => {
    return {
      modals,
      showModal,
      updateModal,
      hideModal,
      hasModalById,
      hideAllModal,
    }
  }, [modals, showModal, updateModal, hideModal, hasModalById, hideAllModal])

  return (
    <ModalContext.Provider value={contextValues}>
      <InitializeModalRef />
      {children}

      {modals && <ModalComponent {...modals[0]} modals={modals} />}
    </ModalContext.Provider>
  )
}

const InitializeModalRef = () => {
  const modalHook = useModal()
  modalRef.current = modalHook

  return null
}

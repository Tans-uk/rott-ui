/* eslint-disable @typescript-eslint/no-unused-vars */
import {createContext} from 'react'

import type {ModalContextModel, ModalProps} from '../models'

export const ModalContext = createContext<ModalContextModel>({
  modals: [],
  showModal: (_modalToRender: ModalProps) => {},
  updateModal: (_modalToRender: ModalProps, _id?: number) => {},
  hideModal: (_id?: number) => {},
  hasModalById: (_id?: number) => true,
  hideAllModal: () => {},
})

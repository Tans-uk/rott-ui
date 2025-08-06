/* eslint-disable @typescript-eslint/no-unused-vars */
import {createContext} from 'react'

import {ThemeConfig} from '../../../models'
import type {ModalContextModel, ModalProps} from '../models'

export const ModalContext = createContext<ModalContextModel>({
  modals: [],
  showModal: (_modalToRender: ModalProps<ThemeConfig>) => {},
  updateModal: (_modalToRender: ModalProps<ThemeConfig>, _id?: number) => {},
  hideModal: (_id?: number) => {},
  hasModalById: (_id?: number) => true,
  hideAllModal: () => {},
})

import {createContext} from 'react'

import type {ActionMenuContextModel} from '../models'

export const ActionMenuContext = createContext<ActionMenuContextModel>({
  showActionMenu: () => {},
  hideActionMenu: () => {},
})

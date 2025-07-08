import {createContext} from 'react'

import type {AlertDialogContextModel} from '../models'

export const AlertDialogContext = createContext<AlertDialogContextModel>({
  show: () => {},
  hide: (_id?: number) => {},
  test: () => {},
})

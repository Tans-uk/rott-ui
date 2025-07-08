import {createRef} from 'react'

import {useAlertDialog} from './hooks'
import type {AlertDialogModel} from './models'

export * from './components'
export * from './providers'
export * from './hooks'
export * from './models'
export * from './styles'
export * from './contexts'

type AlertDialogService = ReturnType<typeof useAlertDialog>

export const alertDialogRef = createRef<AlertDialogService>()

export const AlertDialog: AlertDialogService = {
  show: (alertDialog: AlertDialogModel) => alertDialogRef.current?.show(alertDialog),
  hide: (id?: number) => alertDialogRef.current?.hide(id),
  test: () => alertDialogRef.current?.test(),
}

import type {AlertDialogModel} from './alertDialogModel'

export interface AlertDialogContextModel {
  show: (alertDialogToRender: AlertDialogModel) => void
  hide: (id?: number) => void
  test: () => void
}

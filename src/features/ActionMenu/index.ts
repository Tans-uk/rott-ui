import {createRef} from 'react'

import {useActionMenu} from './hooks'
import type {ActionMenuProps} from './models'

export * from './hooks'
export * from './components'
export * from './models'
export * from './providers'
export * from './contexts'
export * from './utils'
export * from './styles'

type ActionMenuService = ReturnType<typeof useActionMenu>
export const actionMenuRef = createRef<ActionMenuService>()

export const ActionMenu: ActionMenuService = {
  showActionMenu: (actionMenuProps: ActionMenuProps) =>
    actionMenuRef.current?.showActionMenu(actionMenuProps),
  hideActionMenu: () => actionMenuRef.current?.hideActionMenu(),
}

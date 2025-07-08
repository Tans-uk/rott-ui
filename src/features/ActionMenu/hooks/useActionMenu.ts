import {useContext, useMemo} from 'react'

import {ActionMenuContext} from '../contexts'

export const useActionMenu = () => {
  const {showActionMenu, hideActionMenu} = useContext(ActionMenuContext)

  const actionMenuHook = useMemo(
    () => ({
      showActionMenu: showActionMenu,
      hideActionMenu: hideActionMenu,
    }),
    [showActionMenu, hideActionMenu]
  )

  return actionMenuHook
}

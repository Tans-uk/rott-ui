import {useCallback, useContext, useMemo, type FC, type PropsWithChildren} from 'react'

import {ActionMenuContext, actionMenuRef} from '..'
import {RottUiContext} from '../../../contexts'
import {useDisplay} from '../../../hooks'
import {Modal} from '../../Modal'
import {ActionMenuComponent, ActionMenuHeaderComponent} from '../components'
import {useActionMenu} from '../hooks'
import {ActionMenuProps} from '../models'
import {modalHeightNormalizer} from '../utils'

export const ActionMenuProvider: FC<PropsWithChildren> = ({children}) => {
  const {colors} = useContext(RottUiContext)
  const {px} = useDisplay()
  const showActionMenu = useCallback((actionMenuProps: ActionMenuProps) => {
    const ITEM_HEIGHT = actionMenuProps.itemHeight === undefined ? 56 : actionMenuProps.itemHeight
    const MAX_ITEM = actionMenuProps.maxItem === undefined ? 4 : actionMenuProps.maxItem

    const SEPARATOR_TOTAL_HEIGHT =
      (actionMenuProps.data?.length ?? 0) > MAX_ITEM
        ? MAX_ITEM * px(1)
        : (actionMenuProps.data?.length ?? 0) * px(1)

    const modalHeightPercentage = modalHeightNormalizer(
      actionMenuProps.data?.length ?? 0,
      !!actionMenuProps.title,
      !!actionMenuProps.subTitle,
      SEPARATOR_TOTAL_HEIGHT,
      MAX_ITEM,
      ITEM_HEIGHT
    )

    Modal.showModal({
      testID: 'action-menu-modal-test-id',
      visible: true,
      height: modalHeightPercentage,
      statusBarTranslucent: true,
      onClose: () => Modal.hideModal(),
      headerBackgroundColor: 'transparent',
      panResponderBackgroundColor: 'transparent',
      backgroundColor: colors.transparent,
      header: (actionMenuProps.title || actionMenuProps.subTitle) && (
        <ActionMenuHeaderComponent
          title={actionMenuProps.title}
          subTitle={actionMenuProps.subTitle}
        />
      ),
      children: (
        <ActionMenuComponent
          {...actionMenuProps}
          maxItem={MAX_ITEM}
          itemHeight={ITEM_HEIGHT}
          separatorTotalHeight={SEPARATOR_TOTAL_HEIGHT}
        />
      ),
    })
  }, [])

  const hideActionMenu = useCallback(() => Modal.hideModal(), [])

  const contextValue = useMemo(() => {
    return {
      showActionMenu,
      hideActionMenu,
    }
  }, [showActionMenu, hideActionMenu])

  return (
    <ActionMenuContext.Provider value={contextValue}>
      <InitializeActionMenuRef />

      {children}
    </ActionMenuContext.Provider>
  )
}

const InitializeActionMenuRef = () => {
  const actionMenuHook = useActionMenu()
  actionMenuRef.current = actionMenuHook

  return null
}

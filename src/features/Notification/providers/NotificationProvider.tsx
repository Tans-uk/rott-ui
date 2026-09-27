import React, {useCallback, useMemo, useState, type FC, type PropsWithChildren} from 'react'

import {
  NotificationContext,
  NotificationModel,
  notificationRef,
  ToasterNotificationProvider,
} from '..'
import {Item} from '../../Item'
import {useNotification} from '../hooks'

import {Toast} from 'react-native-toast-notifications'

const InitializeNotificationRef = () => {
  const notificationHook = useNotification()
  notificationRef.current = notificationHook

  return null
}

export interface NotificationProviderProps extends PropsWithChildren {
  /**
   * When true, the whole tree ignores touches while a notification is visible — the
   * behavior before 0.9.1. Off by default, so the app and the toast stay pressable.
   */
  blockTouchesWhileVisible?: boolean
}

export const NotificationProvider: FC<NotificationProviderProps> = ({
  children,
  blockTouchesWhileVisible = false,
}) => {
  // Toasts on screen. The toast library calls onClose once per toast — hidden by id, by
  // hideAll or by its timer — so onClose is the only place that counts down.
  const [visibleNotifications, setVisibleNotifications] = useState(0)

  const handleClose = useCallback(() => {
    setVisibleNotifications((count) => Math.max(0, count - 1))
  }, [])

  const show = useCallback(
    ({title, description, variant, onPress}: NotificationModel) => {
      setVisibleNotifications((count) => count + 1)

      return Toast.show(title, {
        type: variant,
        data: {title, description, variant, onPress},
        onClose: handleClose,
      })
    },
    [handleClose]
  )

  const hide = useCallback((id: string) => Toast.hide(id), [])
  const hideAll = useCallback(() => Toast.hideAll(), [])

  const success = useCallback(
    (title: string, description?: string, onPress?: () => void) =>
      show({title, description, variant: 'success', onPress}),
    [show]
  )
  const warning = useCallback(
    (title: string, description?: string, onPress?: () => void) =>
      show({title, description, variant: 'warning', onPress}),
    [show]
  )
  const danger = useCallback(
    (title: string, description?: string, onPress?: () => void) =>
      show({title, description, variant: 'danger', onPress}),
    [show]
  )
  const info = useCallback(
    (title: string, description?: string, onPress?: () => void) =>
      show({title, description, variant: 'info', onPress}),
    [show]
  )

  const contextValues = useMemo(
    () => ({
      notifications: visibleNotifications,
      show,
      hide,
      hideAll,
      success,
      warning,
      danger,
      info,
    }),
    [visibleNotifications, show, hide, hideAll, success, warning, danger, info]
  )

  const blockTouches = blockTouchesWhileVisible && visibleNotifications > 0

  return (
    <NotificationContext.Provider value={contextValues}>
      <InitializeNotificationRef />
      <Item flex={1} pointerEvents={blockTouches ? 'box-only' : 'box-none'}>
        <ToasterNotificationProvider>{children}</ToasterNotificationProvider>
      </Item>
    </NotificationContext.Provider>
  )
}

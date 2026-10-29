import React, {useCallback, useMemo, useRef, useState, type FC, type PropsWithChildren} from 'react'

import {
  NotificationContext,
  NotificationModel,
  notificationRef,
  ToasterNotificationProvider,
} from '..'
import {Item} from '../../Item'
import {useNotification} from '../hooks'

import type ToastContainer from 'react-native-toast-notifications'

const InitializeNotificationRef = () => {
  const notificationHook = useNotification()
  notificationRef.current = notificationHook

  return null
}

export interface NotificationProviderProps extends PropsWithChildren {
  /**
   * When true, the whole tree ignores touches while a notification is visible — the
   * behavior before 0.10.0. Off by default, so the app and the toast stay pressable.
   */
  blockTouchesWhileVisible?: boolean
}

export const NotificationProvider: FC<NotificationProviderProps> = ({
  children,
  blockTouchesWhileVisible = false,
}) => {
  // This provider's own toast container. Its ref is attached before any effect runs, so calls
  // from first-mount effects work, and a remounted provider never reaches an old container.
  const toastRef = useRef<ToastContainer>(null)
  // Toasts on screen, open or closing, as the container reports them.
  const [visibleNotifications, setVisibleNotifications] = useState(0)

  const show = useCallback(
    ({title, description, variant, onPress}: NotificationModel) =>
      toastRef.current?.show(title, {
        type: variant,
        data: {title, description, variant, onPress},
      }) ?? '',
    []
  )

  const hide = useCallback((id: string) => toastRef.current?.hide(id), [])
  const hideAll = useCallback(() => toastRef.current?.hideAll(), [])

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
        <ToasterNotificationProvider
          toastRef={toastRef}
          onToastCountChange={setVisibleNotifications}>
          {children}
        </ToasterNotificationProvider>
      </Item>
    </NotificationContext.Provider>
  )
}

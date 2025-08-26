import {useCallback, useMemo, useState, type FC, type PropsWithChildren} from 'react'

import {
  NotificationContext,
  NotificationModel,
  notificationRef,
  ToasterNotificationProvider,
} from '..'
import {Item} from '../../Item'
import {useNotification} from '../hooks'

import {Toast} from 'react-native-toast-notifications'
import React from 'react'

let notifications = 0

const InitializeModalRef = () => {
  const notificationHook = useNotification()
  notificationRef.current = notificationHook

  return null
}

export const NotificationProvider: FC<PropsWithChildren> = ({children}) => {
  const [hasAnyNotification, setHasAnyNotification] = useState<boolean>(false)
  const increment = () => {
    notifications = notifications + 1

    if (notifications > 0) setHasAnyNotification(true)
  }

  const decrement = () => {
    if (notifications > 0) notifications = notifications - 1

    if (notifications === 0) setHasAnyNotification(false)
  }

  const baseNotification = ({title, description, variant}: NotificationModel) =>
    Toast.show(title, {
      type: variant,
      data: {title, description, variant},
      onClose: () => decrement(),
    })

  const show = useCallback(
    (notification: NotificationModel) => {
      increment()

      return baseNotification(notification)
    },
    [notifications]
  )
  const hide = useCallback(
    (id: string) => {
      decrement()

      return Toast.hide(id)
    },
    [notifications]
  )
  const hideAll = useCallback(() => {
    return Toast.hideAll()
  }, [])

  const success = useCallback(
    (title: string, description?: string) => {
      increment()

      return baseNotification({title, description, variant: 'success'})
    },
    [notifications]
  )
  const warning = useCallback(
    (title: string, description?: string) => {
      increment()

      return baseNotification({title, description, variant: 'warning'})
    },
    [notifications]
  )
  const danger = useCallback(
    (title: string, description?: string) => {
      increment()

      return baseNotification({title, description, variant: 'danger'})
    },
    [notifications]
  )
  const info = useCallback(
    (title: string, description?: string) => {
      increment()

      return baseNotification({title, description, variant: 'info'})
    },
    [notifications]
  )

  const contextValues = useMemo(() => {
    return {
      notifications,
      show,
      hide,
      hideAll,

      success,
      warning,
      danger,
      info,
    }
  }, [notifications, show, hide, hideAll, success, warning, danger, info, increment, decrement])

  return (
    <NotificationContext.Provider value={contextValues}>
      <InitializeModalRef />
      <Item flex={1} pointerEvents={hasAnyNotification ? 'box-only' : 'box-none'}>
        <ToasterNotificationProvider>{children}</ToasterNotificationProvider>
      </Item>
    </NotificationContext.Provider>
  )
}

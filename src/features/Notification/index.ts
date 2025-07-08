import {createRef} from 'react'

import {useNotification} from './hooks'
import type {NotificationModel} from './models'

export * from './contexts'
export * from './components'
export * from './hooks'
export * from './providers'
export * from './models'

type NotificationService = ReturnType<typeof useNotification>
export const notificationRef = createRef<NotificationService>()

export const Notification = {
  show: (notification: NotificationModel) => notificationRef.current?.show(notification),
  hide: (id: string) => notificationRef.current?.hide(id),
  hideAll: () => notificationRef.current?.hideAll,

  success: (title: string, description?: string, onPress?: () => void) =>
    notificationRef.current?.success(title, description, onPress),
  warning: (title: string, description?: string, onPress?: () => void) =>
    notificationRef.current?.warning(title, description, onPress),
  danger: (title: string, description?: string, onPress?: () => void) =>
    notificationRef.current?.danger(title, description, onPress),
  info: (title: string, description?: string, onPress?: () => void) =>
    notificationRef.current?.info(title, description, onPress),
}

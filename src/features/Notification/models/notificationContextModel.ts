import type {NotificationModel} from './notificationModel'

export interface NotificationContextModel {
  notifications: number
  show: (notification: NotificationModel) => string
  hide: (id: string) => void
  hideAll: () => void

  success: (title: string, description?: string, onPress?: () => void) => string
  warning: (title: string, description?: string, onPress?: () => void) => string
  danger: (title: string, description?: string, onPress?: () => void) => string
  info: (title: string, description?: string, onPress?: () => void) => string
}

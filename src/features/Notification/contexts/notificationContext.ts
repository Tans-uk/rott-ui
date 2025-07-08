/* eslint-disable @typescript-eslint/no-unused-vars */
import {createContext} from 'react'

import type {NotificationContextModel, NotificationModel} from '../models'

export const NotificationContext = createContext<NotificationContextModel>({
  notifications: 0,
  show: (_notification: NotificationModel) => '',
  hide: (_id: string) => {},
  hideAll: () => {},

  success: (_title: string, _description?: string) => '',
  warning: (_title: string, _description?: string) => '',
  danger: (_title: string, _description?: string) => '',
  info: (_title: string, _description?: string) => '',
})

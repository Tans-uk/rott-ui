import {useContext, useMemo} from 'react'

import {NotificationContext} from '../contexts'

export const useNotification = () => {
  const {notifications, show, hide, hideAll, success, warning, danger, info} =
    useContext(NotificationContext)

  const notificationHook = useMemo(
    () => ({
      notifications,
      show,
      hide,
      hideAll,

      /**
       *
       * @param title Notification title
       * @param description Notification body text
       * @param onPress Called when the notification is tapped
       * @returns Success Bildirimini Renderlar
       */
      success,
      /**
       *
       * @param title Notification title
       * @param description Notification body text
       * @param onPress Called when the notification is tapped
       * @returns Warning Bildirimini Renderlar
       */
      warning,
      /**
       *
       * @param title Notification title
       * @param description Notification body text
       * @param onPress Called when the notification is tapped
       * @returns Danger Bildirimini Renderlar
       */
      danger,
      /**
       *
       * @param title Notification title
       * @param description Notification body text
       * @param onPress Called when the notification is tapped
       * @returns Info Bildirimini Renderlar
       */
      info,
    }),
    [notifications, show, hide, hideAll, success, warning, danger, info]
  )

  return notificationHook
}

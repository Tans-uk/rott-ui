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
       * @param title Başlık
       * @param description Açıklama
       * @param onPress Tıklanınca çalışacak fonksiyon
       * @returns Success Bildirimini Renderlar
       */
      success,
      /**
       *
       * @param title Başlık
       * @param description Açıklama
       * @param onPress Tıklanınca çalışacak fonksiyon
       * @returns Warning Bildirimini Renderlar
       */
      warning,
      /**
       *
       * @param title Başlık
       * @param description Açıklama
       * @param onPress Tıklanınca çalışacak fonksiyon
       * @returns Danger Bildirimini Renderlar
       */
      danger,
      /**
       *
       * @param title Başlık
       * @param description Açıklama
       * @param onPress Tıklanınca çalışacak fonksiyon
       * @returns Info Bildirimini Renderlar
       */
      info,
    }),
    [notifications, show, hide, hideAll, success, warning, danger, info]
  )

  return notificationHook
}

import {type FC, type PropsWithChildren} from 'react'

import {NotificationComponent} from '../components'

import {Icon, type IconTypes} from '@features/Icon'
import {type Variant} from '@models'

import {ToastProvider} from 'react-native-toast-notifications'

export const ToasterNotificationProvider: FC<PropsWithChildren> = ({children}) => {
  const notificationIcon = (name: IconTypes, variant: Variant) => {
    return <Icon name={name} width={20} height={20} mode='fill' variant={variant} />
  }

  return (
    <ToastProvider
      placement='top'
      duration={3000}
      animationType='slide-in'
      animationDuration={250}
      offset={50}
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}
      renderType={{
        success: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(72, 193, 181, 1)'
            iconElement={notificationIcon('CHECK_CIRCLE_FILL', 'success-notification')}
            onClose={onHide}
          />
        ),
        danger: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(209, 94, 83, 1)'
            iconElement={notificationIcon('INFORMATION_CIRCLE_FILL', 'danger-notification')}
            onClose={onHide}
          />
        ),
        warning: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(255, 173, 50, 1)'
            iconElement={notificationIcon('INFORMATION_CIRCLE_FILL', 'warning-notification')}
            onClose={onHide}
          />
        ),
        info: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(77, 175, 234, 1)'
            iconElement={notificationIcon('INFORMATION_CIRCLE_FILL', 'info-notification')}
            onClose={onHide}
          />
        ),
      }}>
      {children}
    </ToastProvider>
  )
}

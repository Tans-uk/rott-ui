import {type FC, type PropsWithChildren} from 'react'

import {type Variant} from '../../../models'
import {Icon, IconKeys} from '../../Icon'
import {NotificationComponent} from '../components'

import {ToastProvider} from 'react-native-toast-notifications'
import React from 'react'

export const ToasterNotificationProvider: FC<PropsWithChildren> = ({children}) => {
  const notificationIcon = (name: IconKeys, variant: Variant) => {
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
            iconElement={notificationIcon('INFORMATION_CIRCLE', 'danger-notification')}
            onClose={onHide}
          />
        ),
        warning: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(255, 173, 50, 1)'
            iconElement={notificationIcon('INFORMATION_CIRCLE', 'warning-notification')}
            onClose={onHide}
          />
        ),
        info: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(77, 175, 234, 1)'
            iconElement={notificationIcon('INFORMATION_CIRCLE', 'info-notification')}
            onClose={onHide}
          />
        ),
      }}>
      {children}
    </ToastProvider>
  )
}

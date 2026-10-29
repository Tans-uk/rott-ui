import React, {
  type ComponentProps,
  type ComponentType,
  type FC,
  type PropsWithChildren,
  type Ref,
} from 'react'

import {type Variant} from '../../../models'
import {Icon, IconKeys} from '../../Icon'
import {NotificationComponent} from '../components'

import ToastContainer from 'react-native-toast-notifications'

interface ToastCountProps {
  onToastCountChange?: (count: number) => void
}

type ToastContainerProps = ComponentProps<typeof ToastContainer>

/**
 * The toast library's container, reporting how many toasts it renders, open or closing.
 * Touch blocking follows this count, so it matches the screen even when the library drops
 * a toast or closes one twice.
 */
class CountingToastContainer extends ToastContainer {
  componentDidUpdate() {
    const {onToastCountChange} = this.props as Readonly<ToastContainerProps & ToastCountProps>

    onToastCountChange?.(this.state.toasts.length)
  }
}

// The library's prop types do not list onToastCountChange, which only the subclass reads.
const CountingToast = CountingToastContainer as unknown as ComponentType<
  ToastContainerProps & ToastCountProps & {ref?: Ref<ToastContainer>}
>

interface ToasterNotificationProviderProps extends PropsWithChildren, ToastCountProps {
  /** Receives the toast container that shows and hides this provider's toasts. */
  toastRef?: Ref<ToastContainer>
}

export const ToasterNotificationProvider: FC<ToasterNotificationProviderProps> = ({
  children,
  toastRef,
  onToastCountChange,
}) => {
  const notificationIcon = (name: IconKeys, variant: Variant) => {
    return <Icon name={name} width={20} height={20} mode='fill' variant={variant} />
  }

  return (
    <>
      {children}
      <CountingToast
        ref={toastRef}
        onToastCountChange={onToastCountChange}
        placement='top'
        duration={3000}
        animationType='slide-in'
        animationDuration={250}
        offset={50}
        offsetTop={30}
        offsetBottom={40}
        swipeEnabled={true}
        renderType={{
          success: ({onHide, data: {title, description, onPress}}) => (
            <NotificationComponent
              title={title}
              description={description}
              variantColor='rgba(72, 193, 181, 1)'
              iconElement={notificationIcon('check-fill', 'success-notification')}
              onPress={onPress}
              onClose={onHide}
            />
          ),
          danger: ({onHide, data: {title, description, onPress}}) => (
            <NotificationComponent
              title={title}
              description={description}
              variantColor='rgba(209, 94, 83, 1)'
              iconElement={notificationIcon('information-circle', 'danger-notification')}
              onPress={onPress}
              onClose={onHide}
            />
          ),
          warning: ({onHide, data: {title, description, onPress}}) => (
            <NotificationComponent
              title={title}
              description={description}
              variantColor='rgba(255, 173, 50, 1)'
              iconElement={notificationIcon('information-circle', 'warning-notification')}
              onPress={onPress}
              onClose={onHide}
            />
          ),
          info: ({onHide, data: {title, description, onPress}}) => (
            <NotificationComponent
              title={title}
              description={description}
              variantColor='rgba(77, 175, 234, 1)'
              iconElement={notificationIcon('information-circle', 'info-notification')}
              onPress={onPress}
              onClose={onHide}
            />
          ),
        }}
      />
    </>
  )
}

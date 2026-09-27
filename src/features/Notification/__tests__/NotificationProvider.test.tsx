import React from 'react'

import {act, fireEvent, render} from '../../../__tests__/utils/testUtils'
import {RottProvider} from '../../../providers/RottProvider'
import {Button} from '../../Button'
import {Notification} from '../index'

import {Toast} from 'react-native-toast-notifications'

/**
 * Showing a real toast in this Jest setup loads React Native's legacy renderer, which
 * rejects react 19.2.4 (the renderer is built for 19.1.0). The stub keeps this library's
 * provider logic under test: it records every Toast call and captures the renderType map.
 */
let mockRenderType: any

jest.mock('react-native-toast-notifications', () => ({
  Toast: {show: jest.fn(() => 'toast-id'), hide: jest.fn(), hideAll: jest.fn()},
  ToastProvider: ({children, renderType}: any) => {
    mockRenderType = renderType

    return children
  },
}))

const lastToastOptions = () => (Toast.show as jest.Mock).mock.calls.at(-1)?.[1]

describe('Notification -> Provider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('keeps the app pressable while a notification is visible', async () => {
    const onPress = jest.fn()
    const {getByTestId} = await render(<Button testID='button' text='Save' onPress={onPress} />)

    await act(async () => {
      Notification.success('Saved')
    })
    fireEvent.press(getByTestId('button'))

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('blocks touches while visible when the app opts in, and releases them on close', async () => {
    const onPress = jest.fn()
    const {getByTestId} = await render(<Button testID='button' text='Save' onPress={onPress} />, {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <RottProvider blockTouchesWhileNotificationVisible>{children}</RottProvider>
      ),
    })

    await act(async () => {
      Notification.success('Saved')
    })
    fireEvent.press(getByTestId('button'))
    expect(onPress).not.toHaveBeenCalled()

    await act(async () => {
      lastToastOptions().onClose()
    })
    fireEvent.press(getByTestId('button'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('hides every notification through Notification.hideAll()', async () => {
    await render(<Button testID='button' text='Save' />)

    Notification.hideAll()

    expect(Toast.hideAll).toHaveBeenCalledTimes(1)
  })

  it('passes onPress to the notification it shows', async () => {
    const onPress = jest.fn()
    await render(<Button testID='button' text='Save' />)

    await act(async () => {
      Notification.success('Saved', 'All changes stored', onPress)
    })

    expect(lastToastOptions().data.onPress).toBe(onPress)
  })

  it('calls onPress and closes when the notification is tapped', async () => {
    await render(<Button testID='button' text='Save' />)
    const onPress = jest.fn()
    const onHide = jest.fn()

    const {getByTestId} = await render(
      mockRenderType.success({onHide, data: {title: 'Saved', onPress}})
    )
    fireEvent.press(getByTestId('notification-pressable-test-id'))

    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onHide).toHaveBeenCalledTimes(1)
  })
})

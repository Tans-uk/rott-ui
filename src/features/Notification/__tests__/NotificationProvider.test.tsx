import React from 'react'

import {act, fireEvent, render} from '../../../__tests__/utils/testUtils'
import {RottProvider} from '../../../providers/RottProvider'
import {Button} from '../../Button'
import {Notification} from '../index'

/**
 * Showing a real toast in this Jest setup loads React Native's legacy renderer, which
 * rejects react 19.2.4 (the renderer is built for 19.1.0). The stub container keeps this
 * library's provider logic under test: it records every call, captures the renderType map
 * and keeps a list of the toasts it shows, like the real container, without rendering them.
 */
const mockContainerCalls = {show: jest.fn(), hide: jest.fn(), hideAll: jest.fn()}
let mockRenderType: any
let mockDropNextToast = false

jest.mock('react-native-toast-notifications', () => {
  const {Component} = require('react')
  let nextId = 0

  return {
    __esModule: true,
    default: class MockToastContainer extends Component<any, {toasts: {id: string}[]}> {
      state = {toasts: [] as {id: string}[]}

      show = (message: string, options: any) => {
        mockContainerCalls.show(message, options)
        const id = `toast-${++nextId}`

        if (mockDropNextToast) mockDropNextToast = false
        else this.setState((state: any) => ({toasts: [...state.toasts, {id}]}))

        return id
      }

      hide = (id: string) => {
        mockContainerCalls.hide(id)
        this.setState((state: any) => ({
          toasts: state.toasts.filter((toast: {id: string}) => toast.id !== id),
        }))
      }

      hideAll = () => {
        mockContainerCalls.hideAll()
        this.setState({toasts: []})
      }

      render() {
        mockRenderType = this.props.renderType

        return null
      }
    },
  }
})

const lastToastOptions = () => mockContainerCalls.show.mock.calls.at(-1)?.[1]

const renderBlockingApp = (onPress: () => void) =>
  render(<Button testID='button' text='Save' onPress={onPress} />, {
    wrapper: ({children}: {children: React.ReactNode}) => (
      <RottProvider blockTouchesWhileNotificationVisible>{children}</RottProvider>
    ),
  })

describe('Notification -> Provider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDropNextToast = false
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
    const {getByTestId} = await renderBlockingApp(onPress)

    await act(async () => {
      Notification.success('Saved')
    })
    fireEvent.press(getByTestId('button'))
    expect(onPress).not.toHaveBeenCalled()

    await act(async () => {
      Notification.hideAll()
    })
    fireEvent.press(getByTestId('button'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('keeps blocking until the last toast closes, even when one closes twice', async () => {
    const onPress = jest.fn()
    const {getByTestId} = await renderBlockingApp(onPress)
    let first = ''
    let second = ''

    await act(async () => {
      first = Notification.success('Saved') ?? ''
      second = Notification.info('Synced') ?? ''
    })
    await act(async () => {
      Notification.hide(first)
      Notification.hide(first)
    })
    fireEvent.press(getByTestId('button'))
    expect(onPress).not.toHaveBeenCalled()

    await act(async () => {
      Notification.hide(second)
    })
    fireEvent.press(getByTestId('button'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('does not block for a toast the container never shows', async () => {
    const onPress = jest.fn()
    const {getByTestId} = await renderBlockingApp(onPress)

    mockDropNextToast = true
    await act(async () => {
      Notification.success('Saved')
    })
    fireEvent.press(getByTestId('button'))

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('hides every notification through Notification.hideAll()', async () => {
    await render(<Button testID='button' text='Save' />)

    await act(async () => {
      Notification.hideAll()
    })

    expect(mockContainerCalls.hideAll).toHaveBeenCalledTimes(1)
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

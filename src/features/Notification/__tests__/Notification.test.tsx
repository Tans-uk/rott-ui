import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {formatMessage} from '../../../libs'
import {NotificationComponent} from '../components'
import {NotificationProvider} from '../providers'

const mockProps = {
  title: formatMessage('TEST.WITH.PARAM', {testText: 'Test Title'}),
  description: formatMessage('TEST.WITH.PARAM', {testText: 'Test Description'}),
  mockOnClose: jest.fn(),
  mockOnPress: jest.fn(),
}

describe('Notification -> Custom Component', () => {
  const iconName = 'REMOVE'
  const testId = {
    notificationPressableTestId: 'notification-pressable-test-id',
    descriptionTestId: 'notification-desc-test-id',
    titleTestId: 'notification-title-test-id',
    blurTestId: 'notification-blur-test-id',
  }

  it('notification matches the snapshot on first render', async () => {
    const renderedNotification = await render(
      <NotificationComponent
        variantColor={'info-notification'}
        iconElement={iconName}
        {...mockProps}
      />
    )

    expect(renderedNotification).toMatchSnapshot()
  })

  it('hides the blur while there is no notification', async () => {
    const {blurTestId} = testId
    const {queryByTestId} = await render(<NotificationProvider />)

    const blurElement = queryByTestId(blurTestId)

    expect(blurElement).not.toBeOnTheScreen()
  })

  it('calls the onPress handlers when the notification is tapped', async () => {
    const {notificationPressableTestId} = testId
    const {getByTestId} = await render(
      <NotificationComponent
        variantColor={'info-notification'}
        iconElement={iconName}
        onPress={mockProps.mockOnPress}
        {...mockProps}
      />
    )

    const pressableElement = getByTestId(notificationPressableTestId)
    fireEvent.press(pressableElement)

    expect(mockProps.mockOnPress).toHaveBeenCalled()
    expect(mockProps.mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('shows the title with the given values', async () => {
    const {title} = mockProps
    const {getByText} = await render(
      <NotificationComponent
        variantColor={'info-notification'}
        iconElement={iconName}
        onClose={mockProps.mockOnClose}
        title={title}
      />
    )

    const titleElement = getByText(title)

    expect(titleElement).toBeOnTheScreen()
  })

  it('shows the description with the given values', async () => {
    const {description} = mockProps
    const {getByText} = await render(
      <NotificationComponent
        variantColor={'info-notification'}
        iconElement={iconName}
        onClose={mockProps.mockOnClose}
        description={description}
      />
    )

    const descriptionElement = getByText(description)

    expect(descriptionElement).toBeOnTheScreen()
  })

  it('hides the description when it is not given', async () => {
    const {descriptionTestId} = testId
    const {queryByTestId} = await render(
      <NotificationComponent
        variantColor={'info-notification'}
        iconElement={iconName}
        onClose={mockProps.mockOnClose}
      />
    )

    const descriptionElement = queryByTestId(descriptionTestId)

    expect(descriptionElement).not.toBeOnTheScreen()
  })
})

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

  it('notification ilk render anında snapshot ile eşleşmeli', () => {
    const renderedNotification = render(
      <NotificationComponent
        variantColor={'info-notification'}
        iconElement={iconName}
        {...mockProps}
      />
    )

    expect(renderedNotification).toMatchSnapshot()
  })

  it('notification yokken ekranda blur gözükmemeli', () => {
    const {blurTestId} = testId
    const {queryByTestId} = render(<NotificationProvider />)

    const blurElement = queryByTestId(blurTestId)

    expect(blurElement).not.toBeOnTheScreen()
  })

  it('bildirime tıklandığında onPress fonksiyonları çağırılmalı', () => {
    const {notificationPressableTestId} = testId
    const {getByTestId} = render(
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

  it('title verilen değerler ile ekranda gözükmeli', () => {
    const {title} = mockProps
    const {getByText} = render(
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

  it('description verilen değerler ile ekranda gözükmeli', () => {
    const {description} = mockProps
    const {getByText} = render(
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

  it('description verilmediği zaman ekranda gözükmemeli', () => {
    const {descriptionTestId} = testId
    const {queryByTestId} = render(
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

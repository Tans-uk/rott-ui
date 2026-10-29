import {Notification, notificationRef} from '..'

// Kept apart from Notification.test.tsx on purpose: importing the feature index
// ahead of the render helpers there resolves the provider cycle
// (NotificationProvider imports '..') in an order that leaves RottProvider
// rendering an undefined component. Nothing here renders, so the order is safe.
describe('Notification -> service', () => {
  type Service = NonNullable<typeof notificationRef.current>

  const provider = {
    show: jest.fn(),
    hide: jest.fn(),
    hideAll: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    danger: jest.fn(),
    info: jest.fn(),
  }
  let previous: typeof notificationRef.current

  beforeEach(() => {
    previous = notificationRef.current
    notificationRef.current = provider as unknown as Service
  })

  afterEach(() => {
    notificationRef.current = previous
    jest.clearAllMocks()
  })

  // Each method only forwards to the provider, so a forwarding slip is silent:
  // hideAll once returned provider.hideAll instead of calling it, and closed nothing.
  it('hideAll calls the provider', () => {
    Notification.hideAll()

    expect(provider.hideAll).toHaveBeenCalledTimes(1)
  })

  it('show and hide pass their argument through', () => {
    const notification = {title: 'Title', description: 'Body', variant: 'info'} as const

    Notification.show(notification)
    Notification.hide('toast-id')

    expect(provider.show).toHaveBeenCalledWith(notification)
    expect(provider.hide).toHaveBeenCalledWith('toast-id')
  })

  it.each(['success', 'warning', 'danger', 'info'] as const)(
    '%s passes title, description and onPress through',
    (variant) => {
      const onPress = jest.fn()

      Notification[variant]('Title', 'Body', onPress)

      expect(provider[variant]).toHaveBeenCalledWith('Title', 'Body', onPress)
    }
  )
})

import {Alert} from '@features'
import {render} from 'src/__tests__/utils/testUtils'

describe('Alert component', () => {
  const testId = {
    alertTestId: 'alert-test-id',
    leftIconTestId: 'alert-left-icon',
    rightIconTestId: 'alert-right-icon',
  }

  it('renderlandığında snapshot ile eşleşmeli', () => {
    const alert = render(<Alert text='Test Alert' size='full' variant='warning' />)

    expect(alert).toMatchSnapshot()
  })

  it('renderlandığında ekranda olmalı', () => {
    const {alertTestId} = testId
    const {getByTestId} = render(<Alert text='Test Alert' size='full' variant='warning' />)

    const alertComponent = getByTestId(alertTestId)

    expect(alertComponent).toBeOnTheScreen()
  })

  it('left icon ve text alanı olmalı', () => {
    const {alertTestId, leftIconTestId} = testId
    const {getByTestId} = render(
      <Alert text='Test Alert' size='full' variant='warning' leftIcon={{name: 'WARNING'}} />
    )

    const alertComponent = getByTestId(alertTestId)
    const leftIconComponent = getByTestId(leftIconTestId)

    expect(alertComponent).toBeOnTheScreen()
    expect(leftIconComponent).toBeOnTheScreen()
  })

  it('left icon ekranda olmamalı', () => {
    const {alertTestId, leftIconTestId} = testId
    const {queryByTestId, getByTestId} = render(
      <Alert text='Test Alert' size='full' variant='warning' />
    )

    const alertComponent = getByTestId(alertTestId)
    const leftIconComponent = queryByTestId(leftIconTestId)

    expect(alertComponent).toBeOnTheScreen()
    expect(leftIconComponent).not.toBeOnTheScreen()
  })

  it('right icon ve text alanı olmalı', () => {
    const {alertTestId, rightIconTestId} = testId
    const {getByTestId} = render(
      <Alert text='Test Alert' size='full' variant='warning' rightIcon={{name: 'WARNING'}} />
    )

    const alertComponent = getByTestId(alertTestId)
    const rightIconComponent = getByTestId(rightIconTestId)

    expect(alertComponent).toBeOnTheScreen()
    expect(rightIconComponent).toBeOnTheScreen()
  })

  it('right icon ekranda olmamalı', () => {
    const {alertTestId, rightIconTestId} = testId
    const {queryByTestId, getByTestId} = render(
      <Alert text='Test Alert' size='full' variant='warning' />
    )

    const alertComponent = getByTestId(alertTestId)
    const rightIconComponent = queryByTestId(rightIconTestId)

    expect(alertComponent).toBeOnTheScreen()
    expect(rightIconComponent).not.toBeOnTheScreen()
  })

  it('left ve right icon alanları olmalı', () => {
    const {alertTestId, leftIconTestId, rightIconTestId} = testId
    const {getByTestId} = render(
      <Alert
        text='Test Alert'
        size='full'
        variant='warning'
        leftIcon={{name: 'WARNING'}}
        rightIcon={{name: 'WARNING'}}
      />
    )

    const alertComponent = getByTestId(alertTestId)
    const leftIconComponent = getByTestId(leftIconTestId)
    const rightIconComponent = getByTestId(rightIconTestId)

    expect(alertComponent).toBeOnTheScreen()
    expect(leftIconComponent).toBeOnTheScreen()
    expect(rightIconComponent).toBeOnTheScreen()
  })
})

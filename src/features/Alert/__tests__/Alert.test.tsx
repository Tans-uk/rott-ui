import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {Alert} from '../components'

describe('Alert component', () => {
  const testId = {
    alertTestId: 'alert-test-id',
    leftIconTestId: 'alert-left-icon',
    rightIconTestId: 'alert-right-icon',
  }

  it('renderlandığında snapshot ile eşleşmeli', async () => {
    const alert = await render(<Alert text='Test Alert' size='full' variant='warning' />)

    expect(alert).toMatchSnapshot()
  })

  it('renderlandığında ekranda olmalı', async () => {
    const {alertTestId} = testId
    const {getByTestId} = await render(<Alert text='Test Alert' size='full' variant='warning' />)

    const alertComponent = getByTestId(alertTestId)

    expect(alertComponent).toBeOnTheScreen()
  })

  it('left icon ve text alanı olmalı', async () => {
    const {alertTestId, leftIconTestId} = testId
    const {getByTestId} = await render(
      <Alert text='Test Alert' size='full' variant='warning' leftIcon={{name: 'warning-error'}} />
    )

    const alertComponent = getByTestId(alertTestId)
    const leftIconComponent = getByTestId(leftIconTestId)

    expect(alertComponent).toBeOnTheScreen()
    expect(leftIconComponent).toBeOnTheScreen()
  })

  it('left icon ekranda olmamalı', async () => {
    const {alertTestId, leftIconTestId} = testId
    const {queryByTestId, getByTestId} = await render(
      <Alert text='Test Alert' size='full' variant='warning' />
    )

    const alertComponent = getByTestId(alertTestId)
    const leftIconComponent = queryByTestId(leftIconTestId)

    expect(alertComponent).toBeOnTheScreen()
    expect(leftIconComponent).not.toBeOnTheScreen()
  })

  it('right icon ve text alanı olmalı', async () => {
    const {alertTestId, rightIconTestId} = testId
    const {getByTestId} = await render(
      <Alert text='Test Alert' size='full' variant='warning' rightIcon={{name: 'warning-error'}} />
    )

    const alertComponent = getByTestId(alertTestId)
    const rightIconComponent = getByTestId(rightIconTestId)

    expect(alertComponent).toBeOnTheScreen()
    expect(rightIconComponent).toBeOnTheScreen()
  })

  it('right icon ekranda olmamalı', async () => {
    const {alertTestId, rightIconTestId} = testId
    const {queryByTestId, getByTestId} = await render(
      <Alert text='Test Alert' size='full' variant='warning' />
    )

    const alertComponent = getByTestId(alertTestId)
    const rightIconComponent = queryByTestId(rightIconTestId)

    expect(alertComponent).toBeOnTheScreen()
    expect(rightIconComponent).not.toBeOnTheScreen()
  })

  it('left ve right icon alanları olmalı', async () => {
    const {alertTestId, leftIconTestId, rightIconTestId} = testId
    const {getByTestId} = await render(
      <Alert
        text='Test Alert'
        size='full'
        variant='warning'
        leftIcon={{name: 'warning-error'}}
        rightIcon={{name: 'warning-error'}}
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

import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {TimerComponent} from '../components'

describe('Timer -> Custom Component', () => {
  const timerInitialTime = 180

  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('timer ilk render anında snapshot ile eşleşmeli', async () => {
    const renderedTimer = await render(<TimerComponent time={timerInitialTime} />)

    expect(renderedTimer).toMatchSnapshot()
  })

  it('verilen time doğru renderlanmalı', async () => {
    const {getByTestId} = await render(<TimerComponent time={timerInitialTime} />)

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
  })
})

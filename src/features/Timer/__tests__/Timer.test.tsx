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

  it('timer matches the snapshot on first render', async () => {
    const renderedTimer = await render(<TimerComponent time={timerInitialTime} />)

    expect(renderedTimer).toMatchSnapshot()
  })

  it('renders the given time correctly', async () => {
    const {getByTestId} = await render(<TimerComponent time={timerInitialTime} />)

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
  })
})

import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {Content} from '../components'

describe('Content -> Custom Component', () => {
  const testId = {
    keyboardAvoidingViewTestId: 'keyboard-avoiding-view-test-id',
  }

  it('matches the snapshot on first render', async () => {
    const rendered = await render(<Content />)

    expect(rendered).toMatchSnapshot()
  })

  it('hides the keyboard avoiding view by default', async () => {
    const {keyboardAvoidingViewTestId} = testId
    const {queryByTestId} = await render(<Content />)

    const keyboardAvoidingViewElement = queryByTestId(keyboardAvoidingViewTestId)

    expect(keyboardAvoidingViewElement).not.toBeTruthy()
  })

  it('renders the keyboard avoiding view when it is given', async () => {
    const {keyboardAvoidingViewTestId} = testId
    const {getByTestId} = await render(<Content keyboardAvoidingView />)

    const keyboardAvoidingViewElement = getByTestId(keyboardAvoidingViewTestId)

    expect(keyboardAvoidingViewElement).toBeTruthy()
  })
})

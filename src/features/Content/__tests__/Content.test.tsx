import React from 'react'
import {render} from '../../../__tests__/utils/testUtils'
import {Content} from '../components'

describe('Content -> Custom Component', () => {
  const testId = {
    keyboardAvoidingViewTestId: 'keyboard-avoiding-view-test-id',
  }

  it('ilk render anında snapshot ile eşleşmeli', async () => {
    const rendered = await render(<Content />)

    expect(rendered).toMatchSnapshot()
  })

  it('keyboard avoiding view varsayilan ekranda olmamali', async () => {
    const {keyboardAvoidingViewTestId} = testId
    const {queryByTestId} = await render(<Content />)

    const keyboardAvoidingViewElement = queryByTestId(keyboardAvoidingViewTestId)

    expect(keyboardAvoidingViewElement).not.toBeTruthy()
  })

  it('keyboardAvoidingView verildiginde renderlanmali', async () => {
    const {keyboardAvoidingViewTestId} = testId
    const {getByTestId} = await render(<Content keyboardAvoidingView />)

    const keyboardAvoidingViewElement = getByTestId(keyboardAvoidingViewTestId)

    expect(keyboardAvoidingViewElement).toBeTruthy()
  })
})

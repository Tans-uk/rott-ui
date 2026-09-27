import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {EmailInput} from '../components/EmailInput'

describe('Email Input -> Custom Input', () => {
  const emailInputTestId = 'email-input-test-id'

  it('shows the new value when the value prop changes', async () => {
    const {getByTestId, rerenderAsync} = await render(
      <EmailInput name='email' value='old@example.com' />
    )

    await rerenderAsync(<EmailInput name='email' value='' />)

    expect(getByTestId(emailInputTestId)).toHaveProp('value', '')
  })

  it('keeps its own state when no value prop is given', async () => {
    const onChangeText = jest.fn()
    const {getByTestId} = await render(<EmailInput name='email' onChangeText={onChangeText} />)

    fireEvent.changeText(getByTestId(emailInputTestId), 'new@example.com')

    expect(getByTestId(emailInputTestId)).toHaveProp('value', 'new@example.com')
    expect(onChangeText).toHaveBeenCalledWith('new@example.com')
  })
})

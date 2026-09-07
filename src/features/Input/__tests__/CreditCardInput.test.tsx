import React from 'react'

import {fireEvent, render, userEvent, waitFor} from '../../../__tests__/utils/testUtils'
import {CreditCardInput} from '../components'

describe('CreditCard Input -> Custom Input', () => {
  const creditCartInputTestId = 'input-test-id'

  it('matches the snapshot on first render', async () => {
    const renderedInput = await render(
      <CreditCardInput name='test' testID={creditCartInputTestId} />
    )

    expect(renderedInput).toMatchSnapshot()
  })

  it('accepts only numeric input', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <CreditCardInput name='test' testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const creditCardInputElement = getByTestId(creditCartInputTestId)
      fireEvent.changeText(creditCardInputElement, 'q*_!`~d$r4444333322221111')

      expect(onChangeTextMock).toHaveBeenCalledWith('4444333322221111')
    })
  })

  // TODO: bu test kontrol edilecek
  // it('credit card inputu maksimum 16 karakter kabul etmeli', async () => {
  //   const onChangeTextMock = jest.fn()
  //   const user = userEvent.setup()
  //   const {getByTestId, rerender} = await render(
  //     <CreditCardInput name='test' testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
  //   )

  //   const creditCardInputElement = getByTestId(creditCartInputTestId)
  //   await user.paste(creditCardInputElement, '444433332222111100')

  //   await rerenderAsync(<CreditCardInput name='test' testID={creditCartInputTestId} onChangeText={onChangeTextMock} />)

  //   expect(creditCardInputElement.props.value).toBe('4444-3333-2222-1111')
  // })

  it('returns the credit card value unmasked', async () => {
    const onChangeTextMock = jest.fn()
    const user = userEvent.setup()
    const {getByTestId} = await render(
      <CreditCardInput name='test' testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
    )

    const creditCardInputElement = getByTestId(creditCartInputTestId)
    await user.paste(creditCardInputElement, '4444-3333-2222-1111')

    expect(onChangeTextMock).toHaveBeenCalledWith('4444333322221111')
  })

  it('leaves the value unchanged when the input contains a non-numeric character.', async () => {
    const onChangeTextMock = jest.fn()
    const user = userEvent.setup()
    const {getByTestId} = await render(
      <CreditCardInput name='test' testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
    )

    const creditCardInputElement = getByTestId(creditCartInputTestId)
    await user.paste(creditCardInputElement, 'q*_!`~d$r4444333322221111')

    expect(onChangeTextMock).not.toHaveBeenCalledWith('q*_!`~d$r4444333322221111')
  })

  it('shows the number-pad keyboard when the credit card input renders', async () => {
    const {getByTestId} = await render(
      <CreditCardInput name='test' testID={creditCartInputTestId} />
    )
    const creditCardInputElement = getByTestId(creditCartInputTestId)

    expect(creditCardInputElement.props.keyboardType).toBe('number-pad')
  })
})

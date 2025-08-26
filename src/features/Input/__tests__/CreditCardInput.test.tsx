import React from 'react'
import {fireEvent, render, userEvent, waitFor} from '../../../__tests__/utils/testUtils'
import {CreditCardInput} from '../components'

describe('CreditCard Input -> Custom Input', () => {
  const creditCartInputTestId = 'input-test-id'

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<CreditCardInput name='test' testID={creditCartInputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('girilen değer sadece numeric olarak kabul edilmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
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
  //   const {getByTestId, rerender} = render(
  //     <CreditCardInput name='test' testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
  //   )

  //   const creditCardInputElement = getByTestId(creditCartInputTestId)
  //   await user.paste(creditCardInputElement, '444433332222111100')

  //   rerender(<CreditCardInput name='test' testID={creditCartInputTestId} onChangeText={onChangeTextMock} />)

  //   expect(creditCardInputElement.props.value).toBe('4444-3333-2222-1111')
  // })

  it('credit card inputu girilen degeri maskesiz geri donmeli', async () => {
    const onChangeTextMock = jest.fn()
    const user = userEvent.setup()
    const {getByTestId} = render(
      <CreditCardInput name='test' testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
    )

    const creditCardInputElement = getByTestId(creditCartInputTestId)
    await user.paste(creditCardInputElement, '4444-3333-2222-1111')

    expect(onChangeTextMock).toHaveBeenCalledWith('4444333322221111')
  })

  it('girilen değer numaradan başka bir karakter içeriyorsa değer değişmemeli.', async () => {
    const onChangeTextMock = jest.fn()
    const user = userEvent.setup()
    const {getByTestId} = render(
      <CreditCardInput name='test' testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
    )

    const creditCardInputElement = getByTestId(creditCartInputTestId)
    await user.paste(creditCardInputElement, 'q*_!`~d$r4444333322221111')

    expect(onChangeTextMock).not.toHaveBeenCalledWith('q*_!`~d$r4444333322221111')
  })

  it('credit card input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<CreditCardInput name='test' testID={creditCartInputTestId} />)
    const creditCardInputElement = getByTestId(creditCartInputTestId)

    expect(creditCardInputElement.props.keyboardType).toBe('number-pad')
  })
})

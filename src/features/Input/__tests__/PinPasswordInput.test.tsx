import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {PinPasswordInput} from '../components'

describe('Pin Password Input -> Custom Input', () => {
  const pinPasswordInputTestId = 'input-test-id'

  it('pin password input ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<PinPasswordInput name='test' testID={pinPasswordInputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('pin password input sadece numeric karakterleri kabul etmeli', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PinPasswordInput
        name='test'
        testID={pinPasswordInputTestId}
        onChangeText={onChangeTextMock}
      />
    )

    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)
    fireEvent.changeText(pinPasswordInputElement, 'aaA*a123')

    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })

  it('pin password input harf ve özel karakter kabul etmemeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PinPasswordInput
        name='test'
        testID={pinPasswordInputTestId}
        onChangeText={onChangeTextMock}
      />
    )

    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)
    await waitFor(() => {
      fireEvent.changeText(pinPasswordInputElement, 'aaA*a123')
    })

    expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })

  it('pin password input ilk renderlandiginda text gorunur olmamali', () => {
    const {getByTestId} = render(<PinPasswordInput name='test' testID={pinPasswordInputTestId} />)

    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)

    expect(pinPasswordInputElement).toHaveProp('secureTextEntry', true)
  })

  it('pin password input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<PinPasswordInput name='test' testID={pinPasswordInputTestId} />)

    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)

    expect(pinPasswordInputElement).toHaveProp('keyboardType', 'number-pad')
  })
})

import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {PasswordInput} from '../components'

describe('Password Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const showPasswordIconTestId = 'show-password-icon-test-id'

  it('password input ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<PasswordInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('password input sadece numeric karakterleri kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PasswordInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a123')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })

  it('password input harf ve özel karakter kabul etmemeli', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PasswordInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    const inputElement = getByTestId(inputTestId)
    fireEvent.changeText(inputElement, 'aaA*a123')

    expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
  })

  it('input ilk renderlandiginda text gorunur olmamali', () => {
    const {getByTestId} = render(<PasswordInput name='test' testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)
  })

  it('input ilk renderlandiginda sifre goster iconu gorunmeli', () => {
    const {getByTestId} = render(<PasswordInput name='test' testID={inputTestId} />)

    const showPasswordIconElement = getByTestId(showPasswordIconTestId)

    expect(showPasswordIconElement).toBeTruthy()

    expect(showPasswordIconElement).toBeOnTheScreen()
  })

  it('input ilk renderlandiginda sifre goster iconuna tiklandiginda sifre gorunur olmali', () => {
    const {getByTestId} = render(<PasswordInput name='test' testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)

    const showPasswordIconElement = getByTestId(showPasswordIconTestId)
    fireEvent.press(showPasswordIconElement)

    expect(inputElement).toHaveProp('secureTextEntry', false)
  })

  it('input sifre gorunurken sifre gizle butonuna tiklandiginda sifre gizlenmeli', () => {
    const {getByTestId} = render(
      <PasswordInput name='test' testID={inputTestId} secureTextEntry={false} />
    )

    const inputElement = getByTestId(inputTestId)

    const showPasswordIconElement = getByTestId(showPasswordIconTestId)
    fireEvent.press(showPasswordIconElement)

    expect(inputElement).toHaveProp('secureTextEntry', true)
  })

  it('input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })

  it('IOS icin yapıştırma özelliği kapatılmalı', () => {
    const {getByTestId} = render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('contextMenuHidden', true)
  })

  it('Android icin yapıştırma özelliği kapatılmalı', () => {
    const {getByTestId} = render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('onSelectionChange')
  })
})

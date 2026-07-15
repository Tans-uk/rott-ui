import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {PasswordInput} from '../components'

describe('Password Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const showPasswordIconTestId = 'input-field-right-icon'
  const leadingIconTestId = 'input-field-left-icon'

  it('password input ilk render anında snapshot ile eşleşmeli', async () => {
    const renderedInput = await render(<PasswordInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('varsayılan olarak metin girişini olduğu gibi kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <PasswordInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a123')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('aaA*a123')
  })

  it('numericOnly verildiğinde yalnızca rakamları kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <PasswordInput name='test' numericOnly testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a123')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })

  it('varsayılan klavye default olmalı', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'default')
  })

  it('numericOnly verildiğinde klavye number-pad olmalı', async () => {
    const {getByTestId} = await render(
      <PasswordInput name='test' numericOnly testID={inputTestId} />
    )
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })

  it('leftIcon verildiğinde leading icon render edilmeli', async () => {
    const {getByTestId} = await render(
      <PasswordInput name='test' testID={inputTestId} leftIcon={{name: 'lock'}} />
    )

    expect(getByTestId(leadingIconTestId)).toBeTruthy()
  })

  it('input ilk renderlandiginda text gorunur olmamali', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)
  })

  it('input ilk renderlandiginda sifre goster iconu gorunmeli', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)

    expect(getByTestId(showPasswordIconTestId)).toBeTruthy()
  })

  it('sifre goster iconuna tiklandiginda sifre gorunur olmali', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)

    fireEvent.press(getByTestId(showPasswordIconTestId))

    expect(inputElement).toHaveProp('secureTextEntry', false)
  })

  it('IOS icin yapıştırma özelliği kapatılmalı', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('contextMenuHidden', true)
  })

  it('Android icin yapıştırma özelliği kapatılmalı', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('onSelectionChange')
  })
})

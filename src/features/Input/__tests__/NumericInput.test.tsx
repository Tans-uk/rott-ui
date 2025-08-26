import React from 'react'
import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {NumericInput} from '../components'

describe('Numeric Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const defaultLabel = 'Test Label'
  const placeHolder = 'Enter Number '

  it('numeric input ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(
      <NumericInput name='test' testID={inputTestId} label={defaultLabel} />
    )

    expect(renderedInput).toMatchSnapshot()
  })

  it('numeric input sadece numeric karakterleri kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <NumericInput
        name='test'
        testID={inputTestId}
        placeholder={placeHolder}
        onChangeText={onChangeTextMock}
        label={defaultLabel}
      />
    )
    const numericInputElement = getByTestId(inputTestId)
    await waitFor(() => {
      fireEvent.changeText(numericInputElement, 'aaA*a123')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })

  it('numeric input harf ve özel karakter kabul etmemeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <NumericInput
        name='test'
        testID={inputTestId}
        placeholder={placeHolder}
        onChangeText={onChangeTextMock}
        label={defaultLabel}
      />
    )
    let numericInputElement = getByTestId(inputTestId)
    await waitFor(() => {
      fireEvent.changeText(numericInputElement, 'aaA*a123')
    })

    numericInputElement = getByTestId(inputTestId)

    expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
  })

  it('input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(
      <NumericInput name='test' testID={inputTestId} label={defaultLabel} />
    )
    const numericInputElement = getByTestId(inputTestId)

    expect(numericInputElement).toHaveProp('keyboardType', 'number-pad')
  })
})

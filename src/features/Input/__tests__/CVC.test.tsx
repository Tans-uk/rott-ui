import React from 'react'
import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {CVCInput} from '../components'

describe('CVC Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const cvcIconTestId = 'info-icon-test-id'

  it('ilk render anında snapshot ile eşleşmeli', async () => {
    const renderedInput = await render(<CVCInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda info iconu gorunmeli', async () => {
    const {queryByTestId} = await render(<CVCInput name='test' testID={inputTestId} />)

    const cvcInputElement = queryByTestId(cvcIconTestId)

    expect(cvcInputElement).not.toBeNull()
  })

  it('ilk renderlandiginda ilk renderlandiginda içerik boş olmalı', async () => {
    const {getByTestId} = await render(<CVCInput name='test' testID={inputTestId} />)

    const cvcInputElement = getByTestId(inputTestId)

    expect(cvcInputElement.props.value).toBeUndefined()
  })

  it('max karakter 3 olmali', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <CVCInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    const cvcInputElement = getByTestId(inputTestId)
    fireEvent.changeText(cvcInputElement, '125552')

    expect(onChangeTextMock).toHaveBeenCalledWith('125')
  })

  it('numerik olmalı', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <CVCInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    let cvcInputElement = getByTestId(inputTestId)
    const testText = '1A2b!'

    fireEvent.changeText(cvcInputElement, testText)

    expect(onChangeTextMock).toHaveBeenCalledWith('12')
  })

  it('cvc input render olduğu zaman klavye olarak number-pad ekranda görülmeli', async () => {
    const {getByTestId} = await render(<CVCInput name='test' testID={inputTestId} />)
    const cvcInputElement = getByTestId(inputTestId)

    expect(cvcInputElement.props.keyboardType).toBe('number-pad')
  })
})

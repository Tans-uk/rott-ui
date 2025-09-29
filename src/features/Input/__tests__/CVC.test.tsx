import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {CVCInput} from '../components'

describe('CVC Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<CVCInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda ilk renderlandiginda içerik boş olmalı', () => {
    const {getByTestId} = render(<CVCInput name='test' testID={inputTestId} />)

    const cvcInputElement = getByTestId(inputTestId)

    expect(cvcInputElement.props.value).toBeUndefined()
  })

  it('max karakter 3 olmali', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <CVCInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    const cvcInputElement = getByTestId(inputTestId)
    fireEvent.changeText(cvcInputElement, '125552')

    expect(onChangeTextMock).toHaveBeenCalledWith('125')
  })

  it('numerik olmalı', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <CVCInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    let cvcInputElement = getByTestId(inputTestId)
    const testText = '1A2b!'

    fireEvent.changeText(cvcInputElement, testText)

    expect(onChangeTextMock).toHaveBeenCalledWith('12')
  })

  it('cvc input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<CVCInput name='test' testID={inputTestId} />)
    const cvcInputElement = getByTestId(inputTestId)

    expect(cvcInputElement.props.keyboardType).toBe('number-pad')
  })
})

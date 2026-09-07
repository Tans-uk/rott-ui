import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {CVCInput} from '../components'

describe('CVC Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const cvcIconTestId = 'info-icon-test-id'

  it('matches the snapshot on first render', async () => {
    const renderedInput = await render(<CVCInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('shows the info icon on first render', async () => {
    const {queryByTestId} = await render(<CVCInput name='test' testID={inputTestId} />)

    const cvcInputElement = queryByTestId(cvcIconTestId)

    expect(cvcInputElement).not.toBeNull()
  })

  it('leaves the content empty on first render', async () => {
    const {getByTestId} = await render(<CVCInput name='test' testID={inputTestId} />)

    const cvcInputElement = getByTestId(inputTestId)

    expect(cvcInputElement.props.value).toBeUndefined()
  })

  it('caps the length at 3 characters', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <CVCInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    const cvcInputElement = getByTestId(inputTestId)
    fireEvent.changeText(cvcInputElement, '125552')

    expect(onChangeTextMock).toHaveBeenCalledWith('125')
  })

  it('is numeric', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <CVCInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    let cvcInputElement = getByTestId(inputTestId)
    const testText = '1A2b!'

    fireEvent.changeText(cvcInputElement, testText)

    expect(onChangeTextMock).toHaveBeenCalledWith('12')
  })

  it('shows the number-pad keyboard when the CVC input renders', async () => {
    const {getByTestId} = await render(<CVCInput name='test' testID={inputTestId} />)
    const cvcInputElement = getByTestId(inputTestId)

    expect(cvcInputElement.props.keyboardType).toBe('number-pad')
  })
})

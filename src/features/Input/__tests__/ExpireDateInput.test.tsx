import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {ExpireDateInput} from '../components'

describe('ExpireDate Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'

  it('matches the snapshot on first render', async () => {
    const renderedInput = await render(<ExpireDateInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('leaves the content empty on first render', async () => {
    const {getByTestId} = await render(<ExpireDateInput name='test' testID={inputTestId} />)

    const expireDateInputElement = getByTestId(inputTestId)

    expect(expireDateInputElement).toHaveProp('value', '')
  })

  it('accepts only digits', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <ExpireDateInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let expireDateInputElement = getByTestId(inputTestId)
    fireEvent.changeText(expireDateInputElement, '12/A*a134')

    expect(onChangeTextMock).not.toHaveBeenCalledWith('12/A*a134')
  })

  it('clamps MM to 12 when an MMYY value carries a month above 12', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <ExpireDateInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let expireDateInputElement = getByTestId(inputTestId)
    fireEvent.changeText(expireDateInputElement, '23')

    expect(onChangeTextMock).toHaveBeenCalledWith('12')
  })

  it('bumps YY to the current year when the MMYY value is in the past', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <ExpireDateInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let expireDateInputElement = getByTestId(inputTestId)
    fireEvent.changeText(expireDateInputElement, '10/15')

    const currentYY = new Date().getFullYear() % 100
    expect(onChangeTextMock).toHaveBeenCalledWith(`10${currentYY}`)
  })

  it('returns the answer in MMYY form', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <ExpireDateInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let expireDateInputElement = getByTestId(inputTestId)
    fireEvent.changeText(expireDateInputElement, '09/28')

    expect(onChangeTextMock).toHaveBeenCalledWith('0928')
  })

  it('shows the number-pad keyboard when the expiry date input renders', async () => {
    const {getByTestId} = await render(<ExpireDateInput name='test' testID={inputTestId} />)

    const expireDateInputElement = getByTestId(inputTestId)

    expect(expireDateInputElement.props.keyboardType).toBe('number-pad')
  })
})

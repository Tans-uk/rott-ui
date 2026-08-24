import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {PinPasswordInput} from '../components'

describe('Pin Password Input -> Custom Input', () => {
  const pinPasswordInputTestId = 'input-test-id'

  it('pin password input matches the snapshot on first render', async () => {
    const renderedInput = await render(
      <PinPasswordInput name='test' testID={pinPasswordInputTestId} />
    )

    expect(renderedInput).toMatchSnapshot()
  })

  it('accepts only digits in the PIN password input', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
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

  it('rejects letters and special characters in the PIN password input', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
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

  it('hides the text on the PIN password input first render', async () => {
    const {getByTestId} = await render(
      <PinPasswordInput name='test' testID={pinPasswordInputTestId} />
    )

    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)

    expect(pinPasswordInputElement).toHaveProp('secureTextEntry', true)
  })

  it('shows the number-pad keyboard when the PIN password input renders', async () => {
    const {getByTestId} = await render(
      <PinPasswordInput name='test' testID={pinPasswordInputTestId} />
    )

    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)

    expect(pinPasswordInputElement).toHaveProp('keyboardType', 'number-pad')
  })
})

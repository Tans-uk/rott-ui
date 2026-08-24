import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {PlateNumberInput} from '../components'

describe('Plate Number Input -> Custom Input', () => {
  const plateNumberInputTestId = 'input-test-id'

  it('plate number input matches the snapshot on first render', async () => {
    const renderedInput = await render(
      <PlateNumberInput name='test' testID={plateNumberInputTestId} />
    )

    expect(renderedInput).toMatchSnapshot()
  })

  it('accepts digits and uppercase letters in the plate number input', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <PlateNumberInput
        name='test'
        testID={plateNumberInputTestId}
        onChangeText={onChangeTextMock}
      />
    )

    const plateNumberInputElement = getByTestId(plateNumberInputTestId)
    fireEvent.changeText(plateNumberInputElement, 'abc*D123')

    expect(onChangeTextMock).toHaveBeenCalledWith('ABCD123')
  })

  it('rejects lowercase letters and special characters in the plate number input', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <PlateNumberInput
        name='test'
        testID={plateNumberInputTestId}
        onChangeText={onChangeTextMock}
      />
    )

    await waitFor(() => {
      const plateNumberInputElement = getByTestId(plateNumberInputTestId)
      fireEvent.changeText(plateNumberInputElement, 'abc*D123')
    })

    expect(onChangeTextMock).not.toHaveBeenCalledWith('ABc*D123')
  })

  it('shows the default keyboard when the plate number input renders', async () => {
    const {getByTestId} = await render(
      <PlateNumberInput name='test' testID={plateNumberInputTestId} />
    )
    const plateNumberInputElement = getByTestId(plateNumberInputTestId)

    expect(plateNumberInputElement.props.keyboardType).toBe('default')
  })

  it('trims spaces and accepts uppercase when a copied plate number is pasted', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <PlateNumberInput
        name='test'
        testID={plateNumberInputTestId}
        onChangeText={onChangeTextMock}
      />
    )

    await waitFor(() => {
      const plateNumberInputElement = getByTestId(plateNumberInputTestId)
      fireEvent.changeText(plateNumberInputElement, 'Abc 1234')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('ABC1234')
  })
})

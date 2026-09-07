import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {PhoneInput} from '../components'

describe('Phone Input -> Custom Input', () => {
  const testId = {
    inputTestId: 'phone-input-test-id',
    iconTestId: 'input-field-right-icon',
    contactPressableTestId: 'input-field-right-icon',
  }

  it('phone input matches the snapshot on first render', async () => {
    const {inputTestId} = testId
    const renderedPhoneInput = await render(<PhoneInput name='test' testID={inputTestId} />)

    expect(renderedPhoneInput).toMatchSnapshot()
  })

  it('leaves the content empty on first render', async () => {
    const {inputTestId} = testId
    const {getByTestId} = await render(<PhoneInput name='test' testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('value', '')
  })

  it('rejects letters and special characters in the phone input', async () => {
    const {inputTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <PhoneInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    const inputElement = getByTestId(inputTestId)
    fireEvent.changeText(inputElement, 'aaA*a123')

    expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
  })

  it('shows the contacts icon by default', async () => {
    const {inputTestId, iconTestId} = testId
    const {getByTestId} = await render(<PhoneInput name='test' testID={inputTestId} />)

    const iconElement = getByTestId(iconTestId)

    expect(iconElement).toBeOnTheScreen()
  })

  describe('when a copied phone number is pasted', () => {
    it('trims whitespace', async () => {
      const {inputTestId} = testId
      const onChangeTextMock = jest.fn()
      const {getByTestId} = await render(
        <PhoneInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a 123')

      expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
    })

    it('reaches the correct format when the pasted value starts with +90', async () => {
      const {inputTestId} = testId
      const onChangeTextMock = jest.fn()
      const {getByTestId} = await render(
        <PhoneInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, '+90543')

      expect(onChangeTextMock).toHaveBeenCalledWith('0543')
    })
  })
})

import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {IbanInput} from '../components'

describe('IBAN Input -> Custom Input', () => {
  const inputTestId = 'iban-input-test-id'
  const rightIconTestId = 'input-field-right-icon'

  it('matches the snapshot on first render', async () => {
    const renderedInput = await render(<IbanInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('leaves the content empty on first render', async () => {
    const {getByTestId} = await render(<IbanInput name='test' testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('value', '')
  })

  it('runs the QR handler instead of clearing when the right icon is pressed with empty content', async () => {
    const onChangeTextMock = jest.fn()
    const rightIconOnPressMock = jest.fn()
    const {getByTestId} = await render(
      <IbanInput
        name='test'
        testID={inputTestId}
        value=''
        onChangeText={onChangeTextMock}
        rightIcon={{name: 'qr-iban', onPress: rightIconOnPressMock}}
      />
    )

    fireEvent.press(getByTestId(rightIconTestId))

    expect(rightIconOnPressMock).toHaveBeenCalled()
    expect(onChangeTextMock).not.toHaveBeenCalledWith('TR')
  })

  it('runs the QR handler when the right icon is pressed and the value is only TR', async () => {
    const onChangeTextMock = jest.fn()
    const rightIconOnPressMock = jest.fn()
    const {getByTestId} = await render(
      <IbanInput
        name='test'
        testID={inputTestId}
        value='TR'
        onChangeText={onChangeTextMock}
        rightIcon={{name: 'qr-iban', onPress: rightIconOnPressMock}}
      />
    )

    fireEvent.press(getByTestId(rightIconTestId))

    expect(rightIconOnPressMock).toHaveBeenCalled()
    expect(onChangeTextMock).not.toHaveBeenCalledWith('TR')
  })

  it('resets the content to TR when the right icon is pressed with a value present', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <IbanInput name='test' testID={inputTestId} value='TR123' onChangeText={onChangeTextMock} />
    )

    fireEvent.press(getByTestId(rightIconTestId))

    expect(onChangeTextMock).toHaveBeenCalledWith('TR')
  })

  it('does not clear on right icon press while disabled, even with a value present', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <IbanInput
        name='test'
        testID={inputTestId}
        value='TR123'
        disabled
        onChangeText={onChangeTextMock}
      />
    )

    fireEvent.press(getByTestId(rightIconTestId))

    expect(onChangeTextMock).not.toHaveBeenCalledWith('TR')
  })

  it('renders the leading icon when leftIcon is given', async () => {
    const {getByTestId} = await render(
      <IbanInput name='test' testID={inputTestId} leftIcon={{name: 'qr-iban'}} />
    )

    expect(getByTestId('input-field-left-icon')).toBeTruthy()
  })

  it('accepts only digits after the leading TR', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'A*a123 334--34')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('TR12333434')
  })

  describe('when a copied IBAN is pasted', () => {
    it('trims whitespace', async () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = await render(
        <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const inputElement = getByTestId(inputTestId)
        fireEvent.changeText(inputElement, 'aaA*a   123')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('TR123')
    })

    it('prefixes TR to a digits-only value to reach the correct format', async () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = await render(
        <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const inputElement = getByTestId(inputTestId)
        fireEvent.changeText(inputElement, '123')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('TR123')
    })

    it('reaches the correct format when the pasted value starts with TR', async () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = await render(
        <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const inputElement = getByTestId(inputTestId)
        fireEvent.changeText(inputElement, 'TR99 8888 7777 6666 5555 4444 33')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('TR998888777766665555444433')
    })

    it('reaches the correct format when the pasted value has no TR', async () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = await render(
        <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const inputElement = getByTestId(inputTestId)
        fireEvent.changeText(inputElement, '99 8888 7777 6666 5555 4444 33')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('TR998888777766665555444433')
    })
  })

  it('shows the number-pad keyboard when the IBAN input renders', async () => {
    const {getByTestId} = await render(<IbanInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })
})

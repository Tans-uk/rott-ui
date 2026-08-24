import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {PasswordInput} from '../components'

describe('Password Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const showPasswordIconTestId = 'input-field-right-icon'
  const leadingIconTestId = 'input-field-left-icon'

  it('password input matches the snapshot on first render', async () => {
    const renderedInput = await render(<PasswordInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('accepts typed text as-is by default', async () => {
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

  it('accepts only digits when numericOnly is given', async () => {
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

  it('uses the default keyboard', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'default')
  })

  it('uses the number-pad keyboard when numericOnly is given', async () => {
    const {getByTestId} = await render(
      <PasswordInput name='test' numericOnly testID={inputTestId} />
    )
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })

  it('renders the leading icon when leftIcon is given', async () => {
    const {getByTestId} = await render(
      <PasswordInput name='test' testID={inputTestId} leftIcon={{name: 'lock'}} />
    )

    expect(getByTestId(leadingIconTestId)).toBeTruthy()
  })

  it('hides the text on the input first render', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)
  })

  it('shows the reveal-password icon on first render', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)

    expect(getByTestId(showPasswordIconTestId)).toBeTruthy()
  })

  it('reveals the password when the reveal icon is tapped', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)

    fireEvent.press(getByTestId(showPasswordIconTestId))

    expect(inputElement).toHaveProp('secureTextEntry', false)
  })

  it('disables paste on iOS', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('contextMenuHidden', true)
  })

  it('disables paste on Android', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('onSelectionChange')
  })
})

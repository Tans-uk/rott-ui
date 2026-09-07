import React from 'react'

import {render, userEvent} from '../../../__tests__/utils/testUtils'
import {StatementInput} from '../components'

describe('Statement Input -> Custom Input', () => {
  const testId = 'statement-input-test-id'

  it('matches the snapshot on first render', async () => {
    // Arrange
    const renderedInput = await render(<StatementInput name='test' />)

    // Assert
    expect(renderedInput).toMatchSnapshot()
  })

  it('renders the given value as-is', async () => {
    // Arrange
    const {getByTestId} = await render(<StatementInput name='test' value={''} />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    // TODO: install the newer matchers and use toHaveDisplayValue instead of toHaveProp
    expect(inputElement).toHaveProp('value', '')
  })

  it('does not accept input beyond the given maximum length', async () => {
    // Arrange
    const maxLengthLimit = 10
    const user = userEvent.setup()
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <StatementInput name='test' maxLength={maxLengthLimit} onChangeText={onChangeTextMock} />
    )

    // Act
    const inputElement = getByTestId(testId)
    await user.type(inputElement, 'a'.repeat(maxLengthLimit + 1))

    // Assert
    expect(onChangeTextMock).toHaveBeenCalledTimes(maxLengthLimit)
  })

  it('does not exceed the maximum length when text is pasted', async () => {
    // Arrange
    const maxLengthLimit = 10
    const user = userEvent.setup()
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <StatementInput name='test' maxLength={maxLengthLimit} onChangeText={onChangeTextMock} />
    )

    // Act
    const inputElement = getByTestId(testId)
    await user.paste(inputElement, 'a'.repeat(maxLengthLimit + 10))

    // Assert
    expect(onChangeTextMock).toHaveBeenCalledWith('a'.repeat(maxLengthLimit))
  })

  it('supports the disabled state', async () => {
    // Arrange
    const {getByTestId} = await render(<StatementInput name='test' disabled />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    // TODO: recheck once the newer matchers land, since toBeDisabled changes behaviour
    expect(inputElement).toBeDisabled()
  })

  it('supports the readOnly state', async () => {
    // Arrange
    const {getByTestId} = await render(<StatementInput name='test' readOnly />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    expect(inputElement).toHaveProp('readOnly', true)
  })

  it('accepts only letters, digits, spaces, full stops, commas, hyphens and slashes', async () => {
    // Arrange
    const text = '<>[]*?_^`|%=&{}`'
    const user = userEvent.setup()
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <StatementInput name='test' onChangeText={onChangeTextMock} />
    )

    // Act
    const inputElement = getByTestId(testId)
    await user.type(inputElement, text)

    // Assert
    expect(onChangeTextMock).toHaveBeenNthCalledWith(1, '')
    expect(onChangeTextMock).toHaveBeenLastCalledWith('')
  })
})

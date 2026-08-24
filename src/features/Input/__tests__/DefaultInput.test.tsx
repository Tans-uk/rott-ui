import React from 'react'

import {render, userEvent} from '../../../__tests__/utils/testUtils'
import {DefaultInput} from '../components'

// Mock Icon to preserve variant/color for testing
jest.mock('../../Icon', () => ({
  Icon: React.forwardRef((props: any, ref: any) => {
    const React = require('react')
    const {View, Text} = require('react-native')

    return React.createElement(
      View,
      {ref, ...props},
      React.createElement(Text, {testID: 'icon-content'}, 'Icon')
    )
  }),
}))

describe('Default Input -> Custom Input', () => {
  const testId = 'default-input-test-id'

  it('matches the snapshot on first render', async () => {
    // Arrange
    const renderedInput = await render(<DefaultInput name='test' testID={testId} />)

    // Assert
    expect(renderedInput).toMatchSnapshot()
  })

  it('renders the given value as-is', async () => {
    // Arrange
    const {getByTestId} = await render(<DefaultInput name='test' testID={testId} value={''} />)

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
      <DefaultInput
        name='test'
        testID={testId}
        maxLength={maxLengthLimit}
        onChangeText={onChangeTextMock}
      />
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
      <DefaultInput
        name='test'
        testID={testId}
        maxLength={maxLengthLimit}
        onChangeText={onChangeTextMock}
      />
    )

    // Act
    const inputElement = getByTestId(testId)
    await user.paste(inputElement, 'a'.repeat(maxLengthLimit + 10))

    // Assert
    expect(onChangeTextMock).toHaveBeenCalledWith('a'.repeat(maxLengthLimit))
  })

  it('accepts only letters, digits, spaces, full stops, commas, hyphens and slashes', async () => {
    // Arrange
    const text = '<>[]*?_^`|%=&{}`,-'
    const user = userEvent.setup()
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <DefaultInput
        name='test'
        testID={testId}
        keyboard='alphanumeric'
        onChangeText={onChangeTextMock}
      />
    )

    // Act
    const inputElement = getByTestId(testId)
    await user.type(inputElement, text)

    // Assert
    expect(onChangeTextMock).toHaveBeenNthCalledWith(1, '')
    expect(onChangeTextMock).toHaveBeenLastCalledWith('')
  })

  it('supports the readOnly state', async () => {
    // Arrange
    const {getByTestId} = await render(<DefaultInput name='test' testID={testId} readOnly />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    expect(inputElement).toHaveProp('readOnly', true)
  })
})

describe('DefaultInput -> leftIcon/rightIcon', () => {
  it('renders the left slot when leftIcon is given', async () => {
    const {getByTestId} = await render(
      <DefaultInput name='i1' type='default' leftIcon={{name: 'lock', variant: 'primary'}} />
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
  })

  it('renders leftIcon and rightIcon together', async () => {
    const {getByTestId} = await render(
      <DefaultInput name='i2' type='default' leftIcon={{name: 'lock'}} rightIcon={{name: 'eye'}} />
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
    expect(getByTestId('input-field-right-icon')).toBeTruthy()
  })
})

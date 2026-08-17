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

  it('ilk render anında snapshot ile eşleşmeli', async () => {
    // Arrange
    const renderedInput = await render(<DefaultInput name='test' testID={testId} />)

    // Assert
    expect(renderedInput).toMatchSnapshot()
  })

  it('verilen değeri olduğu gibi render etmeli', async () => {
    // Arrange
    const {getByTestId} = await render(<DefaultInput name='test' testID={testId} value={''} />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    // TODO: toHaveProp yerine yeni matcher'lar yüklenip toHaveDisplayValue kullanılmalı
    expect(inputElement).toHaveProp('value', '')
  })

  it('belirlenen maksimum uzunluktan fazla girdi almamalı', async () => {
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

  it('kopyala/yapıştır yapıldığında maksimum uzunluğu geçmemeli', async () => {
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

  it('sadece harf, nümerik karakter, boşluk, nokta, virgül, tire, eğik çizgi kabul etmeli', async () => {
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

  it('readOnly durumunu desteklemeli', async () => {
    // Arrange
    const {getByTestId} = await render(<DefaultInput name='test' testID={testId} readOnly />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    expect(inputElement).toHaveProp('readOnly', true)
  })
})

describe('DefaultInput -> leftIcon/rightIcon', () => {
  it('leftIcon verilince sol slot render edilir', async () => {
    const {getByTestId} = await render(
      <DefaultInput name='i1' type='default' leftIcon={{name: 'lock', variant: 'primary'}} />
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
  })

  it('leftIcon ve rightIcon birlikte render edilir', async () => {
    const {getByTestId} = await render(
      <DefaultInput name='i2' type='default' leftIcon={{name: 'lock'}} rightIcon={{name: 'eye'}} />
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
    expect(getByTestId('input-field-right-icon')).toBeTruthy()
  })
})

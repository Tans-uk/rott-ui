import React from 'react'

import {Text} from 'react-native'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {InputField} from '../components/InputField'

describe('InputField', () => {
  const child = <Text testID='field-child'>child</Text>

  it('renders no icon when only children are given', async () => {
    const {queryByTestId, getByTestId} = await render(<InputField size='md'>{child}</InputField>)
    expect(getByTestId('field-child')).toBeTruthy()
    expect(queryByTestId('input-field-left-icon')).toBeNull()
    expect(queryByTestId('input-field-right-icon')).toBeNull()
  })

  it('renders the left icon when leftIcon is given', async () => {
    const {getByTestId} = await render(
      <InputField size='md' leftIcon={{name: 'lock'}}>
        {child}
      </InputField>
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
  })

  it('renders the right icon when rightIcon is given', async () => {
    const {getByTestId} = await render(
      <InputField size='md' rightIcon={{name: 'eye'}}>
        {child}
      </InputField>
    )
    expect(getByTestId('input-field-right-icon')).toBeTruthy()
  })

  it('makes the icon pressable and calls onPress when it is given', async () => {
    const onPress = jest.fn()
    const {getByTestId} = await render(
      <InputField size='md' rightIcon={{name: 'eye', onPress}}>
        {child}
      </InputField>
    )
    fireEvent.press(getByTestId('input-field-right-icon'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('gives an icon slot with onPress the button accessibility role', async () => {
    const onPress = jest.fn()
    const {getByTestId} = await render(
      <InputField size='md' rightIcon={{name: 'eye', onPress}}>
        {child}
      </InputField>
    )
    expect(getByTestId('input-field-right-icon')).toHaveProp('accessibilityRole', 'button')
  })
})

import React from 'react'
import {Text} from 'react-native'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {InputField} from '../components/InputField'

describe('InputField', () => {
  const child = <Text testID='field-child'>child</Text>

  it('sadece children verilince ikon render etmez', async () => {
    const {queryByTestId, getByTestId} = await render(<InputField size='md'>{child}</InputField>)
    expect(getByTestId('field-child')).toBeTruthy()
    expect(queryByTestId('input-field-left-icon')).toBeNull()
    expect(queryByTestId('input-field-right-icon')).toBeNull()
  })

  it('leftIcon verilince sol ikon render eder', async () => {
    const {getByTestId} = await render(
      <InputField size='md' leftIcon={{name: 'lock'}}>{child}</InputField>
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
  })

  it('rightIcon verilince sağ ikon render eder', async () => {
    const {getByTestId} = await render(
      <InputField size='md' rightIcon={{name: 'eye'}}>{child}</InputField>
    )
    expect(getByTestId('input-field-right-icon')).toBeTruthy()
  })

  it('onPress verilince ikon tıklanabilir olur ve çağrılır', async () => {
    const onPress = jest.fn()
    const {getByTestId} = await render(
      <InputField size='md' rightIcon={{name: 'eye', onPress}}>{child}</InputField>
    )
    fireEvent.press(getByTestId('input-field-right-icon'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('onPress verilen ikon slotu button erişilebilirlik rolüne sahip olur', async () => {
    const onPress = jest.fn()
    const {getByTestId} = await render(
      <InputField size='md' rightIcon={{name: 'eye', onPress}}>{child}</InputField>
    )
    expect(getByTestId('input-field-right-icon')).toHaveProp('accessibilityRole', 'button')
  })
})

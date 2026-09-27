import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {defaultThemeConfig} from '../../../providers/defaultThemeConfig'
import {Icon} from '../../Icon'
import {AmountInput} from '../components/AmountInput'
import {parseAmountValue} from '../components/AmountInput/utils'

describe('Amount Input -> Custom Input', () => {
  it('emits the same value when it mounts with a value it emitted', async () => {
    const onChangeText = jest.fn()
    await render(<AmountInput name='amount' value='1234.50' onChangeText={onChangeText} />)

    expect(onChangeText).toHaveBeenLastCalledWith('1234.50')
  })

  it('still reads a Turkish-formatted value', async () => {
    const onChangeText = jest.fn()
    await render(<AmountInput name='amount' value='1.234,50' onChangeText={onChangeText} />)

    expect(onChangeText).toHaveBeenLastCalledWith('1234.50')
  })

  it('asks for the currency icon under a key the icon set has', async () => {
    const {UNSAFE_getAllByType} = await render(<AmountInput name='amount' currencyType='EUR' />)
    const iconNames = UNSAFE_getAllByType(Icon).map((icon) => icon.props.name)

    expect(iconNames).toContain('euro')
    expect(defaultThemeConfig.icons).toHaveProperty('euro')
  })
})

describe('parseAmountValue', () => {
  it.each([
    [undefined, {amount: '', currency: ''}],
    ['1234.50', {amount: '1.234', currency: '50'}],
    ['1234.5', {amount: '1.234', currency: '5'}],
    ['1.234,50', {amount: '1.234', currency: '50'}],
    ['1234', {amount: '1234', currency: ''}],
  ])('splits %p into the two field texts', (input, expected) => {
    expect(parseAmountValue(input)).toEqual(expected)
  })
})

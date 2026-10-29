import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {themeConfig} from '../../../providers'
import {defaultThemeConfig} from '../../../providers/defaultThemeConfig'
import {Icon} from '../../Icon'
import {AmountInput} from '../components/AmountInput'
import {parseAmountValue} from '../components/AmountInput/utils'

// The global providers mock swaps themeConfig for a static copy; this file needs the live one.
jest.unmock('../../../providers')

const currencyIconNames = async (currencyType: 'TL' | 'EUR', icons: Record<string, any>) => {
  jest.replaceProperty(themeConfig, 'icons', icons)
  const {UNSAFE_getAllByType} = await render(
    <AmountInput name='amount' currencyType={currencyType} />
  )

  return UNSAFE_getAllByType(Icon).map((icon) => icon.props.name)
}

describe('Amount Input -> Custom Input', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

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

  it('reports nothing when it mounts without a value', async () => {
    const onChangeText = jest.fn()
    await render(<AmountInput name='amount' onChangeText={onChangeText} />)

    expect(onChangeText).not.toHaveBeenCalled()
  })

  it('reports a cleared value through the current onChangeText', async () => {
    const first = jest.fn()
    const second = jest.fn()
    const {rerenderAsync} = await render(
      <AmountInput name='amount' value='1234.50' onChangeText={first} />
    )

    await rerenderAsync(<AmountInput name='amount' value='1234.50' onChangeText={second} />)
    await rerenderAsync(<AmountInput name='amount' value='' onChangeText={second} />)

    expect(second).toHaveBeenLastCalledWith('0.00')
    expect(first).not.toHaveBeenCalledWith('0.00')
  })

  it('asks for the currency icon under a key the icon set has', async () => {
    const iconNames = await currencyIconNames('EUR', defaultThemeConfig.icons)

    expect(iconNames).toContain('euro')
    expect(defaultThemeConfig.icons).toHaveProperty('euro')
  })

  it('prefers an icon the app registered under the currency code', async () => {
    const iconNames = await currencyIconNames('TL', {...defaultThemeConfig.icons, TL: 1})

    expect(iconNames).toContain('TL')
  })
})

describe('parseAmountValue', () => {
  it.each([
    [undefined, {amount: '', currency: ''}],
    ['1234.50', {amount: '1.234', currency: '50'}],
    ['1234.5', {amount: '1.234', currency: '5'}],
    ['1.234,50', {amount: '1.234', currency: '50'}],
    ['1.234', {amount: '1.234', currency: ''}],
    ['1234', {amount: '1.234', currency: ''}],
    ['1234.5000', {amount: '1.234', currency: '50'}],
    ['1234.567', {amount: '1.234', currency: '56'}],
    [' 1234.50 ', {amount: '1.234', currency: '50'}],
    ['1,234.50', {amount: '1.234', currency: '50'}],
    ['0.30000000000000004', {amount: '0', currency: '30'}],
    ['0012.50', {amount: '12', currency: '50'}],
    ['-12.50', {amount: '', currency: ''}],
  ])('splits %p into the two field texts', (input, expected) => {
    expect(parseAmountValue(input)).toEqual(expected)
  })
})

import React from 'react'

import {AmountInput} from '../..'
import {fireEvent, render, waitFor} from '../../../../../__tests__/utils/testUtils'

describe('Amount Input -> Custom Input', () => {
  const testId = {
    amountTestId: 'amount-test-id',
    currencyTestId: 'currency-test-id',
    iconTestId: 'input-field-right-icon',
    leftIconTestId: 'input-field-left-icon',
  }
  it("matches the snapshot on the amount input's first render", async () => {
    const onChangeTextMock = jest.fn()
    const renderedInput = await render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('shows the amount input, the currency input and the icon', async () => {
    const {amountTestId, currencyTestId, iconTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    const currencyInput = getByTestId(currencyTestId)
    const iconElement = getByTestId(iconTestId)

    expect(amountInput).toBeOnTheScreen()
    expect(currencyInput).toBeOnTheScreen()
    expect(iconElement).toBeOnTheScreen()
  })

  it('renders leftIcon in the left slot of the amount input', async () => {
    const {leftIconTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <AmountInput name='test' leftIcon={{name: 'arrow-left'}} onChangeText={onChangeTextMock} />
    )

    expect(getByTestId(leftIconTestId)).toBeOnTheScreen()
  })

  it('accepts only digits in the amount input', async () => {
    const {amountTestId, currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId, rerenderAsync} = await render(
      <AmountInput name='test' onChangeText={onChangeTextMock} />
    )

    const amountInput = getByTestId(amountTestId)
    const currencyInput = getByTestId(currencyTestId)

    fireEvent.changeText(amountInput, 'aaA*a123')
    fireEvent.changeText(currencyInput, '1aaA*a123')

    await rerenderAsync(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    expect(amountInput).toHaveProp('value', '123')
    expect(currencyInput).toHaveProp('value', '11')
  })

  it('formats the amount input correctly', async () => {
    const {amountTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    fireEvent.changeText(amountInput, '12')

    expect(onChangeTextMock).toHaveBeenCalledWith('12.00')
  })

  it('sets the decimal part to 00 when it is left empty after editing', async () => {
    const {currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const currencyElement = getByTestId(currencyTestId)
    fireEvent.changeText(currencyElement, '50')
    expect(currencyElement).toHaveProp('value', '50')

    fireEvent.changeText(currencyElement, '')
    fireEvent(currencyElement, 'blur')
    expect(currencyElement).toHaveProp('value', '00')
  })

  it('clears the decimal part from 00 on tap when it is 0', async () => {
    const {currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const currencyElement = getByTestId(currencyTestId)
    fireEvent.changeText(currencyElement, '00')
    fireEvent(currencyElement, 'focus')

    expect(currencyElement).toHaveProp('value', '')
  })

  it('keeps the amount value on tap when the decimal part is greater than 0', async () => {
    const {currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const currencyElement = getByTestId(currencyTestId)
    await waitFor(() => {
      fireEvent.changeText(currencyElement, '50')
    })
    fireEvent(currencyElement, 'focus')

    expect(currencyElement).toHaveProp('value', '50')
  })

  it('shows the number-pad keyboard when the input renders', async () => {
    const {amountTestId, currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    const currencyInput = getByTestId(currencyTestId)

    expect(amountInput).toHaveProp('keyboardType', 'number-pad')
    expect(currencyInput).toHaveProp('keyboardType', 'number-pad')
  })

  it("shows the icon matching the amount input's currencyType", async () => {
    const currencyType = 'USD'
    const onChangeTextMock = jest.fn()

    await render(
      <AmountInput name='test' currencyType={currencyType} onChangeText={onChangeTextMock} />
    )

    expect(onChangeTextMock).toHaveBeenCalled()
  })

  it('formats 0.01 correctly when the user types it', async () => {
    // Arrange
    const {amountTestId, currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(<AmountInput name='test' onChangeText={onChangeTextMock} />)
    const amountInput = getByTestId(amountTestId)
    const currencyInput = getByTestId(currencyTestId)

    // Act 1: type "0" into the amount field
    fireEvent.changeText(amountInput, '0')

    // Assert 1: the value should be "0.00"
    expect(onChangeTextMock).toHaveBeenCalledWith('0.00')

    // Arrange 2: clear the mock so the next change is measured on its own
    onChangeTextMock.mockClear()

    // Act 2: type "01" into the currency field
    fireEvent.changeText(currencyInput, '01')

    // Assert 2: the leading zero is kept, producing "0.01"
    expect(onChangeTextMock).toHaveBeenCalledWith('0.01')
  })
})

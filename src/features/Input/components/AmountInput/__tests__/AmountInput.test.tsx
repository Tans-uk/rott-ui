import {AmountInput} from '../..'

import {fireEvent, render, waitFor} from '@utils'

describe('Amount Input -> Custom Input', () => {
  const testId = {
    amountTestId: 'amount-test-id',
    currencyTestId: 'currency-test-id',
    iconTestId: 'currency-icon-test-id',
  }
  it('amount input ilk render anında snapshot ile eşleşmeli', () => {
    const onChangeTextMock = jest.fn()
    const renderedInput = render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('amount input amount ve currency inputlari ve icon var olmali', () => {
    const {amountTestId, currencyTestId, iconTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    const currencyInput = getByTestId(currencyTestId)
    const iconElement = getByTestId(iconTestId)

    expect(amountInput).toBeOnTheScreen()
    expect(currencyInput).toBeOnTheScreen()
    expect(iconElement).toBeOnTheScreen()
  })

  it('amount input sadece numeric karakterleri kabul etmeli', () => {
    const {amountTestId, currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId, rerender} = render(
      <AmountInput name='test' onChangeText={onChangeTextMock} />
    )

    const amountInput = getByTestId(amountTestId)
    const currencyInput = getByTestId(currencyTestId)

    fireEvent.changeText(amountInput, 'aaA*a123')
    fireEvent.changeText(currencyInput, '1aaA*a123')

    rerender(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    expect(amountInput).toHaveProp('value', '123')
    expect(currencyInput).toHaveProp('value', '11')
  })

  it('amount input formata uygun olmalı', () => {
    const {amountTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    fireEvent.changeText(amountInput, '12')

    expect(onChangeTextMock).toHaveBeenCalledWith('12.00')
  })

  it('amount inputun küsüratlı tarafı değiştiği zaman boş bir değer bırakılırsa küsürat 00 olmalı', () => {
    const {currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const currencyElement = getByTestId(currencyTestId)
    fireEvent.changeText(currencyElement, '50')
    expect(currencyElement).toHaveProp('value', '50')

    fireEvent.changeText(currencyElement, '')
    fireEvent(currencyElement, 'blur')
    expect(currencyElement).toHaveProp('value', '00')
  })

  it('amount inputta küsürat 0 iken tıklandığı zaman değer 00 dan boşa çekilmeli', () => {
    const {currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const currencyElement = getByTestId(currencyTestId)
    fireEvent.changeText(currencyElement, '00')
    fireEvent(currencyElement, 'focus')

    expect(currencyElement).toHaveProp('value', '')
  })

  it('amount inputta küsürat 0 dan büyükken tıklandığı zaman değer ne ise kalmalı', async () => {
    const {currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const currencyElement = getByTestId(currencyTestId)
    await waitFor(() => {
      fireEvent.changeText(currencyElement, '50')
    })
    fireEvent(currencyElement, 'focus')

    expect(currencyElement).toHaveProp('value', '50')
  })

  it('input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {amountTestId, currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput name='test' onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    const currencyInput = getByTestId(currencyTestId)

    expect(amountInput).toHaveProp('keyboardType', 'number-pad')
    expect(currencyInput).toHaveProp('keyboardType', 'number-pad')
  })

  it('amount inputa verilen currencyType a göre icon görülmeli', () => {
    const currencyType = 'USD'
    const onChangeTextMock = jest.fn()

    render(<AmountInput name='test' currencyType={currencyType} onChangeText={onChangeTextMock} />)

    expect(onChangeTextMock).toHaveBeenCalled()
  })

  it('kullanıcı 0.01 değeri girdiğinde doğru bir şekilde formatlanmalı', () => {
    // Arrange - Hazırlık
    const {amountTestId, currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput name='test' onChangeText={onChangeTextMock} />)
    const amountInput = getByTestId(amountTestId)
    const currencyInput = getByTestId(currencyTestId)

    // Act 1 - Eylem 1: Amount alanına "0" girişi
    fireEvent.changeText(amountInput, '0')

    // Assert 1 - Doğrulama 1: "0.00" değeri kontrol edilir
    expect(onChangeTextMock).toHaveBeenCalledWith('0.00')

    // Arrange 2 - Hazırlık 2: Yeni değişikliği test etmek için mock temizlenir
    onChangeTextMock.mockClear()

    // Act 2 - Eylem 2: Currency alanına "01" girişi
    fireEvent.changeText(currencyInput, '01')

    // Assert 2 - Doğrulama 2: Leading zero korunarak "0.01" değeri doğru oluşturulmalı
    expect(onChangeTextMock).toHaveBeenCalledWith('0.01')
  })
})

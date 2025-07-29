import {ExpireDateInput} from '../components'

import {fireEvent, render} from 'src/__tests__/utils/testUtils'

describe('ExpireDate Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<ExpireDateInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda ilk renderlandiginda içerik boş olmalı', () => {
    const {getByTestId} = render(<ExpireDateInput name='test' testID={inputTestId} />)

    const expireDateInputElement = getByTestId(inputTestId)

    expect(expireDateInputElement).toHaveProp('value', '')
  })

  it('sadece numeric karakterleri kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <ExpireDateInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let expireDateInputElement = getByTestId(inputTestId)
    fireEvent.changeText(expireDateInputElement, '12/A*a134')

    expect(onChangeTextMock).not.toHaveBeenCalledWith('12/A*a134')
  })

  it('MMYY formatinda MM 12 den buyuk geldi is 12 ye MM yi 12 ye cevir', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <ExpireDateInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let expireDateInputElement = getByTestId(inputTestId)
    fireEvent.changeText(expireDateInputElement, '23')

    expect(onChangeTextMock).toHaveBeenCalledWith('12')
  })

  it('MMYY formatinda YY suanki tarihten kucuk geldi ise YY yi suanki tarihe cevir', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <ExpireDateInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let expireDateInputElement = getByTestId(inputTestId)
    fireEvent.changeText(expireDateInputElement, '10/15')

    const currentYY = new Date().getFullYear() % 100
    expect(onChangeTextMock).toHaveBeenCalledWith(`10${currentYY}`)
  })

  it('donen cevap MMYY seklinde olmali', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <ExpireDateInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let expireDateInputElement = getByTestId(inputTestId)
    fireEvent.changeText(expireDateInputElement, '09/28')

    expect(onChangeTextMock).toHaveBeenCalledWith('0928')
  })

  it('expire date input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<ExpireDateInput name='test' testID={inputTestId} />)

    const expireDateInputElement = getByTestId(inputTestId)

    expect(expireDateInputElement.props.keyboardType).toBe('number-pad')
  })
})

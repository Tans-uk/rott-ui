import {IbanInput} from '../components'

import {fireEvent, render, waitFor} from '@utils'

describe('IBAN Input -> Custom Input', () => {
  const inputTestId = 'iban-input-test-id'
  const clearIbanIconTestId = 'clear-iban-icon-test-id'
  const ibanIconTestId = 'iban-icon-test-id'

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<IbanInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda ilk renderlandiginda içerik boş olmalı', () => {
    const {getByTestId} = render(<IbanInput name='test' testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('value', '')
  })

  it('ilk renderlandiginda icerik temizleme iconu gorunmemeli', () => {
    const {queryByTestId} = render(<IbanInput name='test' testID={inputTestId} value='' />)

    const clearInputElement = queryByTestId(clearIbanIconTestId)

    expect(clearInputElement).toBeNull()
  })

  // TODO: Varsayilan TR texti yazildigindan bu test gecersiz
  it('içerik boş olduğunda temizleme iconu görünmemeli', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId, queryByTestId} = render(
      <IbanInput name='test' onChangeText={onChangeTextMock} value='TR' />
    )

    const ibanInput = getByTestId('iban-input-test-id')
    expect(ibanInput).toBeTruthy()

    const clearIcon = queryByTestId('clear-iban-icon-test-id')
    expect(clearIcon).toBeNull()

    fireEvent.changeText(ibanInput, '')

    expect(queryByTestId('clear-iban-icon-test-id')).toBeNull()
  })

  it('içerik boş olduğunda temizleme iconu görünmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId, queryByTestId, rerender} = render(
      <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let inputElement = getByTestId(inputTestId)
    await waitFor(() => {
      fireEvent.changeText(inputElement, 'TR123')
    })

    let clearInputElement = getByTestId(clearIbanIconTestId)
    let iconElement = getByTestId(ibanIconTestId)

    expect(clearInputElement).toBeTruthy()
    expect(iconElement).toHaveProp('name', 'REMOVE_CIRCLE')

    expect(onChangeTextMock).toHaveBeenCalledWith('TR123')

    await waitFor(() => {
      inputElement = getByTestId(inputTestId)

      fireEvent.changeText(inputElement, '')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('TR')

    rerender(
      <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} value='TR' />
    )
    let clearInputElement2 = queryByTestId(clearIbanIconTestId)

    expect(clearInputElement2).toBeNull()
  })

  it('TR digerlerinden sonraki degerler sadece numeric karakterleri kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'A*a123 334--34')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('TR12333434')
  })

  describe('kopyalanan IBAN yapıştırıldığında', () => {
    it('Bosluklar trimlenmeli', async () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = render(
        <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const inputElement = getByTestId(inputTestId)
        fireEvent.changeText(inputElement, 'aaA*a   123')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('TR123')
    })
    it('Sadece Sayi gelmisse basina TR getirerek dogru format saglanmali', async () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = render(
        <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const inputElement = getByTestId(inputTestId)
        fireEvent.changeText(inputElement, '123')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('TR123')
    })
    it('yapistirilan degerde TR ile gelmisse dogru format saglanmali', async () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = render(
        <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const inputElement = getByTestId(inputTestId)
        fireEvent.changeText(inputElement, 'TR99 8888 7777 6666 5555 4444 33')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('TR998888777766665555444433')
    })

    it('yapistirilan degerde TR yok ise dogru format saglanmali', async () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = render(
        <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const inputElement = getByTestId(inputTestId)
        fireEvent.changeText(inputElement, '99 8888 7777 6666 5555 4444 33')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('TR998888777766665555444433')
    })
  })

  it('Iban input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<IbanInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })
})

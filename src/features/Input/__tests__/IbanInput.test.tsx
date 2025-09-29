import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {IbanInput} from '../components'

describe('IBAN Input -> Custom Input', () => {
  const testIds = {
    inputTestId: 'iban-input-test-id',
    clearIbanIconTestId: 'clear-iban-icon-test-id',
    ibanIconTestId: 'qr-iban-icon-test-id',
  }

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const {inputTestId} = testIds
    const renderedInput = render(<IbanInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda ilk renderlandiginda içerik boş olmalı', () => {
    const {inputTestId} = testIds
    const {getByTestId} = render(<IbanInput name='test' testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('value', '')
  })

  it('ilk renderlandiginda icerik temizleme iconu gorunmemeli', () => {
    const {inputTestId, clearIbanIconTestId} = testIds
    const {queryByTestId} = render(<IbanInput name='test' testID={inputTestId} value='' />)

    const clearInputElement = queryByTestId(clearIbanIconTestId)

    expect(clearInputElement).toBeNull()
  })

  // TODO: Varsayilan TR texti yazildigindan bu test gecersiz
  it('içerik boş olduğunda temizleme iconu görünmemeli', () => {
    const {inputTestId, clearIbanIconTestId} = testIds
    const onChangeTextMock = jest.fn()
    const {getByTestId, queryByTestId} = render(
      <IbanInput name='test' onChangeText={onChangeTextMock} value='TR' />
    )

    const ibanInput = getByTestId(inputTestId)
    expect(ibanInput).toBeTruthy()

    const clearIcon = queryByTestId(clearIbanIconTestId)
    expect(clearIcon).toBeNull()

    fireEvent.changeText(ibanInput, '')

    expect(queryByTestId(clearIbanIconTestId)).toBeNull()
  })

  it('içerik boş olduğunda temizleme iconu görünmemeli', async () => {
    const {inputTestId, clearIbanIconTestId} = testIds
    const onChangeTextMock = jest.fn()
    const {getByTestId, queryByTestId, rerender} = render(
      <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    let inputElement = getByTestId(inputTestId)
    await waitFor(() => {
      fireEvent.changeText(inputElement, 'TR123')
    })

    let clearInputElement = getByTestId(clearIbanIconTestId)
    expect(clearInputElement).toBeTruthy()
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
    const {inputTestId} = testIds
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
      const {inputTestId} = testIds
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
      const {inputTestId} = testIds
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
      const {inputTestId} = testIds
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
      const {inputTestId} = testIds
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
    const {inputTestId} = testIds
    const {getByTestId} = render(<IbanInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })
})

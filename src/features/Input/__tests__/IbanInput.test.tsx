import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {IbanInput} from '../components'

describe('IBAN Input -> Custom Input', () => {
  const inputTestId = 'iban-input-test-id'
  const rightIconTestId = 'input-field-right-icon'

  it('ilk render anında snapshot ile eşleşmeli', async () => {
    const renderedInput = await render(<IbanInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda ilk renderlandiginda içerik boş olmalı', async () => {
    const {getByTestId} = await render(<IbanInput name='test' testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('value', '')
  })

  it('içerik boşken sağ ikona basıldığında temizleme yapılmamalı, qr fonksiyonu çalışmalı', async () => {
    const onChangeTextMock = jest.fn()
    const rightIconOnPressMock = jest.fn()
    const {getByTestId} = await render(
      <IbanInput
        name='test'
        testID={inputTestId}
        value=''
        onChangeText={onChangeTextMock}
        rightIcon={{name: 'qr-iban', onPress: rightIconOnPressMock}}
      />
    )

    fireEvent.press(getByTestId(rightIconTestId))

    expect(rightIconOnPressMock).toHaveBeenCalled()
    expect(onChangeTextMock).not.toHaveBeenCalledWith('TR')
  })

  it('değer sadece TR iken sağ ikona basıldığında qr fonksiyonu çalışmalı', async () => {
    const onChangeTextMock = jest.fn()
    const rightIconOnPressMock = jest.fn()
    const {getByTestId} = await render(
      <IbanInput
        name='test'
        testID={inputTestId}
        value='TR'
        onChangeText={onChangeTextMock}
        rightIcon={{name: 'qr-iban', onPress: rightIconOnPressMock}}
      />
    )

    fireEvent.press(getByTestId(rightIconTestId))

    expect(rightIconOnPressMock).toHaveBeenCalled()
    expect(onChangeTextMock).not.toHaveBeenCalledWith('TR')
  })

  it('değer varken sağ ikona basıldığında içerik TR olarak temizlenmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <IbanInput name='test' testID={inputTestId} value='TR123' onChangeText={onChangeTextMock} />
    )

    fireEvent.press(getByTestId(rightIconTestId))

    expect(onChangeTextMock).toHaveBeenCalledWith('TR')
  })

  it('disabled iken değer varsa sağ ikona basıldığında temizleme yapılmamalı', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <IbanInput
        name='test'
        testID={inputTestId}
        value='TR123'
        disabled
        onChangeText={onChangeTextMock}
      />
    )

    fireEvent.press(getByTestId(rightIconTestId))

    expect(onChangeTextMock).not.toHaveBeenCalledWith('TR')
  })

  it('leftIcon verildiğinde leading icon render edilmeli', async () => {
    const {getByTestId} = await render(
      <IbanInput name='test' testID={inputTestId} leftIcon={{name: 'qr-iban'}} />
    )

    expect(getByTestId('input-field-left-icon')).toBeTruthy()
  })

  it('TR digerlerinden sonraki degerler sadece numeric karakterleri kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
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
      const {getByTestId} = await render(
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
      const {getByTestId} = await render(
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
      const {getByTestId} = await render(
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
      const {getByTestId} = await render(
        <IbanInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const inputElement = getByTestId(inputTestId)
        fireEvent.changeText(inputElement, '99 8888 7777 6666 5555 4444 33')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('TR998888777766665555444433')
    })
  })

  it('Iban input render olduğu zaman klavye olarak number-pad ekranda görülmeli', async () => {
    const {getByTestId} = await render(<IbanInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })
})

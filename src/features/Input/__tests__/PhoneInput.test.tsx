import React from 'react'
import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {PhoneInput} from '../components'

describe('Phone Input -> Custom Input', () => {
  const testId = {
    inputTestId: 'phone-input-test-id',
    iconTestId: 'input-field-right-icon',
    contactPressableTestId: 'input-field-right-icon',
  }

  it('phone input ilk render anında snapshot ile eşleşmeli', async () => {
    const {inputTestId} = testId
    const renderedPhoneInput = await render(<PhoneInput name='test' testID={inputTestId} />)

    expect(renderedPhoneInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda içerik boş olmalı', async () => {
    const {inputTestId} = testId
    const {getByTestId} = await render(<PhoneInput name='test' testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('value', '')
  })

  it('phone input harf ve özel karakter kabul etmemeli', async () => {
    const {inputTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <PhoneInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    const inputElement = getByTestId(inputTestId)
    fireEvent.changeText(inputElement, 'aaA*a123')

    expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
  })

  it('varsayilan olarak rehber iconu olmalı', async () => {
    const {inputTestId, iconTestId} = testId
    const {getByTestId} = await render(<PhoneInput name='test' testID={inputTestId} />)

    const iconElement = getByTestId(iconTestId)

    expect(iconElement).toBeOnTheScreen()
  })

  describe('kopyalanan phone number yapıştırıldığında', () => {
    it('Bosluklar trimlenmeli', async () => {
      const {inputTestId} = testId
      const onChangeTextMock = jest.fn()
      const {getByTestId} = await render(
        <PhoneInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a 123')

      expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
    })

    it('yapistirilan degerde +90 ile gelmisse dogru format saglanmali', async () => {
      const {inputTestId} = testId
      const onChangeTextMock = jest.fn()
      const {getByTestId} = await render(
        <PhoneInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, '+90543')

      expect(onChangeTextMock).toHaveBeenCalledWith('0543')
    })
  })
})

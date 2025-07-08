import {PhoneInput} from '../components'

import {fireEvent, render} from '@utils'

describe('Phone Input -> Custom Input', () => {
  const testId = {
    inputTestId: 'phone-input-test-id',
    iconTestId: 'phone-icon-test-id',
    contactPressableTestId: 'contact-pressable-test-id',
  }

  it('phone input ilk render anında snapshot ile eşleşmeli', () => {
    const {inputTestId} = testId
    const renderedPhoneInput = render(<PhoneInput name='test' testID={inputTestId} />)

    expect(renderedPhoneInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda içerik boş olmalı', () => {
    const {inputTestId} = testId
    const {getByTestId} = render(<PhoneInput name='test' testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('value', '')
  })

  it('phone input harf ve özel karakter kabul etmemeli', () => {
    const {inputTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PhoneInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    const inputElement = getByTestId(inputTestId)
    fireEvent.changeText(inputElement, 'aaA*a123')

    expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
  })

  it('varsayilan olarak rehber iconu olmalı', () => {
    const {inputTestId, iconTestId} = testId
    const {getByTestId} = render(<PhoneInput name='test' testID={inputTestId} />)

    const iconElement = getByTestId(iconTestId)

    expect(iconElement).toBeOnTheScreen()
  })

  describe('kopyalanan phone number yapıştırıldığında', () => {
    it('Bosluklar trimlenmeli', () => {
      const {inputTestId} = testId
      const onChangeTextMock = jest.fn()
      const {getByTestId} = render(
        <PhoneInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a 123')

      expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
    })

    it('yapistirilan degerde +90 ile gelmisse dogru format saglanmali', () => {
      const {inputTestId} = testId
      const onChangeTextMock = jest.fn()
      const {getByTestId} = render(
        <PhoneInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
      )
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, '+90543')

      expect(onChangeTextMock).toHaveBeenCalledWith('0543')
    })
  })
})

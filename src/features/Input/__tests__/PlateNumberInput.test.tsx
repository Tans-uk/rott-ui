import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {PlateNumberInput} from '../components'

describe('Plate Number Input -> Custom Input', () => {
  const plateNumberInputTestId = 'input-test-id'

  it('plate number input ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<PlateNumberInput name='test' testID={plateNumberInputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('plate number input numeric karakterleri ve buyuk karakterleri kabul etmeli', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PlateNumberInput
        name='test'
        testID={plateNumberInputTestId}
        onChangeText={onChangeTextMock}
      />
    )

    const plateNumberInputElement = getByTestId(plateNumberInputTestId)
    fireEvent.changeText(plateNumberInputElement, 'abc*D123')

    expect(onChangeTextMock).toHaveBeenCalledWith('D123')
  })

  it('plate number input küçük harf ve özel karakter kabul etmemeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PlateNumberInput
        name='test'
        testID={plateNumberInputTestId}
        onChangeText={onChangeTextMock}
      />
    )

    await waitFor(() => {
      const plateNumberInputElement = getByTestId(plateNumberInputTestId)
      fireEvent.changeText(plateNumberInputElement, 'abc*D123')
    })

    expect(onChangeTextMock).not.toHaveBeenCalledWith('ABc*D123')
  })

  it('plate number input render olduğu zaman klavye default olarak ekranda görülmeli', () => {
    const {getByTestId} = render(<PlateNumberInput name='test' testID={plateNumberInputTestId} />)
    const plateNumberInputElement = getByTestId(plateNumberInputTestId)

    expect(plateNumberInputElement.props.keyboardType).toBe('default')
  })

  it('kopyalanan plate number yapıştırıldığında bosluklar trimlenmeli ve buyuk harf kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PlateNumberInput
        name='test'
        testID={plateNumberInputTestId}
        onChangeText={onChangeTextMock}
      />
    )

    await waitFor(() => {
      const plateNumberInputElement = getByTestId(plateNumberInputTestId)
      fireEvent.changeText(plateNumberInputElement, 'Abc 1234')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('A1234')
  })
})

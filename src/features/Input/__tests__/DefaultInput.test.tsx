import {render, userEvent} from '../../../__tests__/utils/testUtils'
import {DefaultInput} from '../components'

describe('Default Input -> Custom Input', () => {
  const testId = 'default-input-test-id'

  it('ilk render anında snapshot ile eşleşmeli', () => {
    // Arrange
    const renderedInput = render(<DefaultInput name='test' testID={testId} />)

    // Assert
    expect(renderedInput).toMatchSnapshot()
  })

  it('verilen değeri olduğu gibi render etmeli', () => {
    // Arrange
    const {getByTestId} = render(<DefaultInput name='test' testID={testId} value={''} />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    // TODO: toHaveProp yerine yeni matcher'lar yüklenip toHaveDisplayValue kullanılmalı
    expect(inputElement).toHaveProp('value', '')
  })

  it('belirlenen maksimum uzunluktan fazla girdi almamalı', async () => {
    // Arrange
    const maxLengthLimit = 10
    const user = userEvent.setup()
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <DefaultInput
        name='test'
        testID={testId}
        maxLength={maxLengthLimit}
        onChangeText={onChangeTextMock}
      />
    )

    // Act
    const inputElement = getByTestId(testId)
    await user.type(inputElement, 'a'.repeat(maxLengthLimit + 1))

    // Assert
    expect(onChangeTextMock).toHaveBeenCalledTimes(maxLengthLimit)
  })

  it('kopyala/yapıştır yapıldığında maksimum uzunluğu geçmemeli', async () => {
    // Arrange
    const maxLengthLimit = 10
    const user = userEvent.setup()
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <DefaultInput
        name='test'
        testID={testId}
        maxLength={maxLengthLimit}
        onChangeText={onChangeTextMock}
      />
    )

    // Act
    const inputElement = getByTestId(testId)
    await user.paste(inputElement, 'a'.repeat(maxLengthLimit + 10))

    // Assert
    expect(onChangeTextMock).toHaveBeenCalledWith('a'.repeat(maxLengthLimit))
  })

  it('sadece harf, nümerik karakter, boşluk, nokta, virgül, tire, eğik çizgi kabul etmeli', async () => {
    // Arrange
    const text = '<>[]*?_^`|%=&{}`,-'
    const user = userEvent.setup()
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <DefaultInput
        name='test'
        testID={testId}
        keyboard='alphanumeric'
        onChangeText={onChangeTextMock}
      />
    )

    // Act
    const inputElement = getByTestId(testId)
    await user.type(inputElement, text)

    // Assert
    expect(onChangeTextMock).toHaveBeenNthCalledWith(1, '')
    expect(onChangeTextMock).toHaveBeenLastCalledWith('')
  })

  it('readOnly durumunu desteklemeli', () => {
    // Arrange
    const {getByTestId} = render(<DefaultInput name='test' testID={testId} readOnly />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    expect(inputElement).toHaveProp('readOnly', true)
  })
})

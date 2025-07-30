import {render, userEvent} from '../../../__tests__/utils/testUtils'
import {StatementInput} from '../components'

describe('Statement Input -> Custom Input', () => {
  const testId = 'statement-input-test-id'

  it('ilk render anında snapshot ile eşleşmeli', () => {
    // Arrange
    const renderedInput = render(<StatementInput name='test' />)

    // Assert
    expect(renderedInput).toMatchSnapshot()
  })

  it('verilen değeri olduğu gibi render etmeli', () => {
    // Arrange
    const {getByTestId} = render(<StatementInput name='test' value={''} />)

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
      <StatementInput name='test' maxLength={maxLengthLimit} onChangeText={onChangeTextMock} />
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
      <StatementInput name='test' maxLength={maxLengthLimit} onChangeText={onChangeTextMock} />
    )

    // Act
    const inputElement = getByTestId(testId)
    await user.paste(inputElement, 'a'.repeat(maxLengthLimit + 10))

    // Assert
    expect(onChangeTextMock).toHaveBeenCalledWith('a'.repeat(maxLengthLimit))
  })

  it('disabled durumunu desteklemeli', () => {
    // Arrange
    const {getByTestId} = render(<StatementInput name='test' disabled />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    // TODO: yeni matcherlar yüklendiğinde toBeDisabled implementasyonu değiştiği için kontrol edilecek
    expect(inputElement).toBeDisabled()
  })

  it('readOnly durumunu desteklemeli', () => {
    // Arrange
    const {getByTestId} = render(<StatementInput name='test' readOnly />)

    // Act
    const inputElement = getByTestId(testId)

    // Assert
    expect(inputElement).toHaveProp('readOnly', true)
  })

  it('sadece harf, nümerik karakter, boşluk, nokta, virgül, tire, eğik çizgi kabul etmeli', async () => {
    // Arrange
    const text = '<>[]*?_^`|%=&{}`'
    const user = userEvent.setup()
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<StatementInput name='test' onChangeText={onChangeTextMock} />)

    // Act
    const inputElement = getByTestId(testId)
    await user.type(inputElement, text)

    // Assert
    expect(onChangeTextMock).toHaveBeenNthCalledWith(1, '')
    expect(onChangeTextMock).toHaveBeenLastCalledWith('')
  })
})

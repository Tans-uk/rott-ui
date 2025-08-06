import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {Input} from '../components'

describe('Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const inputLabelTestId = 'input-label-test-id'
  const inputLabelDescriptionTestId = 'input-label-description-test-id'
  const inputLabelIconTestId = 'input-label-description-icon-test-id'
  const defaultLabel = 'Test Label'
  const defaultLabelDesc = 'Test Desc'
  const defaultName = 'input'

  it('input ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(
      <Input type='default' testID={inputTestId} label={defaultLabel} name={defaultName} />
    )

    expect(renderedInput).toMatchSnapshot()
  })

  it('input ile renderlanan label verilen text uppercase olarak ekranda görünmeli', () => {
    const {getByText} = render(
      <Input type='default' testID={inputTestId} label={defaultLabel} name={defaultName} />
    )

    expect(getByText(defaultLabel.toUpperCase())).toBeTruthy()
  })

  it('input ile renderlanan label text verilmediğinde ekranda görünmemeli', () => {
    const {queryByTestId} = render(
      <Input type='default' testID={inputTestId} label='' name={defaultName} />
    )

    expect(queryByTestId(inputLabelTestId)).toBeNull()
  })

  it('kullanıcı verilen placeholder değerini ekranda görmeli', () => {
    const {getByTestId} = render(
      <Input type='default' testID={inputTestId} label={defaultLabel} name={defaultName} />
    )
    const renderedInput = getByTestId(inputTestId)

    expect(renderedInput.props.placeholder).toBe(defaultLabel)
  })

  it('kullanıcı placeholder verilmezse default olarak title ile aynı değeri görmeli', () => {
    const placeholder = 'Test Placeholder'
    const {getByTestId} = render(
      <Input
        type='default'
        testID={inputTestId}
        label={defaultLabel}
        placeholder={placeholder}
        name={defaultName}
      />
    )
    const renderedInput = getByTestId(inputTestId)

    expect(renderedInput.props.placeholder).toBe(placeholder)
  })

  it('verilen input type ekranda doğru şekilde render edilmeli', () => {
    const {rerender, getByTestId} = render(
      <Input type='default' testID={inputTestId} label={defaultLabel} name={defaultName} />
    )
    const defaultInput = getByTestId(inputTestId)
    expect(defaultInput.props.keyboardType).toBe('default')

    rerender(<Input testID={inputTestId} label={defaultLabel} type='numeric' name={defaultName} />)

    const numberInput = getByTestId(inputTestId)
    expect(numberInput.props.keyboardType).toBe('number-pad')
  })

  it('label description belirtilmis ise ekranda olmali', async () => {
    const {getByTestId} = render(
      <Input
        type='default'
        testID={inputTestId}
        label={{text: defaultLabel, description: defaultLabelDesc}}
        name={defaultName}
      />
    )
    const labelElement = getByTestId(inputLabelTestId)
    expect(labelElement).toBeOnTheScreen()

    const labelDescriptionElement = getByTestId(inputLabelDescriptionTestId)
    expect(labelDescriptionElement).toBeOnTheScreen()
    expect(labelDescriptionElement).toHaveTextContent(`(${defaultLabelDesc.toUpperCase()})`)
  })

  it('label icon belirtilmis ise ekranda renderlanmali', async () => {
    const mockIcon = 'INFORMATION'
    const {getByTestId} = render(
      <Input
        type='default'
        testID={inputTestId}
        label={{
          text: defaultLabel,
          description: defaultLabelDesc,
          icon: {name: mockIcon},
        }}
        name={defaultName}
      />
    )
    const labelElement = getByTestId(inputLabelTestId)
    expect(labelElement).toBeOnTheScreen()

    const labelDescriptionIconElement = getByTestId(inputLabelIconTestId)
    expect(labelDescriptionIconElement).toBeOnTheScreen()

    expect(labelDescriptionIconElement.children[0]).toHaveProp('name', mockIcon)
  })

  it('label icon belirtilmis onPress methodu calismali', async () => {
    const mockIcon = 'INFORMATION'
    const mockIconOnPress = jest.fn()
    const {getByTestId} = render(
      <Input
        type='default'
        testID={inputTestId}
        label={{
          text: defaultLabel,
          description: defaultLabelDesc,
          icon: {name: mockIcon, onPress: mockIconOnPress},
        }}
        name={defaultName}
      />
    )
    const labelElement = getByTestId(inputLabelTestId)
    expect(labelElement).toBeOnTheScreen()

    const labelDescriptionIconElement = getByTestId(inputLabelIconTestId)
    fireEvent.press(labelDescriptionIconElement)

    expect(mockIconOnPress).toHaveBeenCalled()
  })
})

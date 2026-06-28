import React from 'react'
import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {IconKeys} from '../../Icon'
import {Input} from '../components'

describe('Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const inputLabelTestId = 'input-label-test-id'
  const inputLabelDescriptionTestId = 'input-label-description-test-id'
  const inputLabelIconTestId = 'input-label-description-icon-test-id'
  const defaultLabel = 'Test Label'
  const defaultLabelDesc = 'Test Desc'
  const defaultName = 'input'

  it('input ilk render anında snapshot ile eşleşmeli', async () => {
    const renderedInput = await render(
      <Input type='default' testID={inputTestId} label={defaultLabel} name={defaultName} />
    )

    expect(renderedInput).toMatchSnapshot()
  })

  it('input ile renderlanan label verilen text uppercase olarak ekranda görünmeli', async () => {
    const {getByText} = await render(
      <Input type='default' testID={inputTestId} label={defaultLabel} name={defaultName} />
    )

    expect(getByText(defaultLabel.toUpperCase())).toBeTruthy()
  })

  it('input ile renderlanan label text verilmediğinde ekranda görünmemeli', async () => {
    const {queryByTestId} = await render(
      <Input type='default' testID={inputTestId} label='' name={defaultName} />
    )

    expect(queryByTestId(inputLabelTestId)).toBeNull()
  })

  it('kullanıcı verilen placeholder değerini ekranda görmeli', async () => {
    const {getByTestId} = await render(
      <Input type='default' testID={inputTestId} label={defaultLabel} name={defaultName} />
    )
    const renderedInput = getByTestId(inputTestId)

    expect(renderedInput.props.placeholder).toBe(defaultLabel)
  })

  it('kullanıcı placeholder verilmezse default olarak title ile aynı değeri görmeli', async () => {
    const placeholder = 'Test Placeholder'
    const {getByTestId} = await render(
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

  it('verilen input type ekranda doğru şekilde render edilmeli', async () => {
    const {rerenderAsync, getByTestId} = await render(
      <Input type='default' testID={inputTestId} label={defaultLabel} name={defaultName} />
    )
    const defaultInput = getByTestId(inputTestId)
    expect(defaultInput.props.keyboardType).toBe('default')

    await rerenderAsync(<Input testID={inputTestId} label={defaultLabel} type='numeric' name={defaultName} />)

    const numberInput = getByTestId(inputTestId)
    expect(numberInput.props.keyboardType).toBe('number-pad')
  })

  it('label description belirtilmis ise ekranda olmali', async () => {
    const {getByTestId} = await render(
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
    const mockIcon = 'INFORMATION' as IconKeys
    const {getByTestId} = await render(
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
  })

  it('label icon belirtilmis onPress methodu calismali', async () => {
    const mockIcon = 'INFORMATION' as IconKeys
    const mockIconOnPress = jest.fn()
    const {getByTestId} = await render(
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

describe('Input -> border suppresses Separator', () => {
  const separatorTestId = 'input-separator-test-id'

  it('hides the Separator when border is set and renderSeparator is omitted', async () => {
    const {queryByTestId} = await render(
      <Input type='default' name='b1' border={{width: 1, radius: 8, variant: 'grey-200'}} />
    )
    expect(queryByTestId(separatorTestId)).toBeNull()
  })

  it('keeps the Separator when border is set and renderSeparator is explicitly true', async () => {
    const {getByTestId} = await render(
      <Input type='default' name='b2' border={{width: 1}} renderSeparator />
    )
    expect(getByTestId(separatorTestId)).toBeTruthy()
  })

  it('keeps the Separator when no border is provided', async () => {
    const {getByTestId} = await render(<Input type='default' name='b3' />)
    expect(getByTestId(separatorTestId)).toBeTruthy()
  })
})

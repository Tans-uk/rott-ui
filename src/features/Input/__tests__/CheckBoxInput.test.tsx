import {Label} from '../../Label'
import {CheckBoxInput} from '../components'

import {translator} from '@libs'
import {fireEvent, render} from 'src/__tests__/utils/testUtils'

describe('CheckBox Input -> Custom Input', () => {
  const testId = {
    checkboxInputTestId: 'checkbox-input-test-id',
    checkboxContainerTestId: 'checkbox-container-test-id',
    checkboxDefaultLabelTestId: 'checkbox-default-label-test-id',
    checkboxCheckedTestId: 'checkbox-checked-test-id',
  }

  it('checkbox input ilk render anında snapshot ile eşleşmeli', () => {
    const {checkboxInputTestId} = testId
    const renderedCheckBoxInput = render(<CheckBoxInput name='test' testID={checkboxInputTestId} />)

    expect(renderedCheckBoxInput).toMatchSnapshot()
  })

  it('checkBox ilk renderlandığında unchecked olmalı', () => {
    const {checkboxInputTestId, checkboxContainerTestId, checkboxCheckedTestId} = testId
    const {getByTestId, queryByTestId} = render(
      <CheckBoxInput name='test' testID={checkboxInputTestId} />
    )

    const inputContainerElement = getByTestId(checkboxContainerTestId)

    expect(inputContainerElement).toBeOnTheScreen()
    expect(queryByTestId(checkboxCheckedTestId)).not.toBeOnTheScreen()
  })

  it('checkbox render olduğunda description string olarak verilmişse ekranda default label ile renderlanmalı', () => {
    const {checkboxDefaultLabelTestId} = testId
    const {getByText} = render(<CheckBoxInput name='test' description={translator('TEST')} />)

    const checkboxLabel = getByText(translator('TEST'))
    expect(checkboxLabel).toHaveProp('testID', checkboxDefaultLabelTestId)
  })

  it('checkbox render olduğunda description React element olarak verilmişse default label ile renderlanmamalı', () => {
    const {checkboxDefaultLabelTestId} = testId
    const {queryByTestId} = render(
      <CheckBoxInput name='test' description={<Label>{translator('TEST')}</Label>} />
    )

    const checkboxLabel = queryByTestId(checkboxDefaultLabelTestId)
    expect(checkboxLabel).not.toBeOnTheScreen()
  })

  it('checkBox onPress methodu calismali', () => {
    const {checkboxInputTestId} = testId
    const onPressMock = jest.fn()

    const {getByTestId} = render(
      <CheckBoxInput name='test' testID={checkboxInputTestId} onCheckChange={onPressMock} />
    )

    const inputElementPressable = getByTestId(checkboxInputTestId)
    fireEvent.press(inputElementPressable)

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})

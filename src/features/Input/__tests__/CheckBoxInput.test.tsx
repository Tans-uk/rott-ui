import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {formatMessage} from '../../../libs'
import {Label} from '../../Label'
import {CheckBoxInput} from '../components'

describe('CheckBox Input -> Custom Input', () => {
  const testId = {
    checkboxInputTestId: 'checkbox-input-test-id',
    checkboxContainerTestId: 'checkbox-container-test-id',
    checkboxDefaultLabelTestId: 'checkbox-default-label-test-id',
    checkboxCheckedTestId: 'checkbox-checked-test-id',
  }

  it("matches the snapshot on the checkbox input's first render", async () => {
    const {checkboxInputTestId} = testId
    const renderedCheckBoxInput = await render(
      <CheckBoxInput name='test' testID={checkboxInputTestId} />
    )

    expect(renderedCheckBoxInput).toMatchSnapshot()
  })

  it('renders the checkbox unchecked at first', async () => {
    const {checkboxInputTestId, checkboxContainerTestId, checkboxCheckedTestId} = testId
    const {getByTestId, queryByTestId} = await render(
      <CheckBoxInput name='test' testID={checkboxInputTestId} />
    )

    const inputContainerElement = getByTestId(checkboxContainerTestId)

    expect(inputContainerElement).toBeOnTheScreen()
    expect(queryByTestId(checkboxCheckedTestId)).not.toBeOnTheScreen()
  })

  it('renders the default label when the checkbox description is a string', async () => {
    const {checkboxDefaultLabelTestId} = testId
    const {getByText} = await render(
      <CheckBoxInput name='test' description={formatMessage('TEST')} />
    )

    const checkboxLabel = getByText(formatMessage('TEST'))
    expect(checkboxLabel).toHaveProp('testID', checkboxDefaultLabelTestId)
  })

  it('does not render the default label when the checkbox description is a React element', async () => {
    const {checkboxDefaultLabelTestId} = testId
    const {queryByTestId} = await render(
      <CheckBoxInput name='test' description={<Label>{formatMessage('TEST')}</Label>} />
    )

    const checkboxLabel = queryByTestId(checkboxDefaultLabelTestId)
    expect(checkboxLabel).not.toBeOnTheScreen()
  })

  it('calls the checkbox onPress', async () => {
    const {checkboxInputTestId} = testId
    const onPressMock = jest.fn()

    const {getByTestId} = await render(
      <CheckBoxInput name='test' testID={checkboxInputTestId} onCheckChange={onPressMock} />
    )

    const inputElementPressable = getByTestId(checkboxInputTestId)
    fireEvent.press(inputElementPressable)

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it("renders the leftIcon and rightIcon slots without the rightIcon's onPress leaking to the box", async () => {
    const onCheckChange = jest.fn()
    const onIconPress = jest.fn()
    const {getByTestId} = await render(
      <CheckBoxInput
        name='test'
        testID='checkbox-input-test-id'
        checked={false}
        onCheckChange={onCheckChange}
        leftIcon={{name: 'lock'}}
        rightIcon={{name: 'information', onPress: onIconPress}}
      />
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
    fireEvent.press(getByTestId('input-field-right-icon'))
    expect(onIconPress).toHaveBeenCalledTimes(1)
    expect(onCheckChange).not.toHaveBeenCalled()
  })
})

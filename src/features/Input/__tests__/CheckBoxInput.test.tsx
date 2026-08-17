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

  it('checkbox input ilk render anında snapshot ile eşleşmeli', async () => {
    const {checkboxInputTestId} = testId
    const renderedCheckBoxInput = await render(
      <CheckBoxInput name='test' testID={checkboxInputTestId} />
    )

    expect(renderedCheckBoxInput).toMatchSnapshot()
  })

  it('checkBox ilk renderlandığında unchecked olmalı', async () => {
    const {checkboxInputTestId, checkboxContainerTestId, checkboxCheckedTestId} = testId
    const {getByTestId, queryByTestId} = await render(
      <CheckBoxInput name='test' testID={checkboxInputTestId} />
    )

    const inputContainerElement = getByTestId(checkboxContainerTestId)

    expect(inputContainerElement).toBeOnTheScreen()
    expect(queryByTestId(checkboxCheckedTestId)).not.toBeOnTheScreen()
  })

  it('checkbox render olduğunda description string olarak verilmişse ekranda default label ile renderlanmalı', async () => {
    const {checkboxDefaultLabelTestId} = testId
    const {getByText} = await render(
      <CheckBoxInput name='test' description={formatMessage('TEST')} />
    )

    const checkboxLabel = getByText(formatMessage('TEST'))
    expect(checkboxLabel).toHaveProp('testID', checkboxDefaultLabelTestId)
  })

  it('checkbox render olduğunda description React element olarak verilmişse default label ile renderlanmamalı', async () => {
    const {checkboxDefaultLabelTestId} = testId
    const {queryByTestId} = await render(
      <CheckBoxInput name='test' description={<Label>{formatMessage('TEST')}</Label>} />
    )

    const checkboxLabel = queryByTestId(checkboxDefaultLabelTestId)
    expect(checkboxLabel).not.toBeOnTheScreen()
  })

  it('checkBox onPress methodu calismali', async () => {
    const {checkboxInputTestId} = testId
    const onPressMock = jest.fn()

    const {getByTestId} = await render(
      <CheckBoxInput name='test' testID={checkboxInputTestId} onCheckChange={onPressMock} />
    )

    const inputElementPressable = getByTestId(checkboxInputTestId)
    fireEvent.press(inputElementPressable)

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('leftIcon ve rightIcon slotlarını render eder ve rightIcon onPress kutuya sızmaz', async () => {
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

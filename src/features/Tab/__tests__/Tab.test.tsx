import React from 'react'

import {commonUiTestExtension} from '../../../__tests__/utils/commonUiTestExtension'
import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {Label} from '../../Label'
import {Tab} from '../Tab'

const testId = {
  tabTestId: (name: string) => `${name}-test-id`,
}

describe('Tab -> Custom Component', () => {
  it('matches the Tab snapshot', async () => {
    const {tabTestId} = testId
    const rendered = await render(
      <Tab testID={tabTestId('tab')} isSelected={false} onLayout={jest.fn()}>
        <Label>Test</Label>
      </Tab>
    )

    expect(rendered).toMatchSnapshot()
  })

  it('calls the Tab onPress', async () => {
    const {tabTestId} = testId
    const onPressMock = jest.fn()

    const {getByTestId} = await render(
      <Tab testID={tabTestId('tab')} onPress={onPressMock}>
        <Label>Test-1</Label>
      </Tab>
    )

    let tabElement = getByTestId(tabTestId('tab'))
    fireEvent.press(tabElement)

    expect(onPressMock).toHaveBeenCalled()
  })

  it('exposes whether the Tab is selected through its accessibility state', async () => {
    const {tabTestId} = testId
    const returnsTrueMock = jest.fn(() => true)

    const {getByTestId} = await render(
      <Tab testID={tabTestId('tab')} isSelected={returnsTrueMock()}>
        <Label>Test-1</Label>
      </Tab>
    )

    let tabElement = getByTestId(tabTestId('tab'))

    expect(tabElement).toHaveAccessibilityState({selected: true})
  })

  it('updates the selected value in AccessibilityState when the Tab selection changes', async () => {
    const {tabTestId} = testId
    let isSelectedMock = true

    const {getByTestId, rerenderAsync} = await render(
      <Tab
        testID={tabTestId('tab')}
        isSelected={isSelectedMock}
        onPress={() => {
          isSelectedMock = !isSelectedMock
        }}>
        <Label>Test-1</Label>
      </Tab>
    )

    let tabElement = getByTestId(tabTestId('tab'))
    expect(tabElement).toHaveAccessibilityState({selected: true})

    fireEvent.press(tabElement)

    await rerenderAsync(
      <Tab
        testID={tabTestId('tab')}
        isSelected={isSelectedMock}
        onPress={() => {
          isSelectedMock = !isSelectedMock
        }}>
        <Label>Test-1</Label>
      </Tab>
    )

    tabElement = getByTestId(tabTestId('tab'))

    expect(tabElement).toHaveAccessibilityState({selected: false})
  })
})

commonUiTestExtension(<Tab testID={testId.tabTestId('tab')} />, testId.tabTestId('tab'))

import React from 'react'
import {commonUiTestExtension} from '../../../__tests__/utils/commonUiTestExtension'
import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {Label} from '../../Label'
import {Tab} from '../Tab'

const testId = {
  tabTestId: (name: string) => `${name}-test-id`,
}

describe('Tab -> Custom Component', () => {
  it('Tab snapshotı ile eşleşmeli', () => {
    const {tabTestId} = testId
    const rendered = render(
      <Tab testID={tabTestId('tab')} isSelected={false} onLayout={jest.fn()}>
        <Label>Test</Label>
      </Tab>
    )

    expect(rendered).toMatchSnapshot()
  })

  it('Tab onPress calismali', async () => {
    const {tabTestId} = testId
    const onPressMock = jest.fn()

    const {getByTestId} = render(
      <Tab testID={tabTestId('tab')} onPress={onPressMock}>
        <Label>Test-1</Label>
      </Tab>
    )

    let tabElement = getByTestId(tabTestId('tab'))
    fireEvent.press(tabElement)

    expect(onPressMock).toHaveBeenCalled()
  })

  it('Tab accessibility state degerlerinden selected olup olmadigi kontrol edilebilmeli', () => {
    const {tabTestId} = testId
    const returnsTrueMock = jest.fn(() => true)

    const {getByTestId} = render(
      <Tab testID={tabTestId('tab')} isSelected={returnsTrueMock()}>
        <Label>Test-1</Label>
      </Tab>
    )

    let tabElement = getByTestId(tabTestId('tab'))

    expect(tabElement).toHaveAccessibilityState({selected: true})
  })

  it('Tab selected degistigi zaman AccessibilityState degerlerinden selected degeri degismeli', () => {
    const {tabTestId} = testId
    let isSelectedMock = true

    const {getByTestId, rerender} = render(
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

    rerender(
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

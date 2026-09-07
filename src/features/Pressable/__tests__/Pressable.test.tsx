import React from 'react'

import {commonUiTestExtension} from '../../../__tests__/utils/commonUiTestExtension'
import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {Pressable} from '../components'

const testId = {
  pressableTestId: 'pressable-test-id',
  pressableLabel: 'Pressable Label',
}

describe('Pressable -> Custom Component', () => {
  it('renders the pressable component and matches its snapshot', async () => {
    const rendered = await render(<Pressable />)

    expect(rendered).toMatchSnapshot()
  })

  it('renders the pressable component with a label', async () => {
    const {pressableTestId, pressableLabel} = testId
    const {getByTestId, getByText} = await render(
      <Pressable text={pressableLabel} testID={pressableTestId} />
    )

    const pressableElement = getByTestId(pressableTestId)
    const labelElement = getByText(pressableLabel)

    expect(pressableElement).toBeTruthy()
    expect(labelElement).toBeTruthy()
  })

  it('is pressable', async () => {
    const {pressableTestId, pressableLabel} = testId
    const onPressMock = jest.fn()
    const {getByTestId} = await render(
      <Pressable
        text={pressableLabel}
        textVariant='black'
        textSize='md'
        textWeight='bold'
        testID={pressableTestId}
        onPress={onPressMock}
      />
    )
    const pressableElement = getByTestId(pressableTestId)
    expect(pressableElement).toBeTruthy()

    fireEvent.press(pressableElement)
    expect(onPressMock).toHaveBeenCalled()
  })

  it('cannot be pressed while the pressable is disabled', async () => {
    const {pressableTestId, pressableLabel} = testId
    const onPressMock = jest.fn()
    const {getByTestId} = await render(
      <Pressable
        text={pressableLabel}
        textVariant='black'
        textSize='md'
        textWeight='bold'
        testID={pressableTestId}
        onPress={onPressMock}
        disabled
      />
    )

    const pressableElement = getByTestId(pressableTestId)
    expect(pressableElement).toBeTruthy()

    fireEvent.press(pressableElement)
    expect(onPressMock).not.toHaveBeenCalled()
  })

  it('renders the pressable component with a style', async () => {
    const {pressableTestId, pressableLabel} = testId
    const onPressMock = jest.fn()
    const {getByText} = await render(
      <Pressable
        text={pressableLabel}
        textVariant='black'
        textSize='md'
        textWeight='bold'
        testID={pressableTestId}
        onPress={onPressMock}
      />
    )

    const textElement = getByText(pressableLabel)

    expect(textElement).toHaveStyle({fontWeight: 'bold'})
  })

  commonUiTestExtension(<Pressable testID={testId.pressableTestId} />, testId.pressableTestId)
})

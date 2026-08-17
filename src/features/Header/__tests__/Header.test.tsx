import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {Icon, type IconKeys} from '../../Icon'
import type {ImageTypes} from '../../Image'
import {Header} from '../components'

describe('Header -> Custom Component', () => {
  const testId = {
    component: 'header-test-id',
    title: 'header-title-test-id',
    logo: 'header-logo-test-id',
    leftIcon: 'header-left-icon-test-id',
    leftIconPressable: 'header-left-pressable-test-id',
    rightIconPressable: 'header-right-pressable-test-id',
    rightIcon: 'header-right-icon-test-id',
    back: 'header-back-test-id',
  }

  const IMG: {logo: ImageTypes; rightIcon: IconKeys} = {
    logo: 'pttbank-white',
    rightIcon: 'remove-circle',
  }
  const headerText = 'Test Başlık'

  it('yalnızca başlık çalışmalı ve snapshot eşleşmeli', async () => {
    const {component} = testId

    const rendered = await render(<Header testID={component} title={headerText} />)

    expect(rendered).toMatchSnapshot()
  })

  it('verilen testId ekranda olmalı', async () => {
    const {title, rightIcon, logo, component} = testId
    const {queryByTestId} = await render(<Header testID={component} title={headerText} />)

    //Title ekranda olmalı
    expect(queryByTestId(title)).toBeOnTheScreen()

    //RightIcon ekranda olmamalı
    expect(queryByTestId(rightIcon)).not.toBeOnTheScreen()

    //Logo ekranda olmamalı
    expect(queryByTestId(logo)).not.toBeOnTheScreen()
  })

  it('yalnızca logo çalışmalı ve snapshot eşleşmeli', async () => {
    const {title, rightIcon, logo, component} = testId
    const {queryByTestId} = await render(<Header testID={component} logo={IMG.logo} />)

    const logoElement = queryByTestId(logo)
    const rightIconElement = queryByTestId(rightIcon)
    const titleElement = queryByTestId(title)

    expect(logoElement).toBeOnTheScreen()
    expect(rightIconElement).not.toBeOnTheScreen()
    expect(titleElement).not.toBeOnTheScreen()
  })

  it('başlık ve icon var ise sadece icon gorunmeli', async () => {
    const {rightIcon, logo, component} = testId
    const {queryByTestId, getByTestId} = await render(
      <Header testID={component} title={headerText} logo={IMG.logo} />
    )

    const headerElement = getByTestId(component)
    const logoElement = getByTestId(logo)
    const rightIconElement = queryByTestId(rightIcon)

    expect(rightIconElement).not.toBeOnTheScreen()
    expect(logoElement).toBeOnTheScreen()
    expect(headerElement).not.toHaveTextContent(headerText)
  })

  it('leftIcon görüntülenmeli ve onPress Methodu Çalışmalı', async () => {
    const {component, leftIcon: leftIconTestId, leftIconPressable} = testId
    const {rightIcon} = IMG

    const mockOnPress = jest.fn()
    const {getByTestId} = await render(
      <Header
        testID={component}
        title={headerText}
        leftIcon={{
          testID: leftIconTestId,
          name: rightIcon,
          onPress: mockOnPress,
        }}
      />
    )

    const leftIconElement = getByTestId(leftIconPressable)
    const leftIconPressableElement = getByTestId(leftIconPressable)
    //LeftIcon On Press

    await waitFor(() => {
      fireEvent.press(leftIconPressableElement!)
    })

    expect(leftIconElement).toBeOnTheScreen()
    expect(mockOnPress).toHaveBeenCalled()
  })

  it('leftIcon verilmediğinde ekranda gözükmemeli', async () => {
    const {component, leftIcon: leftIconTestId} = testId
    const {queryByTestId} = await render(<Header testID={component} title={headerText} />)

    const leftIconElement = queryByTestId(leftIconTestId)

    expect(leftIconElement).not.toBeOnTheScreen()
  })

  it('leftIcon rounded özelliği verildiğinde border radius height ile aynı olmalı', async () => {
    const {component, leftIconPressable} = testId
    const {rightIcon} = IMG

    const {getByTestId} = await render(
      <Header
        height={40}
        testID={component}
        title={headerText}
        leftIcon={{
          name: rightIcon,
          rounded: true,
        }}
      />
    )

    const leftIconElement = getByTestId(leftIconPressable)

    expect(leftIconElement).toHaveProp('borderRadius', 40)
  })

  it('leftElement görüntülenmeli', async () => {
    const {component, rightIcon: rightIconTestId} = testId
    const {rightIcon} = IMG

    const {queryByTestId} = await render(
      <Header
        testID={component}
        title={headerText}
        rightElement={<Icon testID={rightIconTestId} name={rightIcon} />}
      />
    )

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
  })

  it('rightIcon görüntülenmeli ve onPress Methodu Çalışmalı', async () => {
    const {component, rightIcon: rightIconTestId, rightIconPressable} = testId
    const {rightIcon} = IMG

    const mockOnPress = jest.fn()
    const {getByTestId} = await render(
      <Header
        testID={component}
        title={headerText}
        rightIcon={{
          testID: rightIconTestId,
          name: rightIcon,
          onPress: mockOnPress,
        }}
      />
    )

    const rightIconElement = getByTestId(rightIconTestId)
    const rightIconPressableElement = getByTestId(rightIconPressable)
    //RightIcon On Press
    await waitFor(() => {
      fireEvent.press(rightIconPressableElement!)
    })

    expect(rightIconElement).toBeOnTheScreen()
    expect(mockOnPress).toHaveBeenCalled()
  })

  it('rightIcon verilmediğinde ekranda gözükmemeli', async () => {
    const {component, rightIcon: rightIconTestId} = testId
    const {queryByTestId} = await render(<Header testID={component} title={headerText} />)

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).not.toBeOnTheScreen()
  })

  it('right rounded özelliği verildiğinde border radius height ile aynı olmalı', async () => {
    const {component, rightIconPressable} = testId
    const {rightIcon} = IMG

    const {getByTestId} = await render(
      <Header
        height={40}
        testID={component}
        title={headerText}
        rightIcon={{
          name: rightIcon,
          rounded: true,
        }}
      />
    )

    const rightIconElement = getByTestId(rightIconPressable)

    expect(rightIconElement).toHaveProp('borderRadius', 40)
  })

  it('rightElement görüntülenmeli', async () => {
    const {component, rightIcon: rightIconTestId} = testId
    const {rightIcon} = IMG

    const {queryByTestId} = await render(
      <Header
        testID={component}
        title={headerText}
        rightElement={<Icon testID={rightIconTestId} name={rightIcon} />}
      />
    )

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
  })

  it('rightIcon ve leftIcon verildiğinde, ekranda gözükmeli', async () => {
    const {component, rightIcon: rightIconTestId, leftIcon: leftIconTestId} = testId
    const {rightIcon} = IMG

    const {queryByTestId} = await render(
      <Header
        testID={component}
        title={headerText}
        leftIcon={{
          testID: leftIconTestId,
          name: rightIcon,
        }}
        rightIcon={{
          testID: rightIconTestId,
          name: rightIcon,
        }}
      />
    )

    const rightIconElement = queryByTestId(rightIconTestId)
    const leftIconElement = queryByTestId(leftIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
    expect(leftIconElement).toBeOnTheScreen()
  })

  it('children verildiğinde, ekranda gözükmeli', async () => {
    const {component} = testId
    const {queryByTestId} = await render(
      <Header testID={component} title={headerText}>
        <Icon testID='header-children-icon-test-id' name='hgs' />
      </Header>
    )

    const childrenElement = queryByTestId('header-children-icon-test-id')

    expect(childrenElement).toBeOnTheScreen()
  })
})

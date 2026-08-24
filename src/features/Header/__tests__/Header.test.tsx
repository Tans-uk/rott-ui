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

  it('works with a title alone and matches the snapshot', async () => {
    const {component} = testId

    const rendered = await render(<Header testID={component} title={headerText} />)

    expect(rendered).toMatchSnapshot()
  })

  it('shows the given testId', async () => {
    const {title, rightIcon, logo, component} = testId
    const {queryByTestId} = await render(<Header testID={component} title={headerText} />)

    // the title should be shown
    expect(queryByTestId(title)).toBeOnTheScreen()

    // the right icon should not be shown
    expect(queryByTestId(rightIcon)).not.toBeOnTheScreen()

    // the logo should not be shown
    expect(queryByTestId(logo)).not.toBeOnTheScreen()
  })

  it('works with a logo alone and matches the snapshot', async () => {
    const {title, rightIcon, logo, component} = testId
    const {queryByTestId} = await render(<Header testID={component} logo={IMG.logo} />)

    const logoElement = queryByTestId(logo)
    const rightIconElement = queryByTestId(rightIcon)
    const titleElement = queryByTestId(title)

    expect(logoElement).toBeOnTheScreen()
    expect(rightIconElement).not.toBeOnTheScreen()
    expect(titleElement).not.toBeOnTheScreen()
  })

  it('shows only the icon when both a title and an icon are given', async () => {
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

  it('shows the leftIcon and calls its onPress', async () => {
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

  it('hides the leftIcon when it is not given', async () => {
    const {component, leftIcon: leftIconTestId} = testId
    const {queryByTestId} = await render(<Header testID={component} title={headerText} />)

    const leftIconElement = queryByTestId(leftIconTestId)

    expect(leftIconElement).not.toBeOnTheScreen()
  })

  it('matches the border radius to the height when the leftIcon is rounded', async () => {
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

  it('shows the leftElement', async () => {
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

  it('shows the rightIcon and calls its onPress', async () => {
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

  it('hides the rightIcon when it is not given', async () => {
    const {component, rightIcon: rightIconTestId} = testId
    const {queryByTestId} = await render(<Header testID={component} title={headerText} />)

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).not.toBeOnTheScreen()
  })

  it('matches the border radius to the height when the right icon is rounded', async () => {
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

  it('shows the rightElement', async () => {
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

  it('shows both the rightIcon and the leftIcon when they are given', async () => {
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

  it('shows the children when they are given', async () => {
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

import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {formatMessage} from '../../../libs'
import {themeConfig} from '../../../providers'
import {IconProps} from '../../Icon'
import {CommonItem} from '../components'
import type {CommonItemProps} from '../models'

describe('Common -> Common Item', () => {
  const onPressMock = jest.fn()
  const leftIconOnPressMock = jest.fn()
  const rightIconOnPressMock = jest.fn()

  const dummyData: CommonItemProps = {
    title: formatMessage('TEST.WITH.PARAM', {testText: 'TITLE'}),
    subTitle: formatMessage('TEST.WITH.PARAM', {testText: 'SUBTITLE'}),
    description: formatMessage('TEST.WITH.PARAM', {testText: 'DESCRIPTION'}),
    leftIcon: {
      name: 'star',
      width: 24,
      height: 24,
      color: themeConfig.colors.primary,
    },
    rightIcon: {
      name: 'plus',
      width: 24,
      height: 24,
      color: themeConfig.colors.primary,
    },
  }

  const testId = {
    titleTestId: 'title-test-id',
    subTitleTestId: 'subtitle-test-id',
    descriptionTestId: 'description-test-id',
    leftIconTestId: 'left-icon-test-id',
    rightIconTestId: 'right-icon-test-id',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("matches the snapshot on the common item's first render", async () => {
    const commonItem = await render(<CommonItem title={dummyData.title} />)

    expect(commonItem).toMatchSnapshot()
  })

  it("renders the title on the common item's first render", async () => {
    const {titleTestId} = testId
    const {title} = dummyData
    const {getByTestId} = await render(<CommonItem title={title} />)

    const titleElement = getByTestId(titleTestId)

    expect(titleElement).toBeOnTheScreen()
  })

  it("renders the subTitle on the common item's first render", async () => {
    const {subTitleTestId} = testId
    const {title, subTitle} = dummyData
    const {getByTestId} = await render(<CommonItem title={title} subTitle={subTitle} />)

    const subTitleElement = getByTestId(subTitleTestId)

    expect(subTitleElement).toBeOnTheScreen()
  })

  it("renders the description on the common item's first render", async () => {
    const {descriptionTestId} = testId
    const {title, subTitle, description} = dummyData
    const {getByTestId} = await render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const descriptionElement = getByTestId(descriptionTestId)

    expect(descriptionElement).toBeOnTheScreen()
  })

  it('renders the leftIcon', async () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description, leftIcon} = dummyData
    const {queryByTestId} = await render(
      <CommonItem title={title} subTitle={subTitle} description={description} leftIcon={leftIcon} />
    )

    const leftIconElement = queryByTestId(leftIconTestId)

    expect(leftIconElement).toBeOnTheScreen()
  })

  it('does not render the leftIcon when it is not given', async () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description} = dummyData
    const {queryByTestId} = await render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const leftIconElement = queryByTestId(leftIconTestId)

    expect(leftIconElement).toBeNull()
  })

  it("triggers CommonItem's onPress when the leftIcon has no onPress of its own.", async () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description, leftIcon} = dummyData
    const {getByTestId} = await render(
      <CommonItem
        title={title}
        subTitle={subTitle}
        description={description}
        leftIcon={leftIcon}
        onPress={onPressMock}
      />
    )

    const leftIconElement = getByTestId(leftIconTestId)
    await waitFor(() => fireEvent.press(leftIconElement))

    expect(onPressMock).toHaveBeenCalled()
  })

  it("does not trigger CommonItem's onPress when the leftIcon has its own onPress.", async () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description, leftIcon} = dummyData
    const {getByTestId} = await render(
      <CommonItem
        title={title}
        subTitle={subTitle}
        description={description}
        leftIcon={{onPress: leftIconOnPressMock, ...(leftIcon as IconProps)} as IconProps}
        onPress={onPressMock}
      />
    )

    const leftIconElement = getByTestId(leftIconTestId)
    await waitFor(() => fireEvent.press(leftIconElement))

    expect(leftIconOnPressMock).toHaveBeenCalled()
    expect(onPressMock).not.toHaveBeenCalled()
  })

  it('renders the rightIcon', async () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description, rightIcon} = dummyData
    const {getByTestId} = await render(
      <CommonItem
        title={title}
        subTitle={subTitle}
        description={description}
        rightIcon={rightIcon}
      />
    )

    const rightIconElement = getByTestId(rightIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
  })

  it('does not render the rightIcon when it is not given', async () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description} = dummyData
    const {queryByTestId} = await render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).toBeNull()
  })

  it("triggers CommonItem's onPress when the rightIcon has no onPress of its own.", async () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description, rightIcon} = dummyData
    const {getByTestId} = await render(
      <CommonItem
        title={title}
        subTitle={subTitle}
        description={description}
        rightIcon={rightIcon}
        onPress={onPressMock}
      />
    )

    const rightIconElement = getByTestId(rightIconTestId)
    await waitFor(() => fireEvent.press(rightIconElement))

    expect(onPressMock).toHaveBeenCalled()
  })

  it("does not trigger CommonItem's onPress when the rightIcon has its own onPress.", async () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description, rightIcon} = dummyData
    const {getByTestId} = await render(
      <CommonItem
        title={title}
        subTitle={subTitle}
        description={description}
        rightIcon={{onPress: rightIconOnPressMock, ...(rightIcon as IconProps)} as IconProps}
        onPress={onPressMock}
      />
    )

    const rightIconElement = getByTestId(rightIconTestId)
    await waitFor(() => fireEvent.press(rightIconElement))

    expect(rightIconOnPressMock).toHaveBeenCalled()
    expect(onPressMock).not.toHaveBeenCalled()
  })

  it('renders both the left and right icons on the common item first render', async () => {
    const {rightIconTestId, leftIconTestId} = testId
    const {title, subTitle, description, rightIcon, leftIcon} = dummyData
    const {getByTestId} = await render(
      <CommonItem
        title={title}
        subTitle={subTitle}
        description={description}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
      />
    )

    const rightIconElement = getByTestId(rightIconTestId)
    const leftIconElement = getByTestId(leftIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
    expect(leftIconElement).toBeOnTheScreen()
  })

  it('renders neither the left nor the right icon on the common item first render', async () => {
    const {rightIconTestId, leftIconTestId} = testId
    const {title, subTitle, description} = dummyData
    const {queryByTestId} = await render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const rightIconElement = queryByTestId(rightIconTestId)
    const leftIconElement = queryByTestId(leftIconTestId)

    expect(rightIconElement).toBeNull()
    expect(leftIconElement).toBeNull()
  })
})

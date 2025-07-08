import {CommonItem, type CommonItemProps, type IconProps} from '@features'
import {formatMessage} from '@libs'
import {themeConfig} from '@providers'
import {fireEvent, render, waitFor} from '@utils'

describe('Common -> Common Item', () => {
  const onPressMock = jest.fn()
  const leftIconOnPressMock = jest.fn()
  const rightIconOnPressMock = jest.fn()

  const dummyData: CommonItemProps = {
    title: formatMessage('TEST.WITH.PARAM', {testText: 'TITLE'}),
    subTitle: formatMessage('TEST.WITH.PARAM', {testText: 'SUBTITLE'}),
    description: formatMessage('TEST.WITH.PARAM', {testText: 'DESCRIPTION'}),
    leftIcon: {
      name: 'STAR',
      width: 24,
      height: 24,
      color: themeConfig.colors.primary,
    },
    rightIcon: {
      name: 'ADD',
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

  it('common item ilk renderlandığında snapshot ile eşleşmeli', () => {
    const commonItem = render(<CommonItem title={dummyData.title} />)

    expect(commonItem).toMatchSnapshot()
  })

  it('common item ilk renderlandığında title ekranda renderlanmali', () => {
    const {titleTestId} = testId
    const {title} = dummyData
    const {getByTestId} = render(<CommonItem title={title} />)

    const titleElement = getByTestId(titleTestId)

    expect(titleElement).toBeOnTheScreen()
  })

  it('common item ilk renderlandığında subTitle ekranda renderlanmali', () => {
    const {subTitleTestId} = testId
    const {title, subTitle} = dummyData
    const {getByTestId} = render(<CommonItem title={title} subTitle={subTitle} />)

    const subTitleElement = getByTestId(subTitleTestId)

    expect(subTitleElement).toBeOnTheScreen()
  })

  it('common item ilk renderlandığında description ekranda renderlanmali', () => {
    const {descriptionTestId} = testId
    const {title, subTitle, description} = dummyData
    const {getByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const descriptionElement = getByTestId(descriptionTestId)

    expect(descriptionElement).toBeOnTheScreen()
  })

  it('leftIcon ekranda renderlanmali', () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description, leftIcon} = dummyData
    const {queryByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} leftIcon={leftIcon} />
    )

    const leftIconElement = queryByTestId(leftIconTestId)

    expect(leftIconElement).toBeOnTheScreen()
  })

  it('leftIcon verilmediğinde ekranda renderlanmamali', () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description} = dummyData
    const {queryByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const leftIconElement = queryByTestId(leftIconTestId)

    expect(leftIconElement).toBeNull()
  })

  it('leftIcon onPress özelliği verilmediğinde CommonItem onPress özelliğini tetiklemelidir.', async () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description, leftIcon} = dummyData
    const {getByTestId} = render(
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

  it('leftIcon onPress özelliği verildiğinde CommonItem onPress özelliğini tetiklenmemelidir.', async () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description, leftIcon} = dummyData
    const {getByTestId} = render(
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

  it('rightIcon ekranda renderlanmali', () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description, rightIcon} = dummyData
    const {getByTestId} = render(
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

  it('rightIcon verilmediğinde ekranda renderlanmamali', () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description} = dummyData
    const {queryByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).toBeNull()
  })

  it('rightIcon onPress özelliği verilmediğinde CommonItem onPress özelliğini tetiklemelidir.', async () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description, rightIcon} = dummyData
    const {getByTestId} = render(
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

  it('rightIcon onPress özelliği verildiğinde CommonItem onPress özelliğini tetiklenmemelidir.', async () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description, rightIcon} = dummyData
    const {getByTestId} = render(
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

  it('common item ilk renderlangidinga left ve right iconu ekranda renderlanmali', () => {
    const {rightIconTestId, leftIconTestId} = testId
    const {title, subTitle, description, rightIcon, leftIcon} = dummyData
    const {getByTestId} = render(
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

  it('common item ilk renderlandiginda left ve right iconu ekranda renderlanmamali', () => {
    const {rightIconTestId, leftIconTestId} = testId
    const {title, subTitle, description} = dummyData
    const {queryByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const rightIconElement = queryByTestId(rightIconTestId)
    const leftIconElement = queryByTestId(leftIconTestId)

    expect(rightIconElement).toBeNull()
    expect(leftIconElement).toBeNull()
  })
})

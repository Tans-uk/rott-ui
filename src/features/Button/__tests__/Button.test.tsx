import React from 'react'

import {commonUiTestExtension} from '../../../__tests__/utils/commonUiTestExtension'
import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {colorFromVariant, display} from '../../../utils'
import {Button} from '../components'

const testId = {
  buttonTestId: 'button-test-id',
  buttonLoadingIndicatiorTestId: 'button-loading-indicator-test-id',
  buttonLoadingTextTestId: 'button-loading-text-test-id',
  buttonLeftIconTestId: 'button-left-icon-test-id',
  buttonLeftImageTestId: 'button-left-image-test-id',
  buttonRightIconTestId: 'button-right-icon-test-id',
  buttonRightImageTestId: 'button-right-image-test-id',
  buttonText: 'Test Button',
}

describe('Button -> Custom Component', () => {
  it('matches the button snapshot', async () => {
    const {buttonTestId, buttonText} = testId
    const rendered = await render(<Button testID={buttonTestId}>{buttonText}</Button>)

    expect(rendered).toMatchSnapshot()
  })

  it('shows the button but not the loading icon', async () => {
    const {buttonTestId, buttonText, buttonLoadingIndicatiorTestId} = testId
    const {getByTestId, queryByTestId} = await render(
      <Button testID={buttonTestId}>{buttonText}</Button>
    )

    const buttonElement = getByTestId(buttonTestId)
    const loadingIndicator = queryByTestId(buttonLoadingIndicatiorTestId)

    expect(buttonElement).toBeOnTheScreen()
    expect(loadingIndicator).not.toBeOnTheScreen()
  })

  it('renders the button with loading text and a loading icon', async () => {
    const {buttonTestId, buttonText, buttonLoadingTextTestId, buttonLoadingIndicatiorTestId} =
      testId
    const renderedButton = await render(<Button testID={buttonTestId}>{buttonText}</Button>)

    const {getByTestId, rerenderAsync} = renderedButton
    await rerenderAsync(
      <Button testID={buttonTestId} isLoading loadingText='Loading'>
        {buttonText}
      </Button>
    )
    const buttonElement = getByTestId(buttonTestId)
    const loadingIndicator = getByTestId(buttonLoadingIndicatiorTestId)
    const loadingText = getByTestId(buttonLoadingTextTestId)

    expect(buttonElement).toBeOnTheScreen()
    expect(loadingIndicator).toBeOnTheScreen()
    expect(loadingText).toBeOnTheScreen()
  })

  it('cannot be pressed while the button is disabled', async () => {
    const {buttonTestId, buttonText} = testId
    const onPressMock = jest.fn()
    const {getByTestId} = await render(
      <Button testID={buttonTestId} disabled onPress={onPressMock}>
        {buttonText}
      </Button>
    )

    const buttonElemet = getByTestId(buttonTestId)
    fireEvent.press(buttonElemet)

    expect(onPressMock).not.toHaveBeenCalled()
  })

  it('renders the correct icon when the left icon prop is given', async () => {
    const {buttonTestId, buttonText, buttonLeftIconTestId} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} leftIcon={{name: 'remove-circle'}}>
        {buttonText}
      </Button>
    )

    const leftIconElement = getByTestId(buttonLeftIconTestId)

    expect(leftIconElement).toBeOnTheScreen()
  })

  it('renders the correct image when the left image prop is given', async () => {
    const {buttonTestId, buttonText, buttonLeftImageTestId} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} leftImage={{name: 'left-arrow-icon', absolute: true}}>
        {buttonText}
      </Button>
    )

    const leftIconElement = getByTestId(buttonLeftImageTestId)

    expect(leftIconElement).toBeOnTheScreen()
    expect(leftIconElement).toHaveProp('source')
  })

  it('hides the given left icon while the button is loading', async () => {
    const {buttonText, buttonLeftIconTestId} = testId
    const {queryByTestId} = await render(
      <Button leftIcon={{name: 'remove-circle'}} isLoading>
        {buttonText}
      </Button>
    )

    const leftIcon = queryByTestId(buttonLeftIconTestId)

    expect(leftIcon).not.toBeOnTheScreen()
  })

  it('shows the button rendered with the outline variant', async () => {
    const {buttonTestId, buttonText} = testId
    const {getByTestId} = await render(
      <Button variant='primary-outline' testID={buttonTestId}>
        {buttonText}
      </Button>
    )

    const buttonElement = getByTestId(buttonTestId)

    expect(buttonElement).toBeOnTheScreen()
    expect(buttonElement).toHaveStyle({
      backgroundColor: 'transparent',
      borderColor: colorFromVariant('primary'),
    })
  })

  it('renders the correct icon when the right icon prop is given', async () => {
    const {buttonTestId, buttonText, buttonRightIconTestId} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} rightIcon={{name: 'remove-circle'}}>
        {buttonText}
      </Button>
    )

    const rightIconElement = getByTestId(buttonRightIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
  })

  it('renders the correct image when the right image prop is given', async () => {
    const {buttonTestId, buttonText, buttonRightImageTestId} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} rightImage={{name: 'right-arrow-icon', absolute: true}}>
        {buttonText}
      </Button>
    )

    const rightImageElement = getByTestId(buttonRightImageTestId)

    expect(rightImageElement).toBeOnTheScreen()
    expect(rightImageElement).toHaveProp('source')
  })

  it('hides the given right icon while the button is loading', async () => {
    const {buttonText, buttonRightIconTestId} = testId
    const {queryByTestId} = await render(
      <Button rightIcon={{name: 'remove-circle'}} isLoading>
        {buttonText}
      </Button>
    )

    const rightIcon = queryByTestId(buttonRightIconTestId)

    expect(rightIcon).not.toBeOnTheScreen()
  })

  it('applies the given borderWidth and borderColor on a non-outline variant', async () => {
    const {buttonTestId, buttonText} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} variant='primary' borderWidth={1} borderColor='#747775'>
        {buttonText}
      </Button>
    )

    expect(getByTestId(buttonTestId)).toHaveStyle({
      borderWidth: 1,
      borderColor: '#747775',
    })
  })

  it("keeps the outline variant's own border behaviour when no border props are given", async () => {
    const {buttonTestId, buttonText} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} variant='primary-outline'>
        {buttonText}
      </Button>
    )

    expect(getByTestId(buttonTestId)).toHaveStyle({
      borderWidth: 2,
      borderColor: colorFromVariant('primary'),
    })
  })

  it('prefers an explicit borderColor over the variant colour on the outline variant', async () => {
    const {buttonTestId, buttonText} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} variant='primary-outline' borderColor='#747775'>
        {buttonText}
      </Button>
    )

    expect(getByTestId(buttonTestId)).toHaveStyle({
      borderWidth: 2,
      borderColor: '#747775',
    })
  })

  it('leaves borderColor unset on a non-outline variant with no border props', async () => {
    const {buttonTestId, buttonText} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} variant='primary'>
        {buttonText}
      </Button>
    )

    expect(getByTestId(buttonTestId)).toHaveStyle({
      borderWidth: undefined,
      borderColor: undefined,
    })
  })

  it('makes the width relative to the container rather than a fixed pixel value when size is full', async () => {
    const {buttonTestId, buttonText} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} size='full'>
        {buttonText}
      </Button>
    )

    expect(getByTestId(buttonTestId)).toHaveStyle({width: '100%'})
  })

  it('makes the default button width relative to the container when no size is given', async () => {
    const {buttonTestId, buttonText} = testId
    const {getByTestId} = await render(<Button testID={buttonTestId}>{buttonText}</Button>)

    expect(getByTestId(buttonTestId)).toHaveStyle({width: '100%'})
  })

  it('gives the xl size its own width and height', async () => {
    const {buttonTestId, buttonText} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} size='xl'>
        {buttonText}
      </Button>
    )

    expect(getByTestId(buttonTestId)).toHaveStyle({
      width: '85%',
      height: display.px(64),
    })
  })

  it('gives the xxl size its own width and height', async () => {
    const {buttonTestId, buttonText} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} size='xxl'>
        {buttonText}
      </Button>
    )

    expect(getByTestId(buttonTestId)).toHaveStyle({
      width: '92.5%',
      height: display.px(72),
    })
  })
})

commonUiTestExtension(<Button testID={testId.buttonTestId} />, testId.buttonTestId)

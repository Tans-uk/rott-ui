import React from 'react'

import {commonUiTestExtension} from '../../../__tests__/utils/commonUiTestExtension'
import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {colorFromVariant} from '../../../utils'
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
  it('butonun snapshotı ile eşleşmeli', async () => {
    const {buttonTestId, buttonText} = testId
    const rendered = await render(<Button testID={buttonTestId}>{buttonText}</Button>)

    expect(rendered).toMatchSnapshot()
  })

  it('buton ekranda olmalı ancak loading iconu görünmemeli', async () => {
    const {buttonTestId, buttonText, buttonLoadingIndicatiorTestId} = testId
    const {getByTestId, queryByTestId} = await render(<Button testID={buttonTestId}>{buttonText}</Button>)

    const buttonElement = getByTestId(buttonTestId)
    const loadingIndicator = queryByTestId(buttonLoadingIndicatiorTestId)

    expect(buttonElement).toBeOnTheScreen()
    expect(loadingIndicator).not.toBeOnTheScreen()
  })

  it('loading text ve loading icon ile buton render olmalı', async () => {
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

  it('buton disableken tıklanamamlı', async () => {
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

  it('left icon propertysi verildiğinde ekranda doğru icon ile renderlanmalı', async () => {
    const {buttonTestId, buttonText, buttonLeftIconTestId} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} leftIcon={{name: 'remove-circle'}}>
        {buttonText}
      </Button>
    )

    const leftIconElement = getByTestId(buttonLeftIconTestId)

    expect(leftIconElement).toBeOnTheScreen()
  })

  it('left image propertysi verildiğinde ekranda doğru image ile renderlanmalı', async () => {
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

  it('button loading durumundayken verilen left icon görünmemeli', async () => {
    const {buttonText, buttonLeftIconTestId} = testId
    const {queryByTestId} = await render(
      <Button leftIcon={{name: 'remove-circle'}} isLoading>
        {buttonText}
      </Button>
    )

    const leftIcon = queryByTestId(buttonLeftIconTestId)

    expect(leftIcon).not.toBeOnTheScreen()
  })

  it('buton ekranda olmalı ve outline variantı ile renderlanmalı', async () => {
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

  it('right icon propertysi verildiğinde ekranda doğru icon ile renderlanmalı', async () => {
    const {buttonTestId, buttonText, buttonRightIconTestId} = testId
    const {getByTestId} = await render(
      <Button testID={buttonTestId} rightIcon={{name: 'remove-circle'}}>
        {buttonText}
      </Button>
    )

    const rightIconElement = getByTestId(buttonRightIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
  })

  it('right image propertysi verildiğinde ekranda doğru image ile renderlanmalı', async () => {
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

  it('button loading durumundayken verilen right icon görünmemeli', async () => {
    const {buttonText, buttonRightIconTestId} = testId
    const {queryByTestId} = await render(
      <Button rightIcon={{name: 'remove-circle'}} isLoading>
        {buttonText}
      </Button>
    )

    const rightIcon = queryByTestId(buttonRightIconTestId)

    expect(rightIcon).not.toBeOnTheScreen()
  })
})

commonUiTestExtension(<Button testID={testId.buttonTestId} />, testId.buttonTestId)

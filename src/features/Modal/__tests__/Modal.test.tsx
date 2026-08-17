import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {formatMessage} from '../../../libs'
import {Content} from '../../Content'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {ModalComponent} from '../components'
import type {ModalProps} from '../models'

describe('Modal -> Custom Component', () => {
  const onCloseMock = jest.fn()

  const testId = {
    modalTestId: 'modal-test-id',
    headerTestId: 'modal-header-test-id',
    headerCloseButtonTestId: 'header-right-pressable-test-id',
    headerCloseIconTestId: 'header-right-icon-test-id',
    outsideTapAreaTestId: 'outside-tap-area-test-id',
    slideToCloseTestId: 'slide-to-close-button-test-id',
  }

  const dummyDataFullScreen: ModalProps = {
    testID: testId.modalTestId,
    header: {
      title: formatMessage('TEST'),
      logo: 'pttbank-black-colored',
    },
    slideToClose: true,
    visible: true,
    fullScreen: true,
    closeButton: true,
    onClose: onCloseMock,
  }

  const dummyData: ModalProps = {
    testID: testId.modalTestId,
    header: {
      title: formatMessage('TEST'),
      logo: 'pttbank-black-colored',
    },
    visible: true,
    height: 50,
    fullScreen: false,
    slideToClose: true,
    closeButton: true,
    onClose: onCloseMock,
  }

  beforeAll(() => {
    // TODO: useState mock example
    const setStateMock = jest.fn()
    const useStateMock: any = (useState: any) => [useState, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
  })

  it('modal ilk renderlandiginda snapshot ile eşleşmeli', async () => {
    const renderedModal = await render(
      <ModalComponent {...dummyData}>
        <Item>
          <Label>{formatMessage('TEST')}</Label>
        </Item>
      </ModalComponent>
    )

    expect(renderedModal).toMatchSnapshot()
  })

  it('modal visible değilken ekranda gözükmemeli', async () => {
    const {queryByText} = await render(
      <ModalComponent {...dummyData} visible={false}>
        <Item>
          <Label>{formatMessage('TEST.WITH.PARAM', {testText: 'test'})}</Label>
        </Item>
      </ModalComponent>
    )

    const testLabelByText = queryByText(formatMessage('TEST.WITH.PARAM', {testText: 'test'}))

    expect(testLabelByText).not.toBeOnTheScreen()
  })

  it('custom header verildiğinde ekranda custom header olmalı', async () => {
    const {headerTestId} = testId

    const {getByTestId} = await render(
      <ModalComponent
        {...dummyData}
        header={
          <Content testID={headerTestId}>
            <Label>{formatMessage('TEST')}</Label>
          </Content>
        }>
        <Item>
          <Label>{formatMessage('TEST.WITH.PARAM', {testText: 'test'})}</Label>
        </Item>
      </ModalComponent>
    )

    const modalHeader = getByTestId(headerTestId)

    expect(modalHeader).toBeOnTheScreen()
  })

  it('modal kapatma butonu headerda olmalı', async () => {
    const {headerCloseIconTestId} = testId
    const {getByTestId} = await render(<ModalComponent {...dummyData} />)

    const headerCloseButton = getByTestId(headerCloseIconTestId)

    expect(headerCloseButton).toBeOnTheScreen()
  })

  it('modal header child elementi ekranda olmalı', async () => {
    const {getByTestId} = await render(
      <ModalComponent
        {...dummyData}
        header={{
          title: formatMessage('TEST'),
          logo: 'pttbank-black-colored',
          children: <Label testID={'header-children-test-id'}>{formatMessage('TEST')}</Label>,
        }}>
        <Item>
          <Label>{formatMessage('TEST.WITH.PARAM', {testText: 'test'})}</Label>
        </Item>
      </ModalComponent>
    )

    const headerChildren = getByTestId('header-children-test-id')

    expect(headerChildren).toBeOnTheScreen()
  })

  it('modal kapatma butonuna tıklandığında modal kapanmalı', async () => {
    const onClosePressableMock = jest.fn()
    const {headerCloseButtonTestId} = testId
    const {getByTestId} = await render(
      <ModalComponent {...dummyData} onClose={onClosePressableMock} />
    )

    const headerCloseButton = getByTestId(headerCloseButtonTestId)
    fireEvent.press(headerCloseButton)

    await waitFor(() => expect(onClosePressableMock).toHaveBeenCalledTimes(1))
  })

  it('modal tam ekran değilken container dışına tıklanırsa modal kapanmalı', async () => {
    const onClosePressableMock = jest.fn()
    const {outsideTapAreaTestId} = testId
    const {getByTestId} = await render(
      <ModalComponent {...dummyData} onClose={onClosePressableMock} />
    )

    const outsideContainer = getByTestId(outsideTapAreaTestId)
    fireEvent.press(outsideContainer)

    await waitFor(() => expect(onClosePressableMock).toHaveBeenCalledTimes(1))
  })

  it('panResponder headerda olmalı', async () => {
    const {slideToCloseTestId} = testId
    const {getByTestId} = await render(<ModalComponent {...dummyData} />)

    const panResponder = getByTestId(slideToCloseTestId)

    expect(panResponder).toBeOnTheScreen()
  })

  it('panResponder headerda olmamalı', async () => {
    const {slideToCloseTestId} = testId
    const {queryByTestId} = await render(<ModalComponent {...dummyData} slideToClose={false} />)

    const panResponder = queryByTestId(slideToCloseTestId)

    expect(panResponder).toBeNull()
  })

  it('modal fullscreen modunda panResponder ekranda olmamalı', async () => {
    const {slideToCloseTestId} = testId
    const {queryByTestId} = await render(<ModalComponent {...dummyDataFullScreen} />)

    const panResponder = queryByTestId(slideToCloseTestId)

    expect(panResponder).not.toBeOnTheScreen()
  })

  it('modal verilen children elementi ekranda göstermeli', async () => {
    const {getByText} = await render(
      <ModalComponent fullScreen visible>
        <Label>{formatMessage('TEST')}</Label>
      </ModalComponent>
    )

    const testLabelByText = getByText(formatMessage('TEST'))

    expect(testLabelByText).toBeOnTheScreen()
  })
})

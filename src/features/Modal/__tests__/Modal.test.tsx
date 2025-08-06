import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {translator} from '../../../libs'
import {ThemeConfig} from '../../../models'
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

  const dummyDataFullScreen: ModalProps<ThemeConfig> = {
    testID: testId.modalTestId,
    header: {
      title: translator('TEST'),
      logo: 'PTTBANK_BLACK_COLORED',
    },
    slideToClose: true,
    visible: true,
    fullScreen: true,
    closeButton: true,
    onClose: onCloseMock,
  }

  const dummyData: ModalProps<ThemeConfig> = {
    testID: testId.modalTestId,
    header: {
      title: translator('TEST'),
      logo: 'PTTBANK_BLACK_COLORED',
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

  it('modal ilk renderlandiginda snapshot ile eşleşmeli', () => {
    const renderedModal = render(
      <ModalComponent {...dummyData}>
        <Item>
          <Label>{translator('TEST')}</Label>
        </Item>
      </ModalComponent>
    )

    expect(renderedModal).toMatchSnapshot()
  })

  it('modal visible değilken ekranda gözükmemeli', () => {
    const {queryByText} = render(
      <ModalComponent {...dummyData} visible={false}>
        <Item>
          <Label>{translator('TEST.WITH.PARAM', {testText: 'test'})}</Label>
        </Item>
      </ModalComponent>
    )

    const testLabelByText = queryByText(translator('TEST.WITH.PARAM', {testText: 'test'}))

    expect(testLabelByText).not.toBeOnTheScreen()
  })

  it('custom header verildiğinde ekranda custom header olmalı', () => {
    const {headerTestId} = testId

    const {getByTestId} = render(
      <ModalComponent
        {...dummyData}
        header={
          <Content testID={headerTestId}>
            <Label>{translator('TEST')}</Label>
          </Content>
        }>
        <Item>
          <Label>{translator('TEST.WITH.PARAM', {testText: 'test'})}</Label>
        </Item>
      </ModalComponent>
    )

    const modalHeader = getByTestId(headerTestId)

    expect(modalHeader).toBeOnTheScreen()
  })

  it('modal kapatma butonu headerda olmalı', () => {
    const {headerCloseIconTestId} = testId
    const {getByTestId} = render(<ModalComponent {...dummyData} />)

    const headerCloseButton = getByTestId(headerCloseIconTestId)

    expect(headerCloseButton).toBeOnTheScreen()
  })

  it('modal header child elementi ekranda olmalı', () => {
    const {getByTestId} = render(
      <ModalComponent
        {...dummyData}
        header={{
          title: translator('TEST'),
          logo: 'PTTBANK_BLACK_COLORED',
          children: <Label testID={'header-children-test-id'}>{translator('TEST')}</Label>,
        }}>
        <Item>
          <Label>{translator('TEST.WITH.PARAM', {testText: 'test'})}</Label>
        </Item>
      </ModalComponent>
    )

    const headerChildren = getByTestId('header-children-test-id')

    expect(headerChildren).toBeOnTheScreen()
  })

  it('modal kapatma butonuna tıklandığında modal kapanmalı', async () => {
    const onClosePressableMock = jest.fn()
    const {headerCloseButtonTestId} = testId
    const {getByTestId} = render(<ModalComponent {...dummyData} onClose={onClosePressableMock} />)

    const headerCloseButton = getByTestId(headerCloseButtonTestId)
    fireEvent.press(headerCloseButton)

    await waitFor(() => expect(onClosePressableMock).toHaveBeenCalledTimes(1))
  })

  it('modal tam ekran değilken container dışına tıklanırsa modal kapanmalı', async () => {
    const onClosePressableMock = jest.fn()
    const {outsideTapAreaTestId} = testId
    const {getByTestId} = render(<ModalComponent {...dummyData} onClose={onClosePressableMock} />)

    const outsideContainer = getByTestId(outsideTapAreaTestId)
    fireEvent.press(outsideContainer)

    await waitFor(() => expect(onClosePressableMock).toHaveBeenCalledTimes(1))
  })

  it('panResponder headerda olmalı', () => {
    const {slideToCloseTestId} = testId
    const {getByTestId} = render(<ModalComponent {...dummyData} />)

    const panResponder = getByTestId(slideToCloseTestId)

    expect(panResponder).toBeOnTheScreen()
  })

  it('panResponder headerda olmamalı', () => {
    const {slideToCloseTestId} = testId
    const {queryByTestId} = render(<ModalComponent {...dummyData} slideToClose={false} />)

    const panResponder = queryByTestId(slideToCloseTestId)

    expect(panResponder).toBeNull()
  })

  it('panResponder header dışında olmalı', () => {
    const {slideToCloseTestId, headerTestId} = testId
    const {getByTestId} = render(<ModalComponent {...dummyData} />)

    const panResponder = getByTestId(slideToCloseTestId)

    // TODO: İç elementleri de bir katman olarak çağırıyor.
    expect(panResponder.parent?.parent?.parent).not.toHaveProp('testID', headerTestId)
  })

  it('modal fullscreen modunda panResponder ekranda olmamalı', () => {
    const {slideToCloseTestId} = testId
    const {queryByTestId} = render(<ModalComponent {...dummyDataFullScreen} />)

    const panResponder = queryByTestId(slideToCloseTestId)

    expect(panResponder).not.toBeOnTheScreen()
  })

  it('modal verilen children elementi ekranda göstermeli', () => {
    const {getByText} = render(
      <ModalComponent fullScreen visible>
        <Label>{translator('TEST')}</Label>
      </ModalComponent>
    )

    const testLabelByText = getByText(translator('TEST'))

    expect(testLabelByText).toBeOnTheScreen()
  })
})

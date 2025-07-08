import {ResultScreen} from '../components'

import type {ImageTypes} from '@features/Image'
import {render} from '@utils'

describe('ResultScreen Test', () => {
  const mockDetailElement = {
    texts: {
      header: 'Test Title Header',
      state: 'EMPTY_MONEY_TRANSFER' as ImageTypes,
      title: 'Test Title',
      description: 'Test Description',
      actionText: 'Test Action Text',
    },
    testIds: {
      screenContainer: 'result-container-test-id',
      actionTestId: 'test-action-id',
    },
    actions: {
      defaultAction: {
        title: 'Test Action Text',
        action: () => {},
        testID: 'test-action-id',
      },
    },
  }

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const {
      texts: {header, state, title, description},
      actions: {defaultAction},
    } = mockDetailElement
    const rendered = render(
      <ResultScreen
        route={{
          params: {
            header,
            title,
            description,
            state,
            actions: [defaultAction],
          },
        }}
      />
    )

    expect(rendered).toMatchSnapshot()
  })

  it('ResultScreen renderlandığında container ekranda olmalı', () => {
    const {
      texts: {header, state, title, description},
      testIds: {screenContainer},
      actions: {defaultAction},
    } = mockDetailElement
    const {getByTestId} = render(
      <ResultScreen
        route={{
          params: {
            header,
            title,
            description,
            state,
            actions: [defaultAction],
          },
        }}
      />
    )

    const resultScreenContainer = getByTestId(screenContainer)

    expect(resultScreenContainer).toBeOnTheScreen()
  })

  it('title verildiğinde ekranda gözükmeli', () => {
    const {
      texts: {header, state, title, actionText},
    } = mockDetailElement
    const {getByText} = render(
      <ResultScreen
        route={{
          params: {
            header,
            title,
            state,
            actions: [
              {
                title: actionText,
                action: () => {},
              },
            ],
          },
        }}
      />
    )

    const titleElementByText = getByText(title)

    expect(titleElementByText).toBeOnTheScreen()
  })

  it('description verildiğinde ekranda gözükmeli', () => {
    const {
      texts: {header, state, description, actionText},
    } = mockDetailElement
    const {getByText} = render(
      <ResultScreen
        route={{
          params: {
            header,
            description,
            state,
            actions: [
              {
                title: actionText,
                action: () => {},
              },
            ],
          },
        }}
      />
    )

    const descriptionElementByText = getByText(description)

    expect(descriptionElementByText).toBeOnTheScreen()
  })

  it('actions verildiğinde actions listesi ekranda gözükmeli', () => {
    const {
      texts: {header, state, title},
      testIds: {actionTestId},
      actions: {defaultAction},
    } = mockDetailElement
    const {getByTestId} = render(
      <ResultScreen
        route={{
          params: {
            header,
            title,
            state,
            actions: [defaultAction],
          },
        }}
      />
    )

    const actionsListByTestId = getByTestId(actionTestId)

    expect(actionsListByTestId).toBeOnTheScreen()
  })

  it('action verildiğinde action testID ile ekranda olmalı', () => {
    const {
      texts: {header, state, title},
      actions: {defaultAction},
    } = mockDetailElement
    const {getByTestId} = render(
      <ResultScreen
        route={{
          params: {
            header,
            title,
            state,
            actions: [defaultAction],
          },
        }}
      />
    )

    const actionButtonByTestId = getByTestId('test-action-id')

    expect(actionButtonByTestId).toBeOnTheScreen()
  })
})

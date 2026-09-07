import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {ImageTypes} from '../../Image'
import {ResultScreen} from '../components'

describe('ResultScreen Test', () => {
  const mockDetailElement = {
    texts: {
      header: 'Test Title Header',
      state: 'money-transfer-1' as ImageTypes,
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

  it('matches the snapshot on first render', async () => {
    const {
      texts: {header, state, title, description},
      actions: {defaultAction},
    } = mockDetailElement
    const rendered = await render(
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

  it('shows the container when ResultScreen renders', async () => {
    const {
      texts: {header, state, title, description},
      testIds: {screenContainer},
      actions: {defaultAction},
    } = mockDetailElement
    const {getByTestId} = await render(
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

  it('shows the title when it is given', async () => {
    const {
      texts: {header, state, title, actionText},
    } = mockDetailElement
    const {getByText} = await render(
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

  it('shows the description when it is given', async () => {
    const {
      texts: {header, state, description, actionText},
    } = mockDetailElement
    const {getByText} = await render(
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

  it('shows the action list when actions are given', async () => {
    const {
      texts: {header, state, title},
      testIds: {actionTestId},
      actions: {defaultAction},
    } = mockDetailElement
    const {getByTestId} = await render(
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

  it('shows the action by its testID when an action is given', async () => {
    const {
      texts: {header, state, title},
      actions: {defaultAction},
    } = mockDetailElement
    const {getByTestId} = await render(
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

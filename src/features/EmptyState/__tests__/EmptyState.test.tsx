import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {formatMessage} from '../../../libs'
import {Label} from '../../Label'
import {EmptyState} from '../components'

describe('EmptyState -> Custom Component', () => {
  const testId = {
    emptyStateImageTestId: 'empty-state-image-test-id',
    emptyStateDescTestId: 'empty-state-desc-test-id',
  }
  const testTexts = {
    description: formatMessage('TEST'),
  }

  it('ilk render anında snapshot ile eşleşmeli', async () => {
    const {description} = testTexts
    const renderedEmptyState = await render(<EmptyState name='phone' description={description} />)

    expect(renderedEmptyState).toMatchSnapshot()
  })

  it('name propertysi EMPTY ile başlamalı', async () => {
    const {description} = testTexts
    const {emptyStateImageTestId} = testId
    const {getByTestId} = await render(<EmptyState name='phone' description={description} />)

    const imageElement = getByTestId(emptyStateImageTestId)

    expect(imageElement.props.source.testUri).toMatch(/empty-state/gim)
  })

  it('description verilen değerler ile ekranda gözükmeli', async () => {
    const {description} = testTexts
    const {getByText} = await render(<EmptyState name='phone' description={description} />)

    const descriptionElement = getByText(description)

    expect(descriptionElement).toBeOnTheScreen()
  })

  it('description verilmediği zaman ekranda gözükmemeli', async () => {
    const {emptyStateDescTestId} = testId
    const {queryByTestId} = await render(<EmptyState name='phone' />)

    const descriptionElement = queryByTestId(emptyStateDescTestId)

    expect(descriptionElement).not.toBeOnTheScreen()
  })

  it('description yerine ReactNode olarak verildiğindede ekranda gösterilmeli', async () => {
    const {description} = testTexts
    const {getByTestId} = await render(
      <EmptyState
        name='phone'
        description={<Label testID='custom-label-test-id'>{description}</Label>}
      />
    )

    const descriptionElement = getByTestId('custom-label-test-id')

    expect(descriptionElement).toBeOnTheScreen()
  })
})

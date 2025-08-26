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

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const {description} = testTexts
    const renderedEmptyState = render(<EmptyState name='EMPTY_PHONE' description={description} />)

    expect(renderedEmptyState).toMatchSnapshot()
  })

  it('name propertysi EMPTY ile başlamalı', () => {
    const {description} = testTexts
    const {emptyStateImageTestId} = testId
    const {getByTestId} = render(<EmptyState name='EMPTY_PHONE' description={description} />)

    const imageElement = getByTestId(emptyStateImageTestId)

    expect(imageElement.props.source.testUri).toMatch(/empty-state/gim)
  })

  it('description verilen değerler ile ekranda gözükmeli', () => {
    const {description} = testTexts
    const {getByText} = render(<EmptyState name='EMPTY_PHONE' description={description} />)

    const descriptionElement = getByText(description)

    expect(descriptionElement).toBeOnTheScreen()
  })

  it('description verilmediği zaman ekranda gözükmemeli', () => {
    const {emptyStateDescTestId} = testId
    const {queryByTestId} = render(<EmptyState name='EMPTY_PHONE' />)

    const descriptionElement = queryByTestId(emptyStateDescTestId)

    expect(descriptionElement).not.toBeOnTheScreen()
  })

  it('description yerine ReactNode olarak verildiğindede ekranda gösterilmeli', () => {
    const {description} = testTexts
    const {getByTestId} = render(
      <EmptyState
        name='EMPTY_PHONE'
        description={<Label testID='custom-label-test-id'>{description}</Label>}
      />
    )

    const descriptionElement = getByTestId('custom-label-test-id')

    expect(descriptionElement).toBeOnTheScreen()
  })
})

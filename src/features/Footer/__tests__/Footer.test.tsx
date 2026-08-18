import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {Label} from '../../Label'
import {Footer} from '../components'

describe('Footer', () => {
  const testId = 'footer-test-id'

  const renderFooter = (props = {}) =>
    render(
      <Footer {...props}>
        <Label>Continue</Label>
      </Footer>
    )

  it('matches the snapshot on first render', async () => {
    const rendered = await renderFooter()

    expect(rendered).toMatchSnapshot()
  })

  it('renders its children', async () => {
    const {getByText} = await renderFooter()

    expect(getByText('Continue')).toBeTruthy()
  })

  it('carries no background colour of its own', async () => {
    const {getByTestId} = await renderFooter()

    expect(getByTestId(testId).props.style.backgroundColor).toBeUndefined()
  })

  it('applies the footer gap default', async () => {
    const {getByTestId} = await renderFooter()

    expect(getByTestId(testId).props.style.gap).toBe(16)
  })

  it('lets a caller override a layout default', async () => {
    const {getByTestId: withDefault} = await renderFooter()
    const {getByTestId: withOverride} = await renderFooter({minHeight: 200})

    expect(withOverride(testId).props.style.minHeight).not.toBe(
      withDefault(testId).props.style.minHeight
    )
  })

  it('lets a caller set a background colour', async () => {
    const {getByTestId} = await renderFooter({backgroundColor: '#123456'})

    expect(getByTestId(testId).props.style.backgroundColor).toBe('#123456')
  })
})

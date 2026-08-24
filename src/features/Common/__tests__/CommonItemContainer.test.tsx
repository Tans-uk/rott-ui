import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {Label} from '../../Label'
import {CommonItemContainer} from '../components'

describe('Common -> Common Item Container', () => {
  it("matches the snapshot on the common item container's first render", async () => {
    const commonItemContainer = await render(
      <CommonItemContainer>
        <Label>Test</Label>
      </CommonItemContainer>
    )

    expect(commonItemContainer).toMatchSnapshot()
  })

  it("renders the children on the common item container's first render", async () => {
    const {getByText} = await render(
      <CommonItemContainer>
        <Label>Test</Label>
      </CommonItemContainer>
    )

    const labelElement = getByText('Test')

    expect(labelElement).toBeOnTheScreen()
  })
})

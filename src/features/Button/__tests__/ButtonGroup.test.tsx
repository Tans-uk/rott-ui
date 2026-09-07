import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {ButtonGroup} from '../components'

describe('ButtonGroup -> Custom Component', () => {
  const testIDs = {
    logoImageTestId: 'image-test-id',
  }

  it('matches the button group snapshot', async () => {
    const rendered = await render(
      <ButtonGroup
        sticky
        buttons={[
          {text: 'Button 1', variant: 'primary'},
          {text: 'Button 2', variant: 'secondary-outline'},
        ]}
        image={{
          name: 'fast-tcmb',
          width: 60,
          height: 40,
        }}
      />
    )

    expect(rendered).toMatchSnapshot()
  })

  it('shows the fast image when isFastTransfer is true', async () => {
    const {logoImageTestId} = testIDs
    const {getByTestId} = await render(
      <ButtonGroup
        isFastTransfer
        buttons={[
          {text: 'Button 1', variant: 'primary'},
          {text: 'Button 2', variant: 'secondary-outline'},
        ]}
      />
    )

    const logoImage = getByTestId(logoImageTestId)

    expect(logoImage).toBeOnTheScreen()
  })
})

import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {colorFromVariant} from '../../../utils'
import {Item} from '../components'

describe('Item -> border', () => {
  it('draws the border it is given', async () => {
    const {getByTestId} = await render(
      <Item testID='item' borderWidth={2} borderColor='primary' borderRadius={8} />
    )

    expect(getByTestId('item')).toHaveStyle({
      borderWidth: 2,
      borderColor: colorFromVariant('primary'),
      borderRadius: 8,
    })
  })
})

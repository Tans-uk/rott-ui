import React from 'react'

import {bottomMenuListItemMock} from '../__mocks__'
import {render} from '../../../__tests__/utils/testUtils'
import {BottomMenuItem} from '../components'

describe('Component -> BottomMenuItem', () => {
  const testIDs = {
    bottomMenuItemTestId: 'bottom-menu-item-1-test-id',
  }

  it('matches the bottom menu item component snapshot', async () => {
    const rendered = await render(<BottomMenuItem {...bottomMenuListItemMock[0]} />)

    expect(rendered).toMatchSnapshot()
  })

  it('shows the bottom menu item component', async () => {
    const {bottomMenuItemTestId} = testIDs

    const {getByTestId} = await render(<BottomMenuItem {...bottomMenuListItemMock[0]} />)

    const bottomMenuItem = getByTestId(bottomMenuItemTestId)

    expect(bottomMenuItem).toBeOnTheScreen()
  })

  it('shows the given icon', async () => {
    const {bottomMenuItemTestId} = testIDs

    const {getByTestId} = await render(<BottomMenuItem {...bottomMenuListItemMock[0]} />)

    const bottomMenuItem = getByTestId(bottomMenuItemTestId)

    expect(bottomMenuItem).toBeOnTheScreen()
  })
})

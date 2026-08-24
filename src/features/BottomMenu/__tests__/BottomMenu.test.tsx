import React from 'react'

import {bottomMenuListItemMock} from '../__mocks__'
import {render} from '../../../../src/__tests__/utils/testUtils'
import {BottomMenu} from '../components'

describe('Component -> BottomMenu', () => {
  const testIDs = {
    bottomMenuContainerTestId: 'bottom-menu-container',
    bottomMenuItemTestId: 'bottom-menu-item-1-test-id',
    bottomMenuItemTestId2: 'bottom-menu-item-2-test-id',
  }

  it('matches the bottom menu component snapshot', async () => {
    const rendered = await render(<BottomMenu menuItems={bottomMenuListItemMock} />)

    expect(rendered).toMatchSnapshot()
  })

  it('is shown', async () => {
    const {getByTestId} = await render(<BottomMenu menuItems={bottomMenuListItemMock} />)
    const bottomMenuContainer = getByTestId('bottom-menu-container')

    expect(bottomMenuContainer).toBeOnTheScreen()
  })

  it('shows the bottom menu component', async () => {
    const {bottomMenuContainerTestId} = testIDs

    const {getByTestId} = await render(<BottomMenu menuItems={bottomMenuListItemMock} />)

    const bottomMenu = getByTestId(bottomMenuContainerTestId)

    expect(bottomMenu).toBeOnTheScreen()
  })

  it('shows one bottom menu item component per given menu item', async () => {
    const {bottomMenuItemTestId, bottomMenuItemTestId2} = testIDs

    const {getByTestId} = await render(<BottomMenu menuItems={bottomMenuListItemMock} />)

    const bottomMenuItem = getByTestId(bottomMenuItemTestId)
    const bottomMenuItem2 = getByTestId(bottomMenuItemTestId2)

    expect(bottomMenuItem).toBeOnTheScreen()
    expect(bottomMenuItem2).toBeOnTheScreen()
  })
})
